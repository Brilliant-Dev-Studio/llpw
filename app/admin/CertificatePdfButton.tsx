"use client";

import { useState } from "react";

export default function CertificatePdfButton({
  targetId,
  fileName,
}: {
  targetId: string;
  fileName: string;
}) {
  const [working, setWorking] = useState(false);

  const handleDownload = async () => {
    const node = document.getElementById(targetId);
    if (!node) return;

    setWorking(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] =
        await Promise.all([import("html2canvas-pro"), import("jspdf")]);

      const canvas = await html2canvas(node, {
        backgroundColor: "#fbf6ea",
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation:
          canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
    } finally {
      setWorking(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={working}
      className="flex items-center gap-2 rounded-lg border border-hairline px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-default disabled:opacity-60"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M9 15h6M9 11h2" />
      </svg>
      {working ? "Preparing…" : "Download PDF"}
    </button>
  );
}
