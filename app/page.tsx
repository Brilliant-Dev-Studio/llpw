import Image from "next/image";
import ContactForm from "./components/ContactForm";
import Reveal from "./components/Reveal";

const founders = [
  {
    name: "U Aung Ko Ko",
    role: "Chairman",
    bio: "Founded LLPW in 2010 with a mission to make disciplined, quality education accessible across Myanmar.",
  },
  {
    name: "Daw Su Su Hlaing",
    role: "Co-Founder & Director",
    bio: "Oversees academic development, shaping a curriculum that balances rigor with character building.",
  },
  {
    name: "U Zaw Min Htet",
    role: "Co-Founder & Board Member",
    bio: "Leads partnerships and campus expansion, bringing LLPW's programs to more students every year.",
  },
];

const partners = [
  "Golden Land Foundation",
  "Bright Future Academy",
  "Irrawaddy Tech Institute",
  "Shwe Education Group",
  "Yangon Youth Council",
  "Mandalay Learning Trust",
];

export default function Home() {
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
            Building disciplined, future-ready students since 2010 — over
            12,000 graduates across Myanmar.
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
              LLPW International School University is Myanmar&apos;s pioneer
              network of disciplined learning, founded in 2010. We combine a
              rigorous academic curriculum with character-building programs,
              helping students grow academically, socially, and personally.
            </p>
            <p className="text-text-secondary">
              Today, LLPW runs 8 campuses across Yangon and Mandalay, serving
              over 3,000 students with a faculty of 150+ teachers and
              instructors.
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
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {founders.map((person, i) => (
            <Reveal
              key={person.name}
              delay={i * 100}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-accent-gold">
                <Image
                  src="/photo-1553642618-de0381320ff3.avif"
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-semibold text-text-primary">{person.name}</p>
              <p className="text-sm font-medium text-primary">{person.role}</p>
              <p className="text-sm text-text-secondary">{person.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="partners"
        className="scroll-mt-20 bg-bg-paper px-6 py-20 text-center"
      >
        <Reveal>
          <h2 className="text-3xl font-bold text-text-primary">Partners</h2>
          <p className="mx-auto mt-3 max-w-lg text-text-secondary">
            Organizations we work with to expand access to quality education.
          </p>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal
              key={partner}
              delay={i * 80}
              className="flex flex-col gap-3 overflow-hidden rounded-xl border border-border"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/photo-1562774053-701939374585.avif"
                  alt={partner}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="pb-3 text-center text-sm font-medium text-text-secondary">
                {partner}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

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
