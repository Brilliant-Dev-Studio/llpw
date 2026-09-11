import Link from "next/link";
import NewEventForm from "./NewEventForm";

export default function NewEventPage() {
  return (
    <main className="guilloche-bg min-h-screen">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 pb-24">
        <div>
          <Link
            href="/admin/events"
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
            Back to events
          </Link>
          <h1 className="mt-4 font-display text-2xl italic text-text-primary">
            New Event
          </h1>
          <p className="text-sm text-text-secondary">
            Add a title, date, and up to 20 gallery photos. Photos are
            compressed and uploaded to S3 automatically.
          </p>
        </div>
        <NewEventForm />
      </div>
    </main>
  );
}
