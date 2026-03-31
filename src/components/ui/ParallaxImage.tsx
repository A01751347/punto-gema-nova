'use client';

import { useRef, useEffect, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  overlayClassName?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = '',
  overlayClassName = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      setOffset(scrollProgress * speed * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="w-full h-[120%] -mt-[10%] will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </div>
  );
}
