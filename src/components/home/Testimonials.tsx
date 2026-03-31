'use client';

import { useState, useEffect } from 'react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const testimonials = [
  {
    name: 'Mariana G.',
    text: 'Las pulseras son hermosas, la calidad se nota al instante. Mi favorita es la de cuarzo rosa.',
    product: 'Pulsera Cuarzo Rosa',
    stars: 5,
  },
  {
    name: 'Daniela R.',
    text: 'Compré el set para mi mamá y quedó encantada. El empaque es precioso, perfecto para regalo.',
    product: 'Set Madre e Hija',
    stars: 5,
  },
  {
    name: 'Sofía M.',
    text: 'La atención al detalle es increíble. Se nota que cada pieza está hecha con cariño y dedicación.',
    product: 'Collar Perlas Naturales',
    stars: 5,
  },
  {
    name: 'Ana L.',
    text: 'Ya llevo tres compras y siempre quedo fascinada. La joyería más bonita que he encontrado en México.',
    product: 'Aretes Piedra Luna',
    stars: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up" className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">Testimonios</span>
          <h2 className="text-3xl md:text-4xl font-serif">Lo Que Dicen Nuestras Clientas</h2>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto text-center relative min-h-[200px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ${
                i === current
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-primary mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div>
                <p className="text-sm font-medium text-primary">{t.name}</p>
                <p className="text-xs text-text-secondary mt-1">{t.product}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-accent w-6' : 'bg-primary/20 hover:bg-primary/40'
              }`}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
