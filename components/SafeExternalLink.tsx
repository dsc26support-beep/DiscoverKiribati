import { safeExternalUrl } from "@/lib/url";

interface SafeExternalLinkProps {
  href: string | null | undefined;
  children: React.ReactNode;
  className?: string;
  sponsored?: boolean;
}

/**
 * Renders an external link only if the href is a validated http(s) URL.
 * Always opens safely (noopener/noreferrer) and tags "sponsored" when the
 * destination is an affiliate or paid placement, per the affiliate-link
 * handling rules in README.md.
 */
export default function SafeExternalLink({
  href,
  children,
  className,
  sponsored = false,
}: SafeExternalLinkProps) {
  const safe = safeExternalUrl(href);
  if (!safe) return null;

  const rel = sponsored ? "noopener noreferrer sponsored" : "noopener noreferrer";

  return (
    <a href={safe} target="_blank" rel={rel} className={className}>
      {children}
    </a>
  );
}
