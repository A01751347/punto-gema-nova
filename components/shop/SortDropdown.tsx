'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || 'newest';

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`/tienda?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-text-secondary whitespace-nowrap">Ordernar por:</label>
            <select
                id="sort"
                value={currentSort}
                onChange={handleSortChange}
                className="bg-transparent border-b border-primary/20 py-1 pr-8 text-sm focus:outline-none focus:border-primary cursor-pointer"
            >
                <option value="newest">Lo más nuevo</option>
                <option value="price_asc">Precio: Menor a Mayor</option>
                <option value="price_desc">Precio: Mayor a Menor</option>
                <option value="featured">Destacados</option>
            </select>
        </div>
    );
}
