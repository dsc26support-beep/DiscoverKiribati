import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

const variantStyles: Record<Variant, string> = {
  primary: "bg-ocean text-warm-white hover:bg-lagoon",
  secondary: "bg-coral text-warm-white hover:brightness-95",
  outline: "border border-warm-white text-warm-white hover:bg-warm-white/10",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold no-underline transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
