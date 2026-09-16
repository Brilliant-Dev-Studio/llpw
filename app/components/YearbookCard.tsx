import Image from "next/image";
import Link from "next/link";

export type YearbookCardData = {
  id: string;
  title: string;
  year: number;
  cover: { url: string; blurDataUrl: string | null } | null;
};

const spineClasses = {
  primary: "from-primary to-primary-dark",
  gold: "from-accent-gold to-accent-gold-dark",
  info: "from-info to-[#01579b]",
} as const;

export default function YearbookCard({
  yearbook,
  priority = false,
  accent = "primary",
}: {
  yearbook: YearbookCardData;
  priority?: boolean;
  accent?: keyof typeof spineClasses;
}) {
  return (
    <Link
      href={`/yearbooks/${yearbook.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-bg-paper shadow-[0_10px_28px_-14px_rgba(26,26,26,0.3)] transition-all duration-300 hover:-translate-y-2 hover:-rotate-1 hover:border-accent-gold/60 hover:shadow-[0_28px_48px_-16px_rgba(26,26,26,0.4)]"
    >
      <span className="register-mark left-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
      <span className="register-mark right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />

      <div className="flex">
        <div className={`relative w-3 shrink-0 bg-linear-to-b ${spineClasses[accent]}`}>
          <div className="book-pages-edge absolute inset-0" />
        </div>
        <div className="relative aspect-3/4 flex-1 overflow-hidden bg-bg-default">
          {yearbook.cover ? (
            <Image
              src={yearbook.cover.url}
              alt={yearbook.title}
              fill
              priority={priority}
              sizes="(min-width:768px) 25vw, 45vw"
              placeholder={yearbook.cover.blurDataUrl ? "blur" : undefined}
              blurDataURL={yearbook.cover.blurDataUrl ?? undefined}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br p-4 text-center ${spineClasses[accent]}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-8 w-8 text-white/70"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
              </svg>
              <p className="font-display text-sm italic leading-snug text-white">
                {yearbook.title}
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
      </div>

      <div className="perforation opacity-60" />
      <div className="flex flex-1 flex-col gap-2 p-4 pt-3">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-gold/10 px-3 py-1 font-ledger text-[11px] font-semibold uppercase tracking-widest text-accent-gold-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3 w-3"
          >
            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
            <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
          </svg>
          Class of {yearbook.year}
        </span>
        <h3 className="font-display text-lg italic leading-snug text-text-primary transition-colors group-hover:text-primary">
          {yearbook.title}
        </h3>
      </div>
    </Link>
  );
}
