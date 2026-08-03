"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PhotoDropzone({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
      onFileSelect(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed px-4 py-4 transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} />

      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full border border-border object-cover"
        />
      ) : (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bg-default text-text-disabled">
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
      )}

      <div className="min-w-0 text-sm">
        <p className="truncate font-medium text-text-primary">
          {fileName ?? (isDragActive ? "Drop photo here" : "Drag & drop a photo")}
        </p>
        <p className="text-xs text-text-disabled">
          or click to browse — uploaded to S3 on generate
        </p>
      </div>
    </div>
  );
}
