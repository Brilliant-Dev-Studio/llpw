import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { logout } from "./actions";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const where = q
    ? {
        OR: [
          { studentName: { contains: q, mode: "insensitive" as const } },
          { code: { contains: q, mode: "insensitive" as const } },
          { rollNo: { contains: q, mode: "insensitive" as const } },
          { className: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [total, totalAll, classGroups, latest, certificates] =
    await Promise.all([
      prisma.certificate.count({ where }),
      prisma.certificate.count(),
      prisma.certificate.groupBy({ by: ["className"] }),
      prisma.certificate.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.certificate.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
    ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const stats = [
    {
      label: "Total issued",
      value: totalAll,
      ring: "ring-primary/20 bg-primary/10 text-primary",
      icon: <path d="M9 12h6M9 16h6M9 8h1M4 4h16v16H4z" />,
    },
    {
      label: "Classes covered",
      value: classGroups.length,
      ring: "ring-accent-gold/30 bg-accent-gold/10 text-accent-gold-dark",
      icon: <path d="M3 7 12 3l9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4" />,
    },
    {
      label: "Last issued",
      value: latest ? latest.createdAt.toLocaleDateString() : "—",
      ring: "ring-info/25 bg-info/10 text-info",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </>
      ),
    },
  ];

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

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
              Certificates
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/generate"
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
              Generate QR
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-start gap-4 rounded-xl border border-hairline bg-paper/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ${stat.ring}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-5 w-5"
                >
                  {stat.icon}
                </svg>
              </span>
              <div>
                <p className="font-ledger text-[11px] font-medium uppercase tracking-widest text-ink-soft">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-2xl text-text-primary">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form
          method="GET"
          action="/admin"
          className="flex items-center gap-2 rounded-lg border border-hairline bg-paper/70 px-4 py-2.5 shadow-sm focus-within:border-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 shrink-0 text-text-disabled"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by student, code, roll no, or class…"
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-disabled"
          />
          {q && (
            <Link
              href="/admin"
              className="text-xs font-medium text-text-disabled hover:text-primary"
            >
              Clear
            </Link>
          )}
        </form>

        <div className="overflow-hidden rounded-xl border border-hairline bg-paper/70 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-hairline bg-bg-default/60 font-ledger text-[11px] uppercase tracking-widest text-ink-soft">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Code</th>
                  <th className="px-5 py-3 font-medium">Roll No</th>
                  <th className="px-5 py-3 font-medium">Class</th>
                  <th className="px-5 py-3 font-medium">Issued</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {certificates.map((c) => (
                  <tr
                    key={c.id}
                    className="group relative transition-colors hover:bg-primary/3"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-ledger text-xs font-semibold text-primary ring-1 ring-accent-gold/40">
                          {c.photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.photoUrl}
                              alt={c.studentName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            initials(c.studentName)
                          )}
                        </span>
                        <span className="font-medium text-text-primary">
                          {c.studentName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-md bg-primary/10 px-2 py-1 font-ledger text-xs font-medium tracking-wide text-primary">
                        {c.code}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">
                      {c.rollNo}
                    </td>
                    <td className="px-5 py-3 text-text-secondary">
                      {c.className}
                    </td>
                    <td className="px-5 py-3 font-ledger text-xs text-text-secondary">
                      {c.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/certificates/${c.id}`}
                          aria-label={`View certificate for ${c.studentName}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-disabled transition-colors hover:bg-bg-default hover:text-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </Link>
                        <DeleteButton id={c.id} studentName={c.studentName} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {certificates.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-default text-text-disabled">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-6 w-6"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
                <p className="text-text-secondary">
                  {q
                    ? `No certificates match "${q}".`
                    : "No certificates issued yet."}
                </p>
                {!q && (
                  <Link
                    href="/admin/generate"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Generate your first one
                  </Link>
                )}
              </div>
            )}
          </div>

          {certificates.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-hairline px-5 py-3 text-sm text-text-secondary">
              <span>
                Page {page} of {totalPages} · {total} result
                {total === 1 ? "" : "s"}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={pageHref(Math.max(1, page - 1))}
                  aria-disabled={page <= 1}
                  className={`rounded-lg border border-hairline px-3 py-1.5 text-xs font-medium ${
                    page <= 1
                      ? "pointer-events-none opacity-40"
                      : "hover:bg-bg-default"
                  }`}
                >
                  Prev
                </Link>
                <Link
                  href={pageHref(Math.min(totalPages, page + 1))}
                  aria-disabled={page >= totalPages}
                  className={`rounded-lg border border-hairline px-3 py-1.5 text-xs font-medium ${
                    page >= totalPages
                      ? "pointer-events-none opacity-40"
                      : "hover:bg-bg-default"
                  }`}
                >
                  Next
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
