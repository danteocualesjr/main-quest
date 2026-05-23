type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-quest-indigo">
          {eyebrow}
        </p>
      )}
      <h1 className="quest-section-title mt-1">{title}</h1>
      <p className="quest-page-intro">{description}</p>
    </header>
  );
}
