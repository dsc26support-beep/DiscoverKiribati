/**
 * Used wherever a business, destination, experience, or article has no real
 * photograph yet. Renders a gentle gradient placeholder with a label rather
 * than letting a missing image break the layout — see README.md
 * "Photography and imagery" (missing images must not create broken
 * layouts).
 */
export default function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={`flex items-center justify-center bg-gradient-to-br from-ocean to-lagoon text-center text-warm-white/70 ${className}`}
    >
      <span className="label-caps px-4">{label}</span>
    </div>
  );
}
