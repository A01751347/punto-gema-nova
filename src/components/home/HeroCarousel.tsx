'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Banner {
    id: string;
    title: string;
    subtitle: string | null;
    imageUrl: string | null;
    ctaText: string | null;
    ctaLink: string | null;
}

interface HeroCarouselProps {
    banners: Banner[];
}

export default function HeroCarousel({ banners }: HeroCarouselProps) {
    // If no banners, return null or fallback (handled by parent?)
    // Actually parent handles fallback if empty array, but we can double check
    if (!banners || banners.length === 0) return null;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    // Auto-advance
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const banner = banners[currentIndex];

    return (
        <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-cream-light group">
            {/* Background Image */}
            {banner.imageUrl ? (
                <>
                    <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
                        {/* We can use key to force re-render animation if needed, or just let src change */}
                        <img
                            key={banner.imageUrl}
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-full h-full object-cover opacity-90 animate-fade-in"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center text-center gap-y-8 md:gap-y-10">
                        <span className="inline-flex items-center justify-center py-1 px-3 border border-primary/30 rounded-full text-primary text-sm tracking-widest uppercase animate-fade-in bg-white/80 backdrop-blur-sm">
                            Ciencia + Naturaleza
                        </span>

                        <h1 key={banner.id} className="text-5xl md:text-7xl font-serif font-medium leading-[1.08] md:leading-[1.05] animate-slide-up text-gray-900 drop-shadow-sm">
                            <span dangerouslySetInnerHTML={{ __html: banner.title.replace(/\n/g, '<br />') }} />
                        </h1>

                        <p key={`${banner.id}-sub`} className="text-lg md:text-xl text-text-secondary max-w-2xl font-light leading-relaxed animate-slide-up bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                            {banner.subtitle || "Formulaciones de alto rendimiento que respetan la biología de tu piel."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up">
                            <Link href={banner.ctaLink || "/tienda"}>
                                <Button size="lg" className="min-w-[200px] h-14 text-lg shadow-lg">
                                    {banner.ctaText || "Ver Colección"}
                                </Button>
                            </Link>
                            {/* Optional secondary button, maybe only valid for default hero? Let's keep it robust */}
                            <Link href="/ciencia">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="min-w-[200px] h-14 text-lg border border-primary/20 hover:bg-white hover:border-transparent bg-white/50 backdrop-blur-md"
                                >
                                    Nuestra Ciencia
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows (Only if > 1 banner) */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-primary transition-all shadow-md opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-primary transition-all shadow-md opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {banners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-6' : 'bg-primary/30 hover:bg-primary/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
