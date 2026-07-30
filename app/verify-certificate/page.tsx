"use client";

import { useRef, useState } from "react";

export default function VerifyCertificatePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [pressed, setPressed] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const pressSeal = () => {
    setPressed(true);
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleVerify = () => {
    if (!code) return;
    setVerifying(true);
    window.setTimeout(() => setVerifying(false), 900);
  };

  return (
    <main className="guilloche-bg relative flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="animate-stamp-in relative w-full max-w-lg rounded-sm border border-hairline bg-paper/60 p-1 shadow-[0_20px_60px_-25px_rgba(26,26,26,0.35)]">
        <span className="register-mark -left-1 -top-1" />
        <span className="register-mark -right-1 -top-1" />
        <span className="register-mark -bottom-1 -left-1" />
        <span className="register-mark -bottom-1 -right-1" />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`rounded-sm border p-8 transition-colors sm:p-10 ${
            dragOver ? "border-primary bg-primary/5" : "border-hairline"
          }`}
        >
          <div className="flex items-center justify-between font-ledger text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            <span>Certificate Verification</span>
            <span>No. LLPW—AUTH</span>
          </div>

          <h1 className="mt-6 text-center font-display text-4xl italic text-text-primary sm:text-5xl">
            Prove it&apos;s real.
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-text-secondary">
            Scan the seal on your certificate or ID card, drop its photo
            here, or enter its code by hand.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <button
              type="button"
              onClick={pressSeal}
              onAnimationEnd={() => setPressed(false)}
              className={`wax-seal relative flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-accent-gold text-primary-contrast shadow-[0_6px_14px_-4px_rgba(179,0,6,0.55),0_0_0_4px_var(--color-paper),0_0_0_5px_var(--color-hairline)] transition-transform hover:scale-[1.03] active:scale-95 ${
                pressed ? "animate-stamp-press" : ""
              } ${dragOver ? "scale-[1.05]" : ""}`}
            >
              <span className="wax-drip h-5 w-5 -bottom-1 left-3" />
              <span className="wax-drip h-4 w-4 -bottom-1.5 right-5" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-12 w-12 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
              >
                <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </button>
            <span className="mt-4 font-ledger text-xs uppercase tracking-widest text-ink-soft">
              {fileName ?? "Press the seal, or drop a photo here"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="mt-5 flex items-center gap-2 rounded-full border border-primary px-5 py-2 font-ledger text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-contrast"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M4 8V6a2 2 0 0 1 2-2h2l2-2h4l2 2h2a2 2 0 0 1 2 2v2" />
                <path d="M2 8h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Use camera instead
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              className="hidden"
            />
          </div>

          <div className="perforation my-10" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 flex-col gap-1">
              <span className="font-ledger text-[11px] uppercase tracking-widest text-ink-soft">
                Certificate code
              </span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="SR-XXXXXXXX"
                className="rounded-sm border border-hairline bg-bg-default px-4 py-3 font-ledger tracking-widest text-text-primary shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] outline-none focus:border-primary"
              />
            </label>
            <button
              type="button"
              onClick={handleVerify}
              disabled={!code || verifying}
              className="self-end rounded-sm bg-text-disabled px-6 py-3 font-ledger text-sm uppercase tracking-widest text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] transition-transform disabled:cursor-not-allowed enabled:bg-text-primary enabled:hover:bg-primary enabled:active:scale-95"
            >
              {verifying ? "Checking…" : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
