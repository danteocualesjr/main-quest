import Link from "next/link";
import { ChevronRight } from "lucide-react";

type CareerBreadcrumbsProps = {
  category: string;
  title: string;
};

export function CareerBreadcrumbs({ category, title }: CareerBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mt-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-smoke">
        <li>
          <Link href="/explore" className="transition hover:text-tomato">
            Explore
          </Link>
        </li>
        <li aria-hidden className="text-ash">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link
            href={`/explore?cat=${encodeURIComponent(category)}`}
            className="transition hover:text-tomato"
          >
            {category}
          </Link>
        </li>
        <li aria-hidden className="text-ash">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <span className="font-medium text-ink" aria-current="page">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
