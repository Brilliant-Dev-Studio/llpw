import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import EventCard from "../components/EventCard";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
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
            LLPW Moments
          </span>
          <h1 className="font-display text-4xl italic text-white sm:text-5xl">
            Events
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent-gold-light/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold-light" />
            <span className="h-px w-10 bg-accent-gold-light/60" />
          </div>
          <p className="text-white/75">
            Ceremonies, activities, and milestones from campus life —
            relive the highlights.
          </p>
        </Reveal>
      </section>

      <div className="px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-5xl">
          {events.length === 0 ? (
            <p className="text-center text-text-secondary">
              No events published yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {events.map((event, i) => (
                <Reveal key={event.id} delay={(i % 3) * 80}>
                  <EventCard
                    accent={["primary", "gold", "info"][i % 3] as "primary" | "gold" | "info"}
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
          )}
        </div>
      </div>
    </main>
  );
}
