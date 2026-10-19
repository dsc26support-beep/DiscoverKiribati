import { siteConfig } from "@/lib/config";
import SafeExternalLink from "@/components/SafeExternalLink";

export default function MwaketePromo({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`rounded-2xl bg-gradient-to-br from-lagoon to-ocean text-warm-white ${
        compact ? "p-6" : "p-8 sm:p-12"
      }`}
    >
      <p className="label-caps text-warm-white/70">Associated marketplace</p>
      <h2 className="mt-2 font-display text-2xl sm:text-3xl">
        Discover local products and sellers through Mwakete
      </h2>
      <p className="mt-3 max-w-2xl text-warm-white/85">
        Mwakete is an online marketplace associated with {siteConfig.operatedBy},
        where I-Kiribati sellers list products for visitors and the diaspora
        to explore. Discover Kiribati links to Mwakete as a related
        marketplace — it does not process orders, payments, or shipping
        itself, and listing on Mwakete is never required to appear in this
        tourism directory.
      </p>
      <SafeExternalLink
        href={siteConfig.mwaketeUrl}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-warm-white px-6 py-3 text-sm font-semibold text-ocean no-underline hover:bg-sand"
      >
        Visit Mwakete.com
      </SafeExternalLink>
    </section>
  );
}
