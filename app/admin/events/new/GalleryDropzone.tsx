"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILES = 20;

type GalleryFile = {
  file: File;
  preview: string;
};

export default function GalleryDropzone({
  onFilesChange,
  disabled = false,
}: {
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}) {
  const [items, setItems] = useState<GalleryFile[]>([]);

  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFilesChange(items.map((i) => i.file));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setItems((prev) => {
      const room = MAX_FILES - prev.length;
      const next = acceptedFiles.slice(0, Math.max(room, 0)).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      return [...prev, ...next];
    });
  }, []);

  const removeAt = (index: number) => {
    setItems((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const atLimit = items.length >= MAX_FILES;
  const dropDisabled = atLimit || disabled;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    disabled: dropDisabled,
  });

  return (
    <div className={`flex flex-col gap-3 ${disabled ? "opacity-60" : ""}`}>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
          dropDisabled
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
          {atLimit
            ? "Maximum 20 photos reached"
            : isDragActive
              ? "Drop photos here"
              : "Drag & drop photos, or click to browse"}
        </p>
        <p className="text-xs text-text-disabled">
          {items.length}/{MAX_FILES} photos · compressed automatically on upload
        </p>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {items.map((item, i) => (
            <div
              key={item.preview}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.preview}
                alt=""
                className="h-full w-full object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label="Remove photo"
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-text-primary/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-3.5 w-3.5"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
