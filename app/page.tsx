import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ContactForm from "./components/ContactForm";
import EventCard from "./components/EventCard";
import YearbookCard from "./components/YearbookCard";
import Reveal from "./components/Reveal";

const founders = [
  {
    name: "Dr Win Bo @ Sai Hsei Han Say",
    role: "Rector",
    photo: "/doctors/founder_1.jpg",
  },
  {
    name: "Mr Sai Tun Thein and Mrs Nang Aye Lin",
    role: "Chairman",
    photo: "/doctors/founder_2.png",
    contain: true,
  },
  {
    name: "Mr Sai Kyaw",
    role: "Managing Director",
    photo: "/doctors/founder_3.jpg",
  },
];

const partners = [
  { location: "Bangkok, Thailand", photo: "/partners/partner_one.jpg" },
  { location: "London, England", photo: "/partners/partner_two.jpg" },
  { location: "Paris, France", photo: "/partners/partner_three.jpg" },
  { location: "Lashio, Myanmar", photo: "/partners/partner_four.jpg" },
  { location: "Shan State, Myanmar", photo: "/partners/partner_five.jpg" },
];

export default async function Home() {
  const latestEvents = await prisma.event.findMany({
    orderBy: { date: "desc" },
    take: 3,
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  const latestYearbooks = await prisma.yearbook.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    take: 4,
  });

  return (
    <main className="flex flex-col">
      <section
        id="home"
        className="relative flex min-h-[80vh] scroll-mt-20 items-end overflow-hidden px-6 pb-16 sm:px-12"
      >
        <Image
          src="/photo-1517072115201-1db1ca3cc193.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <Reveal className="relative flex max-w-xl flex-col gap-4 text-left">
          <p className="font-semibold uppercase tracking-widest text-accent-gold-light">
            Welcome to
          </p>
          <h1 className="text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
            LLPW International School University
          </h1>
          <p className="max-w-md text-lg text-white/85">
            Since 2019, LLPW International School &amp; University has been
            committed to developing disciplined, capable, and future-ready
            students through the values of hard work, discipline, and
            excellence.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-6 rounded-full bg-primary" />
          </div>
        </Reveal>
      </section>

      <section id="about" className="scroll-mt-20 bg-bg-paper px-6 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row">
          <Reveal className="flex flex-1 flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-bold text-text-primary">About Us</h2>
            <p className="text-text-secondary">
              Founded in 2019, LLPW International School &amp; University
              believes that true education is reflected in behavior, speech,
              and mindset.
            </p>
            <p className="text-text-secondary">
              We go beyond academic learning to build discipline, character,
              confidence, and a strong sense of responsibility. Guided by our
              core values of Hard Work, Discipline, and the Right Mindset, we
              prepare students not only for academic success, but for success
              in life.
            </p>
            <p className="text-text-secondary">
              At LLPW, we educate the mind, shape character, and build the
              future.
            </p>
          </Reveal>
          <Reveal delay={150} className="flex flex-1 items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="LLPW campus"
              width={320}
              height={320}
              className="rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section id="founders" className="scroll-mt-20 px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-text-primary">
            Chairman &amp; Founders
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-secondary">
            The people behind LLPW&apos;s mission of hard work and discipline.
          </p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3">
          {founders.map((person, i) => (
            <Reveal
              key={person.name}
              delay={i * 100}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative h-80 w-64 shrink-0 p-1.5 shadow-[0_12px_30px_-8px_rgba(26,26,26,0.35)] sm:h-96 sm:w-72">
                <div className="h-full w-full bg-linear-to-br from-accent-gold-light via-accent-gold to-accent-gold-dark p-0.75">
                  <div className="relative h-full w-full overflow-hidden bg-bg-default ring-4 ring-paper">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className={
                        person.contain
                          ? "object-contain p-2"
                          : "object-cover"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="font-display text-xl italic text-text-primary">
                  {person.name}
                </p>
                <span className="rounded-full bg-primary/10 px-4 py-1 font-ledger text-xs font-semibold uppercase tracking-widest text-primary">
                  {person.role}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="partners"
        className="scroll-mt-20 overflow-hidden bg-bg-paper py-20 text-center"
      >
        <Reveal className="px-6">
          <span className="inline-flex items-center rounded-full border border-accent-gold/40 bg-accent-gold/10 px-4 py-1 font-ledger text-xs font-semibold uppercase tracking-widest text-accent-gold-dark sm:text-sm">
            Worldwide Network
          </span>
          <h2 className="mt-4 font-display text-3xl italic text-text-primary sm:text-4xl">
            Partners
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-accent-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold" />
            <span className="h-px w-10 bg-accent-gold/60" />
          </div>
          <p className="mx-auto mt-3 max-w-lg text-text-secondary">
            Organizations we work with to expand access to quality education.
          </p>
        </Reveal>

        <Reveal delay={150} className="relative mt-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-bg-paper to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-bg-paper to-transparent sm:w-40" />
          <div className="marquee-track flex w-max items-stretch gap-6 sm:gap-8">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.location}-${i}`}
                className="group flex w-56 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_8px_24px_-14px_rgba(26,26,26,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-[0_20px_38px_-16px_rgba(26,26,26,0.3)] sm:w-72"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={partner.photo}
                    alt={partner.location}
                    fill
                    className="object-contain p-7 grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-3.5 w-3.5 shrink-0 text-accent-gold-dark"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="font-ledger text-[11px] uppercase tracking-widest text-text-secondary">
                    {partner.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {latestEvents.length > 0 && (
        <section
          id="events"
          className="guilloche-bg relative scroll-mt-20 overflow-hidden border-t border-accent-gold/20 px-6 pb-16 pt-20 text-center"
        >
          <span className="register-mark left-4 top-4 opacity-40" />
          <span className="register-mark right-4 top-4 opacity-40" />
          <span className="register-mark bottom-4 left-4 opacity-40" />
          <span className="register-mark bottom-4 right-4 opacity-40" />

          <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-4">
            <span className="rounded-full border border-accent-gold/40 bg-white/60 px-4 py-1 font-ledger text-xs font-semibold uppercase tracking-widest text-accent-gold-dark sm:text-sm">
              LLPW Moments
            </span>
            <h2 className="font-display text-3xl italic text-text-primary sm:text-4xl">
              Events
            </h2>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold" />
              <span className="h-px w-10 bg-accent-gold/60" />
            </div>
            <p className="max-w-lg text-text-secondary">
              Moments from campus life — ceremonies, activities, and
              milestones from LLPW.
            </p>
          </Reveal>

          <div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {latestEvents.map((event, i) => (
              <Reveal key={event.id} delay={i * 100}>
                <EventCard
                  priority={i === 0}
                  accent={(["primary", "gold", "info"] as const)[i % 3]}
                  event={{
                    id: event.id,
                    title: event.title,
                    date: event.date,
                    cover: event.images[0]
                      ? {
                          url: event.images[0].url,
                          blurDataUrl: event.images[0].blurDataUrl,
                        }
                      : null,
                  }}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="relative mt-10">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-white/60 px-6 py-2.5 text-sm font-semibold text-primary shadow-[0_6px_16px_-8px_rgba(26,26,26,0.25)] transition-colors hover:bg-primary hover:text-primary-contrast"
            >
              More Events
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>

          <div className="perforation relative -mx-6 mt-16 opacity-70" />
        </section>
      )}

      {latestYearbooks.length > 0 && (
        <section
          id="yearbooks"
          className="scroll-mt-20 bg-bg-paper px-6 py-20 text-center"
        >
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-accent-gold/40 bg-accent-gold/10 px-4 py-1 font-ledger text-xs font-semibold uppercase tracking-widest text-accent-gold-dark sm:text-sm">
              Alumni Library
            </span>
            <h2 className="mt-4 font-display text-3xl italic text-text-primary sm:text-4xl">
              Yearbooks
            </h2>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-accent-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold" />
              <span className="h-px w-10 bg-accent-gold/60" />
            </div>
            <p className="mx-auto mt-3 max-w-lg text-text-secondary">
              Every graduating class, bound and shelved — browse the books.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
              {latestYearbooks.map((yearbook, i) => (
                <Reveal key={yearbook.id} delay={i * 100}>
                  <YearbookCard
                    priority={i === 0}
                    accent={(["primary", "gold", "info"] as const)[i % 3]}
                    yearbook={{
                      id: yearbook.id,
                      title: yearbook.title,
                      year: yearbook.year,
                      cover: yearbook.coverUrl
                        ? { url: yearbook.coverUrl, blurDataUrl: yearbook.blurDataUrl }
                        : null,
                    }}
                  />
                </Reveal>
              ))}
            </div>
            <div className="shelf-plank mt-2 h-3 w-full rounded-sm" />
          </div>

          <Reveal delay={200} className="mt-10">
            <Link
              href="/yearbooks"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-contrast"
            >
              More Yearbooks
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </section>
      )}

      <section id="contact" className="scroll-mt-20 px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-text-primary">Contact Us</h2>
          <p className="mx-auto mt-3 max-w-lg text-text-secondary">
            Have a question about admissions, partnerships, or certificates?
            Reach out — we&apos;re happy to help.
          </p>
          <ContactForm />
        </Reveal>
      </section>
    </main>
  );
}
