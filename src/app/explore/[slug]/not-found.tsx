import Link from "next/link";

export default function CareerNotFound() {
  return (
    <div className="quest-panel mx-auto max-w-md text-center">
      <h1 className="font-display text-2xl font-bold text-quest-ink">Quest not found</h1>
      <p className="mt-2 text-quest-muted">
        That career path doesn&apos;t exist in our map yet. Try exploring the full catalog.
      </p>
      <Link
        href="/explore"
        className="mt-4 inline-block font-semibold text-quest-indigo hover:underline"
      >
        Browse all careers →
      </Link>
    </div>
  );
}
