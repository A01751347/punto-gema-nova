'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Search, Loader2 } from 'lucide-react';
import { searchProducts } from '@/app/actions/product-search';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opening
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Search logic with debounce
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                const data = await searchProducts(query);
                setResults(data);
                setIsLoading(false);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Search Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-gray-50 border-none rounded-lg py-3 px-10 text-lg text-text-primary focus:ring-1 focus:ring-primary/20 placeholder:text-gray-400 font-light"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-primary transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Results Area */}
                <div className="flex-1 overflow-y-auto p-5">
                    {(isLoading || results.length > 0 || query.length > 2) && (
                        <div>
                            {isLoading ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-4">
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/tienda/${product.slug}`}
                                            onClick={onClose}
                                            className="flex items-center gap-5 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
                                        >
                                            <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                                {product.images?.[0] ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                        <Search size={20} className="text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-base font-medium text-[#2c4a52] group-hover:text-[#d4af37] transition-colors line-clamp-1">
                                                    {product.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500 font-light text-base">
                                    No hay resultados para &quot;{query}&quot;
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
