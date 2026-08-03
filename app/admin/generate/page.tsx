import Link from "next/link";
import GenerateForm from "./GenerateForm";

export default function GenerateQRPage() {
  return (
    <main className="guilloche-bg min-h-screen">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 pb-24">
        <div>
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
          <h1 className="mt-4 font-display text-2xl italic text-text-primary">
            Generate Certificate QR
          </h1>
          <p className="text-sm text-text-secondary">
            Issue a new student certificate and QR code.
          </p>
        </div>
        <GenerateForm />
      </div>
    </main>
  );
}
