"use client";

import { useState } from "react";
import type { DotType } from "qr-code-styling";
import { createCertificate } from "../actions";
import QRPreview, { type QRStyle } from "./QRPreview";
import ColorSwatchPicker from "./ColorSwatchPicker";
import PhotoDropzone from "./PhotoDropzone";

const dotTypes: { value: DotType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "classy", label: "Classy" },
  { value: "extra-rounded", label: "Extra rounded" },
];

export default function GenerateForm() {
  const [code, setCode] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [style, setStyle] = useState<QRStyle>({
    fgColor: "#ED1C24",
    bgColor: "#FFFFFF",
    dotType: "rounded",
    includeLogo: true,
  });

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    if (photoFile) formData.set("photoFile", photoFile);
    const newCode = await createCertificate(formData);
    setCode(newCode);
    setSubmitting(false);
  };

  if (code) {
    return (
      <div className="relative mx-auto flex max-w-md flex-col items-center gap-4 rounded-sm border border-hairline bg-paper/70 p-4 text-center shadow-sm sm:p-8">
        <span className="register-mark left-2 top-2" />
        <span className="register-mark right-2 top-2" />
        <span className="register-mark bottom-2 left-2" />
        <span className="register-mark bottom-2 right-2" />
        <p className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
          Certificate issued
        </p>
        <p className="font-ledger text-xl font-semibold text-primary">
          {code}
        </p>
        <QRPreview data={code} style={style} fileName={code} />
        <button
          type="button"
          onClick={() => setCode(null)}
          className="mt-2 text-sm font-medium text-text-secondary hover:text-primary"
        >
          Generate another
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            School name
          </span>
          <input
            required
            name="schoolName"
            defaultValue="LLPW International School University"
            className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Student name
          </span>
          <input
            required
            name="studentName"
            placeholder="Student name"
            className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-secondary">
              Roll no
            </span>
            <input
              required
              name="rollNo"
              placeholder="12"
              className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-secondary">
              Class
            </span>
            <input
              required
              name="className"
              placeholder="Grade 10 - A"
              className="rounded-lg border border-border bg-white px-4 py-3 text-text-primary outline-none focus:border-primary"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">
            Student photo
          </span>
          <PhotoDropzone onFileSelect={setPhotoFile} />
        </label>

        <div className="mt-2 rounded-sm border border-hairline bg-paper/50 p-4">
          <p className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
            QR style
          </p>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-text-secondary">
                Foreground color
              </span>
              <ColorSwatchPicker
                value={style.fgColor}
                onChange={(color) =>
                  setStyle((s) => ({ ...s, fgColor: color }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-text-secondary">
                Background color
              </span>
              <ColorSwatchPicker
                value={style.bgColor}
                onChange={(color) =>
                  setStyle((s) => ({ ...s, bgColor: color }))
                }
              />
            </div>
          </div>
          <label className="mt-3 flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-secondary">
              Pattern
            </span>
            <select
              value={style.dotType}
              onChange={(e) =>
                setStyle((s) => ({ ...s, dotType: e.target.value as DotType }))
              }
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-primary"
            >
              {dotTypes.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={style.includeLogo}
              onChange={(e) =>
                setStyle((s) => ({ ...s, includeLogo: e.target.checked }))
              }
            />
            Include LLPW logo in center
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-lg bg-primary px-6 py-3 font-ledger text-sm uppercase tracking-widest text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] transition-colors hover:bg-primary-dark disabled:opacity-70"
        >
          {submitting ? "Generating…" : "Generate certificate QR"}
        </button>
      </form>

      <div className="relative flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-hairline bg-paper/40 p-4 text-center text-sm text-text-disabled sm:p-8">
        <QRPreview
          data="LLPW-PREVIEW"
          style={style}
          fileName="preview"
        />
        Live style preview — final QR encodes the real certificate code.
      </div>
    </div>
  );
}
