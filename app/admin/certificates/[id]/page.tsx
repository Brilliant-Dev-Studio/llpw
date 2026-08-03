import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteButton from "../../DeleteButton";
import CertificatePdfButton from "../../CertificatePdfButton";
import DetailQR from "./DetailQR";

export const dynamic = "force-dynamic";

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await prisma.certificate.findUnique({ where: { id } });

  if (!certificate) notFound();

  const fields = [
    { label: "Student name", value: certificate.studentName },
    { label: "Roll no", value: certificate.rollNo },
    { label: "Class", value: certificate.className },
    { label: "School", value: certificate.schoolName },
    { label: "Issued", value: certificate.createdAt.toLocaleString() },
  ];

  return (
    <main className="guilloche-bg min-h-screen">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 pb-24">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to certificates
          </Link>
          <div className="flex items-center gap-3">
            <CertificatePdfButton
              targetId="certificate-card"
              fileName={certificate.code}
            />
            <DeleteButton id={certificate.id} studentName={certificate.studentName} />
          </div>
        </div>

        <div
          id="certificate-card"
          className="relative grid gap-8 rounded-sm border border-hairline bg-paper/70 p-8 shadow-[0_20px_60px_-25px_rgba(26,26,26,0.25)] sm:grid-cols-5"
        >
          <span className="register-mark left-2 top-2" />
          <span className="register-mark right-2 top-2" />
          <span className="register-mark bottom-2 left-2" />
          <span className="register-mark bottom-2 right-2" />

          <div className="flex flex-col items-center gap-4 sm:col-span-2">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-accent-gold bg-bg-default shadow-[0_0_0_4px_var(--color-paper),0_0_0_5px_var(--color-hairline)]">
              {certificate.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={certificate.photoUrl}
                  alt={certificate.studentName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-ledger text-xl font-semibold text-text-disabled">
                  {certificate.studentName
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            <DetailQR code={certificate.code} />
            <span className="rounded-md bg-primary/10 px-3 py-1.5 font-ledger text-sm font-medium tracking-wide text-primary">
              {certificate.code}
            </span>
          </div>

          <dl className="flex flex-col gap-4 sm:col-span-3">
            {fields.map((field) => (
              <div key={field.label}>
                <dt className="font-ledger text-[11px] font-medium uppercase tracking-widest text-ink-soft">
                  {field.label}
                </dt>
                <dd className="mt-1 text-text-primary">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
