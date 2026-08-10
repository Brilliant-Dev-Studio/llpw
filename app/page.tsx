import Image from "next/image";
import ContactForm from "./components/ContactForm";
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
  { location: "London, England", photo: "/partners/partner_two.jpg", wide: true },
  { location: "Paris, France", photo: "/partners/partner_three.jpg", wide: true },
  { location: "Lashio, Myanmar", photo: "/partners/partner_four.jpg" },
  { location: "Shan State, Myanmar", photo: "/partners/partner_five.jpg" },
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
              key={partner.location}
              delay={i * 80}
              className={`flex flex-col gap-3 overflow-hidden rounded-xl border border-border ${
                partner.wide ? "col-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full bg-white p-4 ${
                  partner.wide ? "aspect-video" : "aspect-square"
                }`}
              >
                <Image
                  src={partner.photo}
                  alt={partner.location}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="pb-3 text-center text-sm font-medium text-text-secondary">
                {partner.location}
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
