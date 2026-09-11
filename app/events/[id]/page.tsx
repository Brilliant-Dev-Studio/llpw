import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Reveal from "../../components/Reveal";
import Lightbox from "./Lightbox";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!event) notFound();

  const formattedDate = event.date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-col">
      <section className="event-banner-bg relative overflow-hidden border-y border-accent-gold-light/20 px-6 py-14 sm:px-12 sm:py-20">
        <span className="register-mark left-4 top-4 opacity-40" />
        <span className="register-mark right-4 top-4 opacity-40" />
        <span className="register-mark bottom-4 left-4 opacity-40" />
        <span className="register-mark bottom-4 right-4 opacity-40" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to events
          </Link>
          <Reveal className="flex flex-col items-center gap-4">
            <span className="rounded-full border border-accent-gold-light/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-gold-light sm:text-sm">
              {formattedDate}
            </span>
            <h1 className="max-w-2xl font-display text-4xl italic leading-tight text-white sm:text-5xl">
              {event.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-gold-light/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold-light" />
              <span className="h-px w-10 bg-accent-gold-light/60" />
            </div>
            <p className="text-sm text-white/70">
              {event.images.length} photo{event.images.length === 1 ? "" : "s"}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-5xl">
          {event.images.length === 0 ? (
            <p className="text-center text-text-secondary">
              No photos in this gallery yet.
            </p>
          ) : (
            <Lightbox images={event.images} />
          )}
        </div>
      </section>
    </main>
  );
}
