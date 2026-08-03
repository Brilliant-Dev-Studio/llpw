"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling, { type DotType } from "qr-code-styling";

export type QRStyle = {
  fgColor: string;
  bgColor: string;
  dotType: DotType;
  includeLogo: boolean;
};

export default function QRPreview({
  data,
  style,
  fileName,
}: {
  data: string;
  style: QRStyle;
  fileName: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: 220,
      height: 220,
      type: "canvas",
      data,
      image: style.includeLogo ? "/logo.jpg" : undefined,
      margin: 8,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions: { type: style.dotType, color: style.fgColor },
      cornersSquareOptions: { type: "extra-rounded", color: style.fgColor },
      backgroundOptions: { color: style.bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.4 },
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      qrRef.current.append(containerRef.current);
    }
  }, [data, style.fgColor, style.bgColor, style.dotType, style.includeLogo]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl border border-border"
      />
      <button
        type="button"
        data-html2canvas-ignore="true"
        onClick={() => qrRef.current?.download({ name: fileName, extension: "png" })}
        className="rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-contrast"
      >
        Download PNG
      </button>
    </div>
  );
}
