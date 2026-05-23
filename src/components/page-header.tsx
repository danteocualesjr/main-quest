import { SectionLabel } from "@/components/section-label";

type PageHeaderProps = {
  number?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
};

export function PageHeader({ number, eyebrow, title, accent, description }: PageHeaderProps) {
  return (
    <header className="border-b border-ink/10 pb-12 pt-8 md:pb-16 md:pt-12">
      <SectionLabel number={number} variant="accent">
        {eyebrow}
      </SectionLabel>
      <h1 className="mt-6 max-w-3xl font-display text-display-2 font-light tracking-tight text-ink">
        {title}
        {accent && (
          <>
            {" "}
            <em className="italic text-tomato">{accent}</em>
          </>
        )}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">{description}</p>
    </header>
  );
}
