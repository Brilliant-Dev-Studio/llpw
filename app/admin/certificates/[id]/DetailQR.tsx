"use client";

import QRPreview from "../../generate/QRPreview";

export default function DetailQR({ code }: { code: string }) {
  return (
    <QRPreview
      data={code}
      style={{
        fgColor: "#ED1C24",
        bgColor: "#FFFFFF",
        dotType: "rounded",
        includeLogo: true,
      }}
      fileName={code}
    />
  );
}
