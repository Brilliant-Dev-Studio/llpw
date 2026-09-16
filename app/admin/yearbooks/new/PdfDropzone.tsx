"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function formatFileSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function PdfDropzone({
  onFileChange,
  disabled = false,
}: {
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const next = acceptedFiles[0] ?? null;
      setFile(next);
      onFileChange(next);
    },
    [onFileChange],
  );

  const remove = () => {
    setFile(null);
    onFileChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled,
  });

  if (file) {
    return (
      <div className={`flex items-center gap-3 ${disabled ? "opacity-60" : ""}`}>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-error/10 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          </svg>
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-primary">{file.name}</p>
          <p className="text-xs text-text-disabled">{formatFileSize(file.size)}</p>
          {!disabled && (
            <button
              type="button"
              onClick={remove}
              className="text-left text-xs font-medium text-error hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
        disabled
          ? "cursor-not-allowed border-border bg-bg-default/50"
          : isDragActive
            ? "cursor-pointer border-primary bg-primary/5"
            : "cursor-pointer border-border hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} />
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-default text-text-disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-5 w-5"
        >
          <path d="M12 3v12" />
          <path d="m7 8 5-5 5 5" />
          <path d="M5 21h14" />
        </svg>
      </span>
      <p className="text-sm font-medium text-text-primary">
        {isDragActive ? "Drop the PDF here" : "Drag & drop the yearbook PDF, or click to browse"}
      </p>
      <p className="text-xs text-text-disabled">Required — one PDF for this batch</p>
    </div>
  );
}
