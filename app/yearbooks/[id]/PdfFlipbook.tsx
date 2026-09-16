"use client";

import { forwardRef, useEffect, useRef, useState, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

const TARGET_WIDTH = 900;
const RENDER_AHEAD = 2;

type PageFlipInstance = {
  flipNext: () => void;
  flipPrev: () => void;
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
};
type FlipBookHandle = { pageFlip: () => PageFlipInstance };

const PdfPage = forwardRef<HTMLDivElement, { pageNumber: number; image?: string }>(
  ({ pageNumber, image }, ref) => (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center bg-white"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`Page ${pageNumber}`}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-bg-default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-6 w-6 animate-spin text-accent-gold-dark"
          >
            <path d="M21 12a9 9 0 1 1-9-9" />
          </svg>
        </div>
      )}
      <span className="absolute bottom-2 right-3 font-ledger text-[10px] text-ink-soft/60">
        {pageNumber}
      </span>
    </div>
  ),
);
PdfPage.displayName = "PdfPage";

export default function PdfFlipbook({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageImages, setPageImages] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);
  const renderedRef = useRef<Set<number>>(new Set());
  const bookRef = useRef<FlipBookHandle | null>(null);

  const renderPage = useCallback(async (pageNum: number) => {
    if (renderedRef.current.has(pageNum)) return;
    const doc = pdfDocRef.current;
    if (!doc) return;
    renderedRef.current.add(pageNum);

    const page = await doc.getPage(pageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = TARGET_WIDTH / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    const dataUrl = canvas.toDataURL("image/webp", 0.82);
    setPageImages((prev) => ({ ...prev, [pageNum - 1]: dataUrl }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const doc = await pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: "/pdfjs/cmaps/",
          cMapPacked: true,
          standardFontDataUrl: "/pdfjs/standard_fonts/",
        }).promise;
        if (cancelled) return;

        pdfDocRef.current = doc;
        setNumPages(doc.numPages);

        const firstBatch = Math.min(doc.numPages, RENDER_AHEAD + 1);
        for (let i = 1; i <= firstBatch; i++) {
          await renderPage(i);
        }
        if (!cancelled) setLoading(false);
      } catch (err) {
        console.error("[PdfFlipbook] failed to load PDF:", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfUrl]);

  const handleFlip = useCallback(
    (e: { data: number }) => {
      setCurrentPage(e.data);
      if (!numPages) return;
      const from = Math.max(1, e.data + 1 - RENDER_AHEAD);
      const to = Math.min(numPages, e.data + 1 + RENDER_AHEAD);
      for (let p = from; p <= to; p++) renderPage(p);
    },
    [numPages, renderPage],
  );

  if (error) {
    return (
      <p className="rounded-xl border border-hairline bg-paper/70 px-6 py-10 text-center text-text-secondary">
        Couldn&apos;t load this PDF for preview. Use the download link below
        instead.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="guilloche-bg relative w-full max-w-3xl rounded-2xl border border-hairline p-4 shadow-[0_20px_60px_-25px_rgba(26,26,26,0.4)] sm:p-8">
        {loading || !numPages ? (
          <div className="flex aspect-3/4 max-h-[70vh] w-full flex-col items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-8 w-8 animate-spin text-primary"
            >
              <path d="M21 12a9 9 0 1 1-9-9" />
            </svg>
            <p className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
              Opening book…
            </p>
          </div>
        ) : (
          <HTMLFlipBook
            ref={bookRef}
            className="mx-auto"
            style={{}}
            width={500}
            height={700}
            size="stretch"
            minWidth={260}
            maxWidth={900}
            minHeight={364}
            maxHeight={1260}
            drawShadow
            flippingTime={700}
            usePortrait
            startPage={0}
            startZIndex={0}
            autoSize
            maxShadowOpacity={0.5}
            showCover
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            onFlip={handleFlip}
          >
            {Array.from({ length: numPages }).map((_, i) => (
              <PdfPage key={i} pageNumber={i + 1} image={pageImages[i]} />
            ))}
          </HTMLFlipBook>
        )}
      </div>

      {!loading && numPages && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip().flipPrev()}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-paper text-text-primary transition-colors hover:bg-white disabled:opacity-40"
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
          </button>
          <span className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
            Page {currentPage + 1} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip().flipNext()}
            disabled={currentPage >= numPages - 1}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-paper text-text-primary transition-colors hover:bg-white disabled:opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
