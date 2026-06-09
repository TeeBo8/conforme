"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("./Navbar").then((m) => ({ default: m.Navbar })),
  { ssr: false, loading: () => <div className="h-14 border-b border-border" /> }
);

export function ClientNavbar() {
  return <Navbar />;
}
