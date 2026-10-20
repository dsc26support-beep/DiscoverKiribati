export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-grey/40 bg-sand/40 px-6 py-14 text-center">
      <p className="font-display text-xl text-ocean">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-grey">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
