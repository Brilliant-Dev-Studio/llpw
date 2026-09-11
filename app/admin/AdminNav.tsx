import Link from "next/link";

const tabs = [
  { href: "/admin", label: "Certificates", key: "certificates" },
  { href: "/admin/events", label: "Events", key: "events" },
] as const;

export default function AdminNav({
  active,
}: {
  active: "certificates" | "events";
}) {
  return (
    <nav className="mt-3 flex w-fit items-center gap-1 rounded-lg border border-hairline bg-paper/50 p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            active === tab.key
              ? "bg-primary text-primary-contrast"
              : "text-text-secondary hover:bg-bg-default"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
