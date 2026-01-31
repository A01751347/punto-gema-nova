import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${className}`}>
            <Link
                href="/"
                className="text-gray-400 hover:text-primary transition-colors flex items-center"
                aria-label="Inicio"
            >
                <Home size={16} />
            </Link>

            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    <ChevronRight size={16} className="text-gray-300 mx-2" />
                    {index === items.length - 1 ? (
                        <span className="text-primary font-medium" aria-current="page">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-gray-500 hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
