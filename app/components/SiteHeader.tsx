"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#founders", label: "Founders" },
  { href: "/#partners", label: "Partners" },
  { href: "/events", label: "Events" },
  { href: "/yearbooks", label: "Yearbooks" },
  { href: "/#contact", label: "Contact Us" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isVerifyPage = pathname.startsWith("/verify-certificate");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="flex items-center justify-end gap-4 bg-text-primary px-4 py-2 text-xs text-primary-contrast sm:px-6 sm:text-sm">
        <span>info@llpw-edu.com</span>
      </div>
      <header className="flex h-20 items-center justify-between border-b border-border bg-bg-paper px-4 sm:px-6">
        <Link href="/#home" className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14">
            <Image
              src="/logo.jpg"
              alt="LLPW logo"
              fill
              className="scale-125 object-cover"
            />
          </div>
          <span className="min-w-0 truncate font-sans text-sm font-semibold text-text-primary sm:hidden">
            LLPW
          </span>
          <span className="hidden min-w-0 truncate font-sans text-sm font-semibold text-text-primary sm:block">
            LLPW International School University
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-medium text-text-primary md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 transition-colors hover:text-primary"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/verify-certificate"
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              isVerifyPage
                ? "border-primary bg-primary text-primary-contrast"
                : "border-primary text-primary hover:bg-primary hover:text-primary-contrast"
            }`}
          >
            Authenticity QR Check
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-text-primary md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </header>

      {menuOpen && (
        <nav className="flex flex-col border-b border-border bg-bg-paper px-4 py-4 font-medium text-text-primary md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-3 last:border-b-0 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/verify-certificate"
            onClick={() => setMenuOpen(false)}
            className={`mt-4 rounded-full border px-4 py-2 text-center text-sm font-semibold transition-colors ${
              isVerifyPage
                ? "border-primary bg-primary text-primary-contrast"
                : "border-primary text-primary"
            }`}
          >
            Authenticity QR Check
          </Link>
        </nav>
      )}
    </div>
  );
}
