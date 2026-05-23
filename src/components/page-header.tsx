type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-wider text-quest-coral">{eyebrow}</p>
      )}
      <h1 className="quest-section-title mt-2">{title}</h1>
      <p className="quest-page-intro">{description}</p>
    </header>
  );
}
