export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-bg-default px-6 py-20 text-center">
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
        Loading…
      </p>
    </div>
  );
}
