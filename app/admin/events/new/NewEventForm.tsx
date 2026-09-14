"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createEvent } from "../actions";
import GalleryDropzone from "./GalleryDropzone";

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

export default function NewEventForm() {
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (formData: FormData) => {
    formData.delete("images");
    files.forEach((file) => formData.append("images", file));
    await createEvent(formData);
  };

  return (
    <div className="relative mx-auto max-w-2xl">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <PendingWatcher onChange={setSubmitting} />
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Event title
          </span>
          <input
            required
            name="title"
            placeholder="Annual Sports Day"
            disabled={submitting}
            className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">Date</span>
          <input
            required
            type="date"
            name="date"
            disabled={submitting}
            className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Gallery photos
          </span>
          <GalleryDropzone onFilesChange={setFiles} disabled={submitting} />
        </label>

        <button
          type="submit"
          disabled={submitting}
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
          {submitting ? "Compressing & uploading…" : "Publish event"}
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
            Compressing &amp; uploading{files.length > 0 ? ` ${files.length} photo${files.length === 1 ? "" : "s"}` : ""}…
          </p>
          <p className="max-w-xs text-xs text-text-disabled">
            This can take a moment for large galleries. Don&apos;t close this tab.
          </p>
        </div>
      )}
    </div>
  );
}
