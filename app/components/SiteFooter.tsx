const exploreLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#founders", label: "Founders" },
  { href: "/#partners", label: "Partners" },
];

function SectionBadge({ children }: { children: string }) {
  return (
    <span className="inline-block w-fit rounded-md bg-primary-light px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-contrast">
      {children}
    </span>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-primary-contrast/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 divide-y divide-white/10 px-6 py-16 md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex flex-col gap-4 pb-8 md:pb-0 md:pr-8">
          <SectionBadge>About Us</SectionBadge>
          <p className="text-sm leading-relaxed">
            LLPW International School University is committed to shaping
            disciplined, future-ready students through quality education and
            a nurturing environment, built on hard work and discipline.
          </p>
        </div>

        <div className="flex flex-col gap-4 pb-8 md:px-8 md:pb-0">
          <SectionBadge>Explore Us</SectionBadge>
          <ul className="flex flex-col gap-2 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-primary-contrast">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <SectionBadge>Contact Us</SectionBadge>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="tel:+959975362219"
              className="flex items-center gap-3 hover:text-primary-contrast"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-primary-light"
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z" />
              </svg>
              +95 9975362219 <span className="text-white/40">(9 AM – 5 PM)</span>
            </a>
            <a
              href="mailto:info@llpw-edu.com"
              className="flex items-center gap-3 underline decoration-white/30 underline-offset-4 hover:text-primary-contrast"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4 text-primary-light"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              info@llpw-edu.com
            </a>
          </div>
          <div className="mt-2 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.7C16.6 3.6 15.6 3.5 14.5 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.8V13h2.7v8h3Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M16.5 3c.4 2.2 1.8 3.6 4 3.9v2.6c-1.4 0-2.7-.4-4-1.3v6.3a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V3h2.6Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:pl-8">
          <SectionBadge>Locate Us</SectionBadge>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="flex items-center gap-2 font-semibold text-primary-contrast">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-primary-light"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                  </svg>
                  LLPW International School
                </p>
                <p className="text-sm text-white/50">Lashio</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Lashio+Myanmar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md bg-black/40 px-3 py-1.5 text-xs font-medium text-primary-contrast"
              >
                Maps
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-3 w-3"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
            <iframe
              title="LLPW location"
              src="https://www.google.com/maps?q=Lashio,Myanmar&output=embed"
              className="h-48 w-full grayscale invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-white/40">
        © {year} LLPW International School University. All rights reserved.
      </div>
    </footer>
  );
}
