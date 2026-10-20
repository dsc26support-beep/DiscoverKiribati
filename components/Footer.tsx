import Link from "next/link";
import { siteConfig } from "@/lib/config";

const columns = [
  {
    heading: "Discover",
    links: [
      { href: "/explore", label: "Explore" },
      { href: "/destinations", label: "Destinations" },
      { href: "/experiences", label: "Experiences" },
      { href: "/travel-guide", label: "Travel Guide" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    heading: "Business",
    links: [
      { href: "/submit-business", label: "List your business" },
      { href: "/mwakete", label: "Mwakete marketplace" },
      { href: "/about", label: "About Discover Kiribati" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
      { href: "/listing-policy", label: "Listing Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-grey/15 bg-ocean text-warm-white">
      <div className="container-wide grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-lg font-semibold">{siteConfig.shortName}</p>
          <p className="mt-3 max-w-xs text-sm text-warm-white/75">
            {siteConfig.tagline}. An independent website operated by{" "}
            {siteConfig.operatedBy} — not an official government tourism
            portal.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="label-caps text-warm-white/60">{col.heading}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-white/90 no-underline hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-warm-white/10">
        <div className="container-wide flex flex-col gap-2 py-6 text-xs text-warm-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.operatedBy}. Discover
            Kiribati is an independent tourism website and is not an
            official government tourism portal.
          </p>
          <p>{siteConfig.contact.location}</p>
        </div>
      </div>
    </footer>
  );
}
