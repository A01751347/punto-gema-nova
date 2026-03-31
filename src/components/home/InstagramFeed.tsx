'use client';

import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const images = [
  { src: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=400&auto=format&fit=crop', alt: 'Joyería artesanal' },
  { src: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=400&auto=format&fit=crop', alt: 'Collar de perlas' },
  { src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', alt: 'Aretes de piedra' },
  { src: 'https://images.unsplash.com/photo-1599459183200-59c3fd67e37b?q=80&w=400&auto=format&fit=crop', alt: 'Pulseras artesanales' },
  { src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop', alt: 'Collar de oro' },
  { src: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?q=80&w=400&auto=format&fit=crop', alt: 'Joyería elegante' },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <AnimateOnScroll animation="fade-up" className="text-center mb-12 px-4">
        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">@puntogema.nova</span>
        <h2 className="text-3xl md:text-4xl font-serif mb-3">Sigue Nuestro Estilo</h2>
        <p className="text-text-secondary text-sm max-w-md mx-auto">
          Inspírate con nuestras combinaciones y comparte tu estilo con nosotros
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
        {images.map((img, i) => (
          <AnimateOnScroll
            key={i}
            animation="scale-in"
            delay={i * 80}
            className="aspect-square overflow-hidden group cursor-pointer relative"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
