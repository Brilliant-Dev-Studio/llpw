import Image from "next/image";
import Link from "next/link";

export type EventCardData = {
  id: string;
  title: string;
  date: Date;
  cover: { url: string; blurDataUrl: string } | null;
};

const accentClasses = {
  primary: "from-primary to-primary-light",
  gold: "from-accent-gold to-accent-gold-light",
  info: "from-info to-[#4fc3f7]",
} as const;

export default function EventCard({
  event,
  priority = false,
  accent = "primary",
}: {
  event: EventCardData;
  priority?: boolean;
  accent?: keyof typeof accentClasses;
}) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-bg-paper shadow-[0_10px_28px_-14px_rgba(26,26,26,0.25)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-gold/60 hover:shadow-[0_26px_48px_-18px_rgba(26,26,26,0.35)] hover:ring-accent-gold/20"
    >
      <span className="register-mark left-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
      <span className="register-mark right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
      <div className={`h-1.5 w-full bg-linear-to-r ${accentClasses[accent]}`} />
      <div className="relative aspect-4/3 w-full overflow-hidden bg-bg-default">
        {event.cover ? (
          <Image
            src={event.cover.url}
            alt={event.title}
            fill
            priority={priority}
            sizes="(min-width:768px) 33vw, 100vw"
            placeholder="blur"
            blurDataURL={event.cover.blurDataUrl}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-disabled">
            No photos yet
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
        </span>
      </div>
      <div className="perforation opacity-60" />
      <div className="flex flex-1 flex-col gap-2 p-5 pt-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-gold/10 px-3 py-1 font-ledger text-[11px] font-semibold uppercase tracking-widest text-accent-gold-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3 w-3"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {event.date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <h3 className="font-display text-xl italic leading-snug text-text-primary transition-colors group-hover:text-primary">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}
