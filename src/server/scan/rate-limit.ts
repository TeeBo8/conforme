// Limite anti-abus du scan : le serveur va chercher des pages à la demande d'inconnus.
// Mémoire locale à chaque instance (pas de base partagée) : c'est un frein, pas une garantie.

const FENETRE_MS = 10 * 60 * 1000;
const MAX_PAR_IP = 6;
const MAX_GLOBAL = 120;

const parIp = new Map<string, number[]>();
let global: number[] = [];

export function autoriserScan(ip: string, maintenant = Date.now()): boolean {
  const depuis = maintenant - FENETRE_MS;
  global = global.filter((t) => t > depuis);
  const liste = (parIp.get(ip) ?? []).filter((t) => t > depuis);
  if (liste.length >= MAX_PAR_IP || global.length >= MAX_GLOBAL) {
    parIp.set(ip, liste);
    return false;
  }
  liste.push(maintenant);
  parIp.set(ip, liste);
  global.push(maintenant);
  if (parIp.size > 5_000) parIp.clear();
  return true;
}
