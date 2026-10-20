"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/travel-guide", label: "Travel Guide" },
  { href: "/journal", label: "Journal" },
  { href: "/mwakete", label: "Mwakete" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-grey/15 bg-warm-white/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-ocean no-underline"
        >
          {siteConfig.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium no-underline transition-colors hover:text-lagoon ${
                      active ? "text-lagoon" : "text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/submit-business"
            className="rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-warm-white no-underline transition-colors hover:bg-lagoon"
          >
            List your business
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-grey/30 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-grey/15 lg:hidden">
          <ul className="container-wide flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-charcoal no-underline hover:bg-sand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/submit-business"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-ocean px-4 py-3 text-center text-sm font-semibold text-warm-white no-underline"
              >
                List your business
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
