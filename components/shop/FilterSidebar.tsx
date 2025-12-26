'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FilterSidebarProps {
    categories: { id: string; name: string }[];
    concerns: { id: string; name: string }[]; // Assuming we treat key ingredients or tags as concerns/filters later
}

export default function FilterSidebar({ categories, concerns }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const currentCategory = searchParams.get('category');

    const handleFilterChange = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/tienda?${params.toString()}`);
    };

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="md:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center text-sm font-medium"
                >
                    <span>Filtros</span>
                    <span>{isOpen ? '−' : '+'}</span>
                </button>
            </div>

            <div className={`space-y-8 ${isOpen ? 'block' : 'hidden md:block'}`}>
                {/* Categories */}
                <div>
                    <h3 className="font-serif text-lg mb-4 text-text-primary">Categorías</h3>
                    <ul className="space-y-3">
                        <li>
                            <button
                                onClick={() => handleFilterChange('category', null)}
                                className={`text-sm hover:text-primary transition-colors ${!currentCategory ? 'text-primary font-medium' : 'text-text-secondary'
                                    }`}
                            >
                                Ver todo
                            </button>
                        </li>
                        {[
                            'Acné',
                            'Anti-Edad',
                            'Barrera Cutánea',
                            'Hidratación',
                            'Manchas'
                        ].map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => handleFilterChange('category', cat)}
                                    className={`text-sm hover:text-primary transition-colors text-left ${currentCategory === cat ? 'text-primary font-medium' : 'text-text-secondary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Placeholder for Concerns filters if needed */}
            </div>
        </div>
    );
}
