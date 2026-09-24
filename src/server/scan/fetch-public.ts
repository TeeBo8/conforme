import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import zlib from "node:zlib";
import type { LookupFunction } from "node:net";
import { isPublicIp } from "./ip";

const TIMEOUT_MS = 8_000;
const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 3;
const USER_AGENT = "ConformeFR-Scan/1.0 (+https://conformefr.com)";

export class ScanError extends Error {}

export interface PublicPage {
  finalUrl: string;
  html: string;
  headers: http.IncomingHttpHeaders;
}

// La vérification se fait au moment de la connexion (et non avant) :
// un nom de domaine ne peut pas pointer vers une IP publique puis privée (DNS rebinding).
const safeLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) return callback(err, "", 0);
    const list = addresses as dns.LookupAddress[];
    if (list.length === 0 || list.some((a) => !isPublicIp(a.address))) {
      return callback(new ScanError("Adresse non publique refusée"), "", 0);
    }
    const chosen = list[0]!;
    if (options.all) return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    callback(null, chosen.address, chosen.family);
  });
};

export function parsePublicUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new ScanError("URL invalide");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new ScanError("Seuls http et https sont acceptés");
  if (url.username || url.password) throw new ScanError("URL invalide");
  if (url.port && url.port !== "80" && url.port !== "443") throw new ScanError("Port non autorisé");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  // IP écrite en dur : vérifiée ici ; nom de domaine : vérifié à la connexion
  if (/^[\d.]+$/.test(host) || host.includes(":")) {
    if (!isPublicIp(host)) throw new ScanError("Adresse non publique refusée");
  }
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new ScanError("Adresse non publique refusée");
  }
  return url;
}

function requestOnce(url: URL, signal: AbortSignal): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: Buffer }> {
  const client = url.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = client.request(
      url,
      {
        method: "GET",
        lookup: safeLookup,
        signal,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400) {
          res.resume();
          return resolve({ status, headers: res.headers, body: Buffer.alloc(0) });
        }
        const encoding = String(res.headers["content-encoding"] ?? "");
        const stream =
          encoding === "gzip" ? res.pipe(zlib.createGunzip())
          : encoding === "deflate" ? res.pipe(zlib.createInflate())
          : encoding === "br" ? res.pipe(zlib.createBrotliDecompress())
          : res;
        const chunks: Buffer[] = [];
        let size = 0;
        stream.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_BYTES) {
            req.destroy(new ScanError("Page trop volumineuse"));
            return;
          }
          chunks.push(chunk);
        });
        stream.on("end", () => resolve({ status, headers: res.headers, body: Buffer.concat(chunks) }));
        stream.on("error", reject);
      }
    );
    req.on("error", reject);
    req.end();
  });
}

/** Récupère une page HTML publique, avec toutes les protections anti-SSRF. */
export async function fetchPublicPage(rawUrl: string): Promise<PublicPage> {
  let url = parsePublicUrl(rawUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const res = await requestOnce(url, controller.signal);
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.location;
        if (!location) throw new ScanError("Redirection invalide");
        url = parsePublicUrl(new URL(location, url).href);
        continue;
      }
      if (res.status < 200 || res.status >= 300) throw new ScanError(`Le site a répondu ${res.status}`);
      const type = String(res.headers["content-type"] ?? "");
      if (!/text\/html|application\/xhtml/i.test(type)) throw new ScanError("La page n'est pas une page HTML");
      return { finalUrl: url.href, html: res.body.toString("utf8"), headers: res.headers };
    }
    throw new ScanError("Trop de redirections");
  } catch (err) {
    if (err instanceof ScanError) throw err;
    if (controller.signal.aborted) throw new ScanError("Le site met trop de temps à répondre");
    throw new ScanError("Impossible de joindre le site");
  } finally {
    clearTimeout(timer);
  }
}
