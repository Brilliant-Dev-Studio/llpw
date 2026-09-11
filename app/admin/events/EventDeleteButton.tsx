"use client";

import { useEffect, useState, useTransition } from "react";
import { deleteEvent } from "./actions";

export default function EventDeleteButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const confirmDelete = () => {
    startTransition(() => {
      deleteEvent(id);
    });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={isPending}
        aria-label={`Delete event ${title}`}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-disabled transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4"
        >
          <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7h14Z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-1000 flex items-center justify-center bg-text-primary/50 px-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="animate-stamp-in relative w-full max-w-sm rounded-sm border border-hairline bg-paper p-6 shadow-[0_20px_60px_-15px_rgba(26,26,26,0.45)]"
          >
            <span className="register-mark left-2 top-2" />
            <span className="register-mark right-2 top-2" />
            <span className="register-mark bottom-2 left-2" />
            <span className="register-mark bottom-2 right-2" />

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-error/10 text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7h14Z" />
              </svg>
            </span>

            <p className="mt-4 font-ledger text-xs uppercase tracking-widest text-ink-soft">
              Delete event
            </p>
            <h2 className="mt-1 font-display text-xl italic text-text-primary">
              Remove &ldquo;{title}&rdquo;?
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              This permanently deletes the event and every photo in its
              gallery from storage. This can&apos;t be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-hairline px-4 py-2 text-sm font-medium text-text-secondary hover:bg-bg-default"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-error px-4 py-2 text-sm font-semibold text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] hover:bg-error/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
