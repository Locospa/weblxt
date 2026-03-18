"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/tabla", label: "Tabla" },
  { href: "/jugadores", label: "Jugadores" },
  { href: "/enfrentamientos", label: "Enfrentamientos" },
  { href: "/partidos", label: "Partidos" },
];

export default function MainNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`top-0 z-50 w-full ${
        isHome
          ? "absolute left-0 right-0"
          : "sticky border-b border-slate-200 bg-white/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur">
            <img
              src="/logo/escalerilla-logo.png"
              alt="Escalerilla Locos x el Tenis"
              className="h-full w-full object-cover"
            />
          </div>

          <div className={isHome ? "text-white" : "text-slate-900"}>
            <p className="text-sm font-black uppercase tracking-[0.18em]">
              Escalerilla
            </p>
            <p
              className={`text-xs font-semibold ${
                isHome ? "text-white/75" : "text-slate-500"
              }`}
            >
              Locos x el Tenis
            </p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isHome
                    ? isActive
                      ? "bg-white text-slate-900 shadow"
                      : "bg-white/10 text-white backdrop-blur hover:bg-white/20"
                    : isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}