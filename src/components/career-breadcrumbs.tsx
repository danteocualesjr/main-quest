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
          <Link href="/explore" className="underline-link rounded-sm transition hover:text-tomato focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/30 focus-visible:ring-offset-2">
            Explore
          </Link>
        </li>
        <li aria-hidden className="text-ash">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link
            href={`/explore?cat=${encodeURIComponent(category)}`}
            className="underline-link rounded-sm transition hover:text-tomato focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/30 focus-visible:ring-offset-2"
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
