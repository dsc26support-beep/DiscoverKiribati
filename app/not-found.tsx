import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide flex flex-col items-center justify-center py-24 text-center">
      <p className="label-caps text-coral">404</p>
      <h1 className="mt-3 font-display text-3xl text-ocean sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-charcoal/80">
        The page you&apos;re looking for may have moved or no longer exists.
        Try exploring the directory instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-warm-white no-underline hover:bg-lagoon"
        >
          Back to home
        </Link>
        <Link
          href="/explore"
          className="rounded-full border border-ocean px-6 py-3 text-sm font-semibold text-ocean no-underline hover:bg-sand"
        >
          Explore the directory
        </Link>
      </div>
    </div>
  );
}
