"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createYearbook } from "../actions";
import CoverDropzone from "./CoverDropzone";
import PdfDropzone from "./PdfDropzone";

// useFormStatus only reports pending state to descendants of the <form>,
// so it can't be read directly in the component that renders the form.
// This bridges it up to local state via the child's own render/effect cycle,
// which (unlike a plain setState inside the action) isn't held back until
// the action settles.
function PendingWatcher({ onChange }: { onChange: (pending: boolean) => void }) {
  const { pending } = useFormStatus();
  useEffect(() => {
    onChange(pending);
  }, [pending, onChange]);
  return null;
}

export default function NewYearbookForm() {
  const [submitting, setSubmitting] = useState(false);
  const [cover, setCover] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const handleSubmit = async (formData: FormData) => {
    formData.delete("cover");
    formData.delete("pdf");
    if (cover) formData.append("cover", cover);
    if (pdf) formData.append("pdf", pdf);
    await createYearbook(formData);
  };

  return (
    <div className="relative mx-auto max-w-2xl">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <PendingWatcher onChange={setSubmitting} />
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Yearbook title
          </span>
          <input
            required
            name="title"
            placeholder="LLPW Yearbook"
            disabled={submitting}
            className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Graduation year
          </span>
          <input
            required
            type="number"
            name="year"
            placeholder="2026"
            min={2000}
            max={2100}
            disabled={submitting}
            className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Cover image
          </span>
          <CoverDropzone onFileChange={setCover} disabled={submitting} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Yearbook PDF
          </span>
          <PdfDropzone onFileChange={setPdf} disabled={submitting} />
        </label>

        <button
          type="submit"
          disabled={submitting || !pdf}
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-ledger text-sm uppercase tracking-widest text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] transition-colors hover:bg-primary-dark disabled:opacity-70"
        >
          {submitting && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-9-9" />
            </svg>
          )}
          {submitting ? "Uploading…" : "Publish yearbook"}
        </button>
      </form>

      {submitting && (
        <div className="absolute inset-0 -m-4 flex flex-col items-center justify-center gap-3 rounded-xl bg-paper/90 text-center backdrop-blur-sm sm:-m-8">
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
            Uploading yearbook…
          </p>
          <p className="max-w-xs text-xs text-text-disabled">
            This can take a moment for large PDFs. Don&apos;t close this tab.
          </p>
        </div>
      )}
    </div>
  );
}
