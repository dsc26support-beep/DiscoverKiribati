type Kind = "demo" | "sample" | "sponsored" | "mwakete" | "unverified" | "pending" | "supplied";

const styles: Record<Kind, string> = {
  demo: "bg-grey/15 text-charcoal",
  sample: "bg-grey/15 text-charcoal",
  sponsored: "bg-coral/15 text-coral",
  mwakete: "bg-lagoon/15 text-lagoon",
  unverified: "bg-grey/15 text-grey",
  pending: "bg-grey/15 text-grey",
  supplied: "bg-lagoon/10 text-lagoon",
};

const text: Record<Kind, string> = {
  demo: "Demonstration listing",
  sample: "Sample content",
  sponsored: "Sponsored placement",
  mwakete: "Also on Mwakete",
  unverified: "Unverified",
  pending: "Details pending confirmation",
  supplied: "Information supplied by business",
};

export default function DisclosureLabel({ kind }: { kind: Kind }) {
  return (
    <span
      className={`label-caps inline-block rounded-full px-2.5 py-1 ${styles[kind]}`}
    >
      {text[kind]}
    </span>
  );
}
