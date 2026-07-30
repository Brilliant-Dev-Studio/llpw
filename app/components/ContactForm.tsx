"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <p className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-bg-paper px-6 py-8 text-text-secondary">
        Thanks — your message has been sent. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-md flex-col gap-4 text-left"
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-secondary">Name</span>
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="rounded-lg border border-border bg-bg-paper px-4 py-3 text-text-primary outline-none focus:border-primary"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-secondary">Email</span>
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          className="rounded-lg border border-border bg-bg-paper px-4 py-3 text-text-primary outline-none focus:border-primary"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-secondary">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="How can we help?"
          className="resize-none rounded-lg border border-border bg-bg-paper px-4 py-3 text-text-primary outline-none focus:border-primary"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-contrast hover:bg-primary-dark"
      >
        Send message
      </button>
    </form>
  );
}
