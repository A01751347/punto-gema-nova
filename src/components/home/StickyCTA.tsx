'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile sticky bottom CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 md:hidden transition-transform duration-500 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="glass border-t border-white/20 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Envio gratis +$1,300 MXN</p>
          </div>
          <Link
            href="/tienda"
            className="bg-primary text-white text-xs tracking-wider uppercase px-5 py-2.5 flex-shrink-0 hover:bg-primary-light transition-colors"
          >
            Comprar
          </Link>
        </div>
      </div>

      {/* Desktop sticky side button */}
      <div
        className={`fixed right-6 bottom-8 z-30 hidden md:block transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Link
          href="/tienda"
          className="group flex items-center gap-2 bg-primary text-white pl-5 pr-4 py-3 shadow-soft-lg hover:bg-accent transition-all duration-300"
        >
          <span className="text-xs tracking-[0.15em] uppercase">Ver Tienda</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </>
  );
}
