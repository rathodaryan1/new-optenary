import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', path: '/' }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path ? `https://optenary.in${item.path}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-dark-muted ${className}`}>
        <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight size={12} className="text-dark-muted/60 shrink-0" />}
                {isLast || !item.path ? (
                  <span className="font-semibold text-white/90 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                    {idx === 0 && <Home size={13} className="inline mr-1 -mt-0.5" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-brand-orange transition-colors flex items-center gap-1"
                  >
                    {idx === 0 && <Home size={13} />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
