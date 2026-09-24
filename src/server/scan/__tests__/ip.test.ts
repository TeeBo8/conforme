import { describe, it, expect } from "vitest";
import { isPublicIp } from "../ip";

describe("isPublicIp (anti-SSRF)", () => {
  it.each([
    "127.0.0.1",
    "10.1.2.3",
    "172.16.0.1",
    "172.31.255.255",
    "192.168.1.1",
    "169.254.169.254",
    "100.64.0.1",
    "0.0.0.0",
    "255.255.255.255",
    "::1",
    "::",
    "fc00::1",
    "fd12:3456::1",
    "fe80::1",
    "::ffff:127.0.0.1",
    "::ffff:10.0.0.1",
    "pas-une-ip",
  ])("refuse %s", (ip) => {
    expect(isPublicIp(ip)).toBe(false);
  });

  it.each(["8.8.8.8", "76.76.21.21", "172.32.0.1", "2606:4700:4700::1111", "::ffff:8.8.8.8"])(
    "accepte %s",
    (ip) => {
      expect(isPublicIp(ip)).toBe(true);
    }
  );
});
