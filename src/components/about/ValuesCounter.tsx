'use client';

import { useRef, useEffect, useState } from 'react';

function useCountUp(end: number, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!startOnView) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [startOnView, started]);

    useEffect(() => {
        if (!started) return;
        let frame: number;
        const start = performance.now();

        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.round(eased * end));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, end, duration]);

    return { count, ref };
}

const stats = [
    { value: 500, suffix: '+', label: 'Piezas creadas', description: 'Cada una hecha a mano' },
    { value: 100, suffix: '%', label: 'Artesanal', description: 'Sin producción en serie' },
    { value: 15, suffix: '+', label: 'Tipos de gemas', description: 'Piedras semipreciosas naturales' },
    { value: 1200, suffix: '+', label: 'Clientas felices', description: 'Y contando' },
];

export default function ValuesCounter() {
    return (
        <section className="py-16 md:py-20 bg-white border-b border-cream-dark">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat) => (
                        <CounterItem key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CounterItem({ value, suffix, label, description }: {
    value: number;
    suffix: string;
    label: string;
    description: string;
}) {
    const { count, ref } = useCountUp(value, 2200);

    return (
        <div ref={ref} className="text-center group">
            <div className="text-3xl md:text-5xl font-serif text-primary mb-2 tabular-nums">
                {count.toLocaleString()}<span className="text-accent">{suffix}</span>
            </div>
            <p className="text-sm font-medium tracking-wide mb-1">{label}</p>
            <p className="text-xs text-text-secondary">{description}</p>
        </div>
    );
}
