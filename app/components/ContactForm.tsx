"use client";

import { useState } from "react";

function FieldIcon({ path }: { path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4 shrink-0 text-text-disabled"
    >
      <path d={path} />
    </svg>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 700);
  };

  return (
    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-border shadow-[0_25px_60px_-25px_rgba(26,26,26,0.35)] md:grid-cols-5">
      <div className="flex flex-col justify-between gap-8 bg-primary p-6 text-primary-contrast sm:p-8 md:col-span-2">
        <div>
          <p className="font-ledger text-xs uppercase tracking-widest text-white/70">
            Get in touch
          </p>
          <h3 className="mt-3 font-display text-2xl italic leading-snug">
            We&apos;d love to hear from you.
          </h3>
        </div>

        <div className="flex flex-col gap-4 text-sm text-white/90">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="min-w-0 break-all">info@llpw-edu.com</span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z" />
              </svg>
            </span>
            <span className="min-w-0 wrap-break-word">+95 9975362219</span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
            </span>
            <span className="min-w-0 wrap-break-word">Lashio</span>
          </div>
        </div>

        <p className="text-xs text-white/60">
          We typically reply within 1–2 business days.
        </p>
      </div>

      <div className="bg-bg-paper p-6 sm:p-8 md:col-span-3">
        {sent ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-7 w-7"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <p className="font-semibold text-text-primary">Message sent</p>
            <p className="max-w-xs text-sm text-text-secondary">
              Thanks for reaching out — we&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-secondary">
                Name
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 focus-within:border-primary">
                <FieldIcon path="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" />
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full bg-transparent py-3 text-text-primary outline-none placeholder:text-text-disabled"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-secondary">
                Email
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 focus-within:border-primary">
                <FieldIcon path="M3 5h18v14H3zM3 7l9 6 9-6" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-3 text-text-primary outline-none placeholder:text-text-disabled"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-secondary">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="How can we help?"
                className="resize-none rounded-lg border border-border bg-white px-3 py-3 text-text-primary outline-none focus:border-primary placeholder:text-text-disabled"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-contrast transition-colors hover:bg-primary-dark disabled:opacity-70"
            >
              {submitting ? (
                "Sending…"
              ) : (
                <>
                  Send message
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
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
