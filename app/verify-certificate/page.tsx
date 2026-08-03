"use client";

import { useRef, useState } from "react";
import jsQR from "jsqr";

type Certificate = {
  code: string;
  schoolName: string;
  studentName: string;
  rollNo: string;
  className: string;
  photoUrl: string | null;
};

type Result =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "found"; certificate: Certificate }
  | { status: "not-found" }
  | { status: "no-qr" };

async function decodeQrFromFile(file: File): Promise<string | null> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const result = jsQR(imageData.data, imageData.width, imageData.height);
  return result?.data ?? null;
}

export default function VerifyCertificatePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [pressed, setPressed] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<Result>({ status: "idle" });

  const verifyCode = async (value: string) => {
    if (!value) return;
    setResult({ status: "checking" });
    const res = await fetch(`/api/verify?code=${encodeURIComponent(value)}`);
    const data = await res.json();
    setResult(
      data.found
        ? { status: "found", certificate: data.certificate }
        : { status: "not-found" },
    );
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setResult({ status: "checking" });
    const decoded = await decodeQrFromFile(file);
    if (!decoded) {
      setResult({ status: "no-qr" });
      return;
    }
    setCode(decoded);
    verifyCode(decoded);
  };

  const pressSeal = () => {
    setPressed(true);
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
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
          className={`rounded-sm border p-5 transition-colors sm:p-10 ${
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
              onChange={(e) => handleFile(e.target.files?.[0])}
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
              onChange={(e) => handleFile(e.target.files?.[0])}
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
                placeholder="LLPW-XXXXXXXX"
                className="rounded-sm border border-hairline bg-bg-default px-4 py-3 font-ledger tracking-widest text-text-primary shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] outline-none focus:border-primary"
              />
            </label>
            <button
              type="button"
              onClick={() => verifyCode(code)}
              disabled={!code || result.status === "checking"}
              className="self-end rounded-sm bg-text-disabled px-6 py-3 font-ledger text-sm uppercase tracking-widest text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] transition-transform disabled:cursor-not-allowed enabled:bg-text-primary enabled:hover:bg-primary enabled:active:scale-95"
            >
              {result.status === "checking" ? "Checking…" : "Verify"}
            </button>
          </div>

          {result.status === "found" && (
            <div className="mt-8 flex items-center gap-4 rounded-sm border border-success/30 bg-success/5 p-4">
              {result.certificate.photoUrl && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-hairline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.certificate.photoUrl}
                    alt={result.certificate.studentName}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-success">
                  Valid certificate
                </p>
                <p className="text-sm text-text-primary">
                  {result.certificate.studentName} · Roll No{" "}
                  {result.certificate.rollNo} · {result.certificate.className}
                </p>
                <p className="text-xs text-text-secondary">
                  {result.certificate.schoolName}
                </p>
              </div>
            </div>
          )}

          {result.status === "not-found" && (
            <p className="mt-8 rounded-sm border border-error/30 bg-error/5 p-4 text-center text-sm text-error">
              No certificate matches this code.
            </p>
          )}

          {result.status === "no-qr" && (
            <p className="mt-8 rounded-sm border border-warning/30 bg-warning/5 p-4 text-center text-sm text-warning">
              Couldn&apos;t find a QR code in that photo — try again or enter
              the code manually.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
