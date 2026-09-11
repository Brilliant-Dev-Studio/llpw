"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  blurDataUrl: string;
  width: number;
  height: number;
};

export default function Lightbox({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-bg-default shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/60 hover:shadow-lg"
          >
            <Image
              src={img.url}
              alt=""
              fill
              sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
              placeholder="blur"
              blurDataURL={img.blurDataUrl}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-1000 flex animate-[fadein_.15s_ease-out] flex-col items-center justify-center bg-black/95 p-4"
          style={{ animationName: "fadein" }}
          onClick={() => setIndex(null)}
        >
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 sm:px-6">
            <span className="font-ledger text-xs uppercase tracking-widest text-white/60">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div
            key={index}
            className="relative h-full max-h-[80vh] w-full max-w-4xl animate-[zoomin_.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].url}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={images[index].blurDataUrl}
              className="rounded-lg object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomin {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
