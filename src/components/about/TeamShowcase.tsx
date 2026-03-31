'use client';

import { useState } from 'react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const gallery = [
    { src: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop', alt: 'Taller de joyería', span: 'col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=400&auto=format&fit=crop', alt: 'Selección de piedras', span: '' },
    { src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', alt: 'Detalle artesanal', span: '' },
    { src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop', alt: 'Perlas naturales', span: '' },
    { src: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?q=80&w=600&auto=format&fit=crop', alt: 'Piezas terminadas', span: 'col-span-2' },
];

export default function TeamShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-36 bg-cream-light">
            <div className="container mx-auto px-4 max-w-6xl">
                <AnimateOnScroll animation="fade-up" className="text-center mb-16 md:mb-20">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Detrás de Escena</span>
                    <h2 className="text-3xl md:text-5xl font-serif mb-4">Nuestro Taller</h2>
                    <p className="text-text-secondary max-w-md mx-auto">
                        Donde las piedras cobran vida y las ideas se convierten en piezas únicas.
                    </p>
                </AnimateOnScroll>

                {/* Masonry-style gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
                    {gallery.map((img, i) => (
                        <AnimateOnScroll
                            key={i}
                            animation="scale-in"
                            delay={i * 80}
                            className={`overflow-hidden relative group cursor-pointer ${img.span}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className={`w-full h-full object-cover transition-all duration-700
                                    ${hoveredIndex !== null && hoveredIndex !== i ? 'scale-100 brightness-50' : 'scale-100 brightness-100'}
                                    group-hover:scale-110`}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-white text-xs tracking-wider uppercase">{img.alt}</span>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
