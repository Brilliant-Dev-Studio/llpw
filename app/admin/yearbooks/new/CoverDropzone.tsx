"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type CoverFile = {
  file: File;
  preview: string;
};

export default function CoverDropzone({
  onFileChange,
  disabled = false,
}: {
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}) {
  const [item, setItem] = useState<CoverFile | null>(null);

  useEffect(() => {
    return () => {
      if (item) URL.revokeObjectURL(item.preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFileChange(item?.file ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setItem((prev) => {
      if (prev) URL.revokeObjectURL(prev.preview);
      return { file, preview: URL.createObjectURL(file) };
    });
  }, []);

  const remove = () => {
    setItem((prev) => {
      if (prev) URL.revokeObjectURL(prev.preview);
      return null;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    disabled,
  });

  if (item) {
    return (
      <div className={`flex items-center gap-3 ${disabled ? "opacity-60" : ""}`}>
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.preview} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-primary">{item.file.name}</p>
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
        {isDragActive ? "Drop cover image here" : "Drag & drop a cover image, or click to browse"}
      </p>
      <p className="text-xs text-text-disabled">Optional — shown on the shelf card</p>
    </div>
  );
}
