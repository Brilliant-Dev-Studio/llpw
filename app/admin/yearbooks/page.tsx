import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { logout } from "../actions";
import YearbookDeleteButton from "./YearbookDeleteButton";
import AdminNav from "../AdminNav";

export const dynamic = "force-dynamic";

function formatFileSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default async function AdminYearbooksPage() {
  const yearbooks = await prisma.yearbook.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="guilloche-bg min-h-screen">
      <div className="border-b border-hairline">
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="register-mark left-2 top-2" />
          <span className="register-mark right-2 top-2" />
          <div>
            <p className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
              LLPW Admin
            </p>
            <h1 className="mt-1 font-display text-3xl italic text-text-primary">
              Yearbooks
            </h1>
            <AdminNav active="yearbooks" />
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/yearbooks/new"
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] transition-colors hover:bg-primary-dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Yearbook
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-hairline bg-paper px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
        {yearbooks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-hairline bg-paper/70 px-4 py-16 text-center shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-default text-text-disabled">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-6 w-6"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
              </svg>
            </span>
            <p className="text-text-secondary">No yearbooks published yet.</p>
            <Link
              href="/admin/yearbooks/new"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Create your first one
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {yearbooks.map((yearbook) => (
              <div
                key={yearbook.id}
                className="group relative overflow-hidden rounded-xl border border-hairline bg-paper/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-4/3 w-full bg-bg-default">
                  {yearbook.coverUrl ? (
                    <Image
                      src={yearbook.coverUrl}
                      alt={yearbook.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      placeholder={yearbook.blurDataUrl ? "blur" : undefined}
                      blurDataURL={yearbook.blurDataUrl ?? undefined}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-text-disabled">
                      No cover
                    </div>
                  )}
                  <div className="absolute right-2 top-2">
                    <YearbookDeleteButton id={yearbook.id} title={yearbook.title} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
                    Class of {yearbook.year}
                  </p>
                  <h2 className="mt-1 font-display text-lg italic text-text-primary">
                    {yearbook.title}
                  </h2>
                  <p className="mt-1 text-xs text-text-disabled">
                    {formatFileSize(yearbook.fileSize)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
