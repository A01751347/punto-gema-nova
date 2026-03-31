'use client';

import { useEffect, useState } from 'react';

export default function AboutHero() {
    const [scrollY, setScrollY] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallax = scrollY * 0.35;
    const textOpacity = Math.max(0, 1 - scrollY / 500);

    return (
        <section className="relative h-[70svh] md:h-[80svh] flex items-end overflow-hidden bg-cream">
            {/* Background image with parallax */}
            <div
                className="absolute inset-0 scale-110"
                style={{ transform: `translateY(${parallax}px) scale(1.1)` }}
            >
                <img
                    src="https://images.unsplash.com/photo-1599459183200-59c3fd67e37b?q=80&w=1800&auto=format&fit=crop"
                    alt="Joyería artesanal"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div
                className="relative z-10 container mx-auto px-4 pb-16 md:pb-24 max-w-5xl"
                style={{ opacity: textOpacity, transform: `translateY(${scrollY * 0.1}px)` }}
            >
                <span
                    className={`text-xs tracking-[0.35em] uppercase text-accent block mb-5
                        transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    Nuestra Esencia
                </span>
                <h1
                    className={`text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.08] mb-6 text-white
                        transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    No solo creamos joyas,<br />
                    creamos <em className="text-accent italic">momentos.</em>
                </h1>
                <p
                    className={`text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed
                        transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    Punto Gema Nova nace de la pasión por las piedras naturales
                    y la tradición artesanal mexicana que transforma minerales en piezas llenas de significado.
                </p>

                {/* Scroll indicator */}
                <div className={`mt-10 flex items-center gap-3 transition-all duration-700 delay-1000
                    ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-8 h-[1px] bg-white/40" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Descubre más</span>
                </div>
            </div>
        </section>
    );
}
