import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import YearbookCard from "../components/YearbookCard";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Yearbooks",
};

export default async function YearbooksPage() {
  const yearbooks = await prisma.yearbook.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="flex flex-col">
      <section className="events-hero-bg relative overflow-hidden border-y border-accent-gold-light/20 px-6 py-16 text-center sm:px-12 sm:py-24">
        <span className="register-mark left-4 top-4 opacity-40" />
        <span className="register-mark right-4 top-4 opacity-40" />
        <span className="register-mark bottom-4 left-4 opacity-40" />
        <span className="register-mark bottom-4 right-4 opacity-40" />
        <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-4">
          <span className="rounded-full border border-accent-gold-light/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-gold-light sm:text-sm">
            LLPW Alumni Library
          </span>
          <h1 className="font-display text-4xl italic text-white sm:text-5xl">
            Yearbooks
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent-gold-light/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold-light" />
            <span className="h-px w-10 bg-accent-gold-light/60" />
          </div>
          <p className="text-white/75">
            Every graduating class, bound and shelved — browse the books and
            relive the years.
          </p>
        </Reveal>
      </section>

      <div className="px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-5xl">
          {yearbooks.length === 0 ? (
            <p className="text-center text-text-secondary">
              No yearbooks published yet — check back soon.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
                {yearbooks.map((yearbook, i) => (
                  <Reveal key={yearbook.id} delay={(i % 4) * 80}>
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
