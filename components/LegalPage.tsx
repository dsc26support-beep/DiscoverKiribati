import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/config";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: title }]} />
      <div className="container-prose py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-grey">Last reviewed {siteConfig.legal.lastReviewed}</p>
        <div className="prose-content mt-8 space-y-6 text-charcoal/85">{children}</div>
      </div>
    </>
  );
}
