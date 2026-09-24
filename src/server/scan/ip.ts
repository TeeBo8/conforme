import { isIP } from "node:net";

// Anti-SSRF : le scan ne doit jamais atteindre le réseau interne, le loopback
// ou les métadonnées cloud. On n'autorise que des adresses IP publiques.

function ipv4ToInt(ip: string): number {
  return ip.split(".").reduce((acc, part) => (acc << 8) + Number(part), 0) >>> 0;
}

const BLOCKED_V4: [string, number][] = [
  ["0.0.0.0", 8], // « ce réseau »
  ["10.0.0.0", 8], // privé
  ["100.64.0.0", 10], // CGNAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local (métadonnées cloud 169.254.169.254)
  ["172.16.0.0", 12], // privé
  ["192.0.0.0", 24], // IETF
  ["192.0.2.0", 24], // documentation
  ["192.168.0.0", 16], // privé
  ["198.18.0.0", 15], // tests de performance
  ["198.51.100.0", 24], // documentation
  ["203.0.113.0", 24], // documentation
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // réservé + broadcast
];

function isPublicIpv4(ip: string): boolean {
  const n = ipv4ToInt(ip);
  return !BLOCKED_V4.some(([base, bits]) => {
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    return (n & mask) === (ipv4ToInt(base) & mask);
  });
}

function isPublicIpv6(ip: string): boolean {
  const addr = ip.toLowerCase().replace(/^\[|\]$/g, "");
  // IPv4 encapsulée (::ffff:127.0.0.1) : on juge l'IPv4
  const mapped = addr.match(/^(?:0*:)*:?ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPublicIpv4(mapped[1]!);
  if (addr === "::" || addr === "::1") return false;
  const first = parseInt(addr.split(":")[0] || "0", 16);
  if ((first & 0xfe00) === 0xfc00) return false; // fc00::/7 unique local
  if ((first & 0xffc0) === 0xfe80) return false; // fe80::/10 link-local
  if ((first & 0xff00) === 0xff00) return false; // ff00::/8 multicast
  if (addr.startsWith("64:ff9b:") || addr.startsWith("2001:db8:")) return false; // NAT64, documentation
  return true;
}

export function isPublicIp(ip: string): boolean {
  const version = isIP(ip.replace(/^\[|\]$/g, ""));
  if (version === 4) return isPublicIpv4(ip);
  if (version === 6) return isPublicIpv6(ip);
  return false;
}
