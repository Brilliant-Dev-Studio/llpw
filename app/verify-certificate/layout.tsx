import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authenticity QR Check",
  description:
    "Verify the authenticity of an LLPW International School University certificate or student ID by scanning its QR code or entering the certificate number.",
  alternates: {
    canonical: "/verify-certificate",
  },
};

export default function VerifyCertificateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
