'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FilterSidebarProps {
    categories: { id: string; name: string }[];
}

export default function FilterSidebar({ categories }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const currentCategory = searchParams.get('category');
    const currentCollection = searchParams.get('collection');

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
        <div className="w-full md:w-52 flex-shrink-0">
            {/* Mobile toggle */}
            <div className="md:hidden mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full py-3 px-4 border border-gray-200 flex justify-between items-center text-sm"
                >
                    <span>Filtros</span>
                    <span className="text-text-light">{isOpen ? '−' : '+'}</span>
                </button>
            </div>

            <div className={`space-y-8 ${isOpen ? 'block' : 'hidden md:block'}`}>
                {/* Categories */}
                <div>
                    <h3 className="text-xs tracking-[0.15em] uppercase text-text-light mb-4">Categoria</h3>
                    <ul className="space-y-2.5">
                        <li>
                            <button
                                onClick={() => handleFilterChange('category', null)}
                                className={`text-sm transition-colors ${!currentCategory ? 'text-primary font-medium' : 'text-text-secondary hover:text-primary'}`}
                            >
                                Ver todo
                            </button>
                        </li>
                        {[
                            'Pulseras',
                            'Collares',
                            'Sets',
                            'Personalizados',
                            'Temporada'
                        ].map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => handleFilterChange('category', cat)}
                                    className={`text-sm transition-colors text-left ${currentCategory === cat ? 'text-primary font-medium' : 'text-text-secondary hover:text-primary'}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Collection */}
                <div>
                    <h3 className="text-xs tracking-[0.15em] uppercase text-text-light mb-4">Coleccion</h3>
                    <ul className="space-y-2.5">
                        {[
                            { label: 'Permanente', value: 'permanente' },
                            { label: 'Casi Unicas', value: 'casi-unica' },
                            { label: 'Bajo Pedido', value: 'personalizado' },
                            { label: 'Temporada', value: 'temporada' },
                        ].map((col) => (
                            <li key={col.value}>
                                <button
                                    onClick={() => handleFilterChange('collection', currentCollection === col.value ? null : col.value)}
                                    className={`text-sm transition-colors text-left ${currentCollection === col.value ? 'text-primary font-medium' : 'text-text-secondary hover:text-primary'}`}
                                >
                                    {col.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
