'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function ShopTheLook({ products }: { products: any[] }) {
    if (!products || products.length === 0) return null;

    const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

    const hotspots = [
        { top: '28%', left: '35%', productIndex: 0 },
        { top: '55%', left: '60%', productIndex: 1 },
    ];

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4">
                <AnimateOnScroll animation="fade-up" className="flex justify-between items-end mb-14">
                    <div>
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">Estilo Editorial</span>
                        <h2 className="text-3xl md:text-4xl font-serif">Combínalo Así</h2>
                    </div>
                    <Link href="/tienda" className="hidden md:block text-xs tracking-wider uppercase text-text-secondary hover:text-primary transition-colors border-b border-text-secondary/30 pb-1">
                        Ver más looks
                    </Link>
                </AnimateOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-0 min-h-[600px]">
                    {/* Imagen Inspiracional */}
                    <AnimateOnScroll animation="fade-right" className="relative w-full h-[60vh] md:h-[700px] group overflow-hidden img-zoom">
                        <img
                            src="https://images.unsplash.com/photo-1599459183200-59c3fd67e37b?q=80&w=1000&auto=format&fit=crop"
                            alt="Look editorial joyería"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Hotspots interactivos */}
                        {hotspots.map((spot, i) => (
                            <button
                                key={i}
                                className="absolute z-10 group/spot"
                                style={{ top: spot.top, left: spot.left }}
                                onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                                onMouseEnter={() => setActiveHotspot(i)}
                                onMouseLeave={() => setActiveHotspot(null)}
                            >
                                {/* Pulse ring */}
                                <span className="absolute inset-0 w-8 h-8 -m-2 rounded-full bg-white/30 animate-pulse-ring" />
                                {/* Dot */}
                                <span className="relative block w-4 h-4 rounded-full bg-white shadow-lg border-2 border-accent cursor-pointer" />

                                {/* Tooltip */}
                                {activeHotspot === i && products[spot.productIndex] && (
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white shadow-soft-lg p-3 min-w-[180px] text-left animate-fade-in z-20">
                                        <p className="text-xs font-medium text-primary truncate">{products[spot.productIndex].name}</p>
                                        <p className="text-xs text-accent mt-0.5">
                                            ${products[spot.productIndex].price.toLocaleString('es-MX')} MXN
                                        </p>
                                    </div>
                                )}
                            </button>
                        ))}

                        {/* Label badge */}
                        <div className="absolute top-6 left-6 glass px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-primary">
                            Shop the Look
                        </div>
                    </AnimateOnScroll>

                    {/* Productos del Look */}
                    <AnimateOnScroll animation="fade-left" className="flex flex-col justify-center bg-cream/50 p-8 lg:p-16">
                        <div className="mb-10">
                            <h3 className="text-2xl md:text-3xl font-serif mb-4">Set Classic Elegance</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Un ensamble perfecto que combina nuestras piezas más pedidas.
                                Ideal para regalar o para un look sofisticado de todos los días.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {products.slice(0, 2).map((product, i) => (
                                <div
                                    key={product.id}
                                    className={`flex gap-4 items-center bg-white p-4 transition-all duration-300 cursor-pointer
                                        ${activeHotspot === i ? 'shadow-soft-lg ring-1 ring-accent/20 scale-[1.02]' : 'shadow-sm hover:shadow-md'}`}
                                    onMouseEnter={() => setActiveHotspot(i)}
                                    onMouseLeave={() => setActiveHotspot(null)}
                                >
                                    <div className="w-20 h-20 bg-cream flex-shrink-0 relative overflow-hidden">
                                        {product.images && product.images[0] ? (
                                            <img src={product.images[0].url || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-cream-dark flex items-center justify-center">
                                                <span className="text-[10px] text-text-light uppercase tracking-wider">Foto</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h4 className="text-sm font-medium mb-1 truncate">{product.name}</h4>
                                        <p className="text-xs text-text-secondary mb-2">${product.price.toLocaleString('es-MX')} MXN</p>
                                        <Link href={`/tienda/producto/${product.id}`} className="text-xs uppercase tracking-wider text-accent hover:text-primary transition-colors border-b border-accent/30 pb-0.5 inline-block">
                                            Ver Detalles
                                        </Link>
                                    </div>
                                    <Button size="sm" variant="outline" className="px-3 h-9 text-xs shrink-0 self-center">
                                        + Añadir
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-medium">Precio por el set:</span>
                                <span className="text-xl font-serif text-gradient">
                                    ${products.slice(0,2).reduce((acc: number, p: any) => acc + p.price, 0).toLocaleString('es-MX')} MXN
                                </span>
                            </div>
                            <Button className="w-full h-12 uppercase tracking-wide text-sm group">
                                <span className="group-hover:tracking-wider transition-all">Añadir Set Completo al Carrito</span>
                            </Button>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
