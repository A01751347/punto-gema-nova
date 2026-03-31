'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1599643478524-fb66f7ca065b?q=80&w=2000&auto=format&fit=crop',
    subtitle: 'Artesanía con Alma',
    title: 'Diseños que cuentan historias',
    cta: 'Ver Colección',
    href: '/tienda',
  },
  {
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?q=80&w=2000&auto=format&fit=crop',
    subtitle: 'Nueva Temporada',
    title: 'Piedras que inspiran luz',
    cta: 'Explorar',
    href: '/colecciones',
  },
  {
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop',
    subtitle: 'Hecho en México',
    title: 'Cada pieza, una obra única',
    cta: 'Descubrir',
    href: '/tienda',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slide = heroSlides[current];
  const parallaxOffset = scrollY * 0.4;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  const goTo = (index: number) => {
    if (index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative h-[100svh] flex flex-col justify-end items-center overflow-hidden">
      {/* Background images — all preloaded, only one visible */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: i === current && !isTransitioning ? 1 : 0,
            transform: `translateY(${parallaxOffset}px) scale(1.05)`,
          }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />

      {/* Content */}
      <div
        className="relative z-20 w-full max-w-5xl px-6 pb-28 md:pb-32 text-center"
        style={{ opacity: opacityFade, transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <span
          className={`inline-block text-xs md:text-sm tracking-[0.35em] uppercase mb-6 text-white/80
            transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          {slide.subtitle}
        </span>

        <h1
          className={`text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.05] mb-8 text-white
            transition-all duration-700 delay-100 ${isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}
        >
          {slide.title}
        </h1>

        <div className={`transition-all duration-700 delay-200 ${isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
          <Link href={slide.href}>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary transition-all bg-transparent h-14 px-12 tracking-[0.15em] text-sm uppercase"
            >
              {slide.cta}
            </Button>
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-[2px] transition-all duration-500 ${
                i === current ? 'w-10 bg-white' : 'w-5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ opacity: opacityFade }}
      >
        <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-white/30 relative overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-float" />
        </div>
      </div>
    </section>
  );
}
