"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#founders", label: "Founders" },
  { href: "/#partners", label: "Partners" },
  { href: "/#contact", label: "Contact Us" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isVerifyPage = pathname.startsWith("/verify-certificate");

  return (
    <div className="sticky top-0 z-50">
      <div className="flex items-center justify-end gap-4 bg-text-primary px-6 py-2 text-sm text-primary-contrast">
        <span>info@llpw-edu.com</span>
      </div>
      <header className="flex h-20 items-center justify-between border-b border-border bg-bg-paper px-6">
        <Link href="/#home" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="LLPW logo"
            width={56}
            height={56}
            className="rounded-full"
          />
          <span className="font-sans text-sm font-semibold text-text-primary">
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
      </header>
    </div>
  );
}
