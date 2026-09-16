import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Reveal from "../../components/Reveal";
import PdfFlipbook from "./PdfFlipbook";

function formatFileSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const yearbook = await prisma.yearbook.findUnique({ where: { id } });
  return { title: yearbook?.title ?? "Yearbook" };
}

export default async function YearbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const yearbook = await prisma.yearbook.findUnique({ where: { id } });

  if (!yearbook) notFound();

  return (
    <main className="flex flex-col">
      <section className="event-banner-bg relative overflow-hidden border-y border-accent-gold-light/20 px-6 py-14 sm:px-12 sm:py-20">
        <span className="register-mark left-4 top-4 opacity-40" />
        <span className="register-mark right-4 top-4 opacity-40" />
        <span className="register-mark bottom-4 left-4 opacity-40" />
        <span className="register-mark bottom-4 right-4 opacity-40" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center">
          <Link
            href="/yearbooks"
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
            Back to yearbooks
          </Link>
          <Reveal className="flex flex-col items-center gap-4">
            <span className="rounded-full border border-accent-gold-light/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-gold-light sm:text-sm">
              Class of {yearbook.year}
            </span>
            <h1 className="max-w-2xl font-display text-4xl italic leading-tight text-white sm:text-5xl">
              {yearbook.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-gold-light/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent-gold-light" />
              <span className="h-px w-10 bg-accent-gold-light/60" />
            </div>
            <p className="text-sm text-white/70">
              {formatFileSize(yearbook.fileSize)}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
          <PdfFlipbook pdfUrl={`/yearbooks/${yearbook.id}/pdf`} />

          <a
            href={yearbook.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-contrast"
          >
            Download PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19.5V21h16v-1.5" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
