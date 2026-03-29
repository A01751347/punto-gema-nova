import Link from 'next/link';

export const metadata = {
    title: 'Colecciones | Punto Gema Nova',
    description: 'Explora nuestras colecciones de joyería artesanal: permanente, piezas casi únicas, personalizados y temporada.',
};

const collections = [
    {
        title: 'Colección Permanente',
        description: 'Las piezas base de nuestra marca. Siempre disponibles, siempre elegantes. Diseñadas para acompañarte todos los días.',
        href: '/tienda?collection=permanente',
        color: 'bg-cream-light',
        accent: 'text-primary',
    },
    {
        title: 'Piezas Casi Únicas',
        description: 'Ediciones muy limitadas. Cuando se acaban, no vuelven. Piezas con combinaciones especiales de piedras y materiales.',
        href: '/tienda?collection=casi-unica',
        color: 'bg-[#1a1a1a]',
        accent: 'text-[#d4af37]',
        dark: true,
    },
    {
        title: 'Personalizados',
        description: 'Tu pieza, tu historia. Elige piedras, iniciales y tamaño para crear algo que sea solo tuyo.',
        href: '/personalizados',
        color: 'bg-cream',
        accent: 'text-primary',
    },
    {
        title: 'Temporada',
        description: 'Colecciones especiales para fechas que importan. San Valentín, Día de las Madres, Navidad y más.',
        href: '/tienda?collection=temporada',
        color: 'bg-cream-light',
        accent: 'text-accent',
    },
];

export default function ColeccionesPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-20 md:py-28 bg-cream-light text-center">
                <div className="container mx-auto px-4">
                    <span className="text-sm font-bold tracking-widest text-primary/60 uppercase block mb-4">
                        Punto Gema Nova
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
                        Nuestras Colecciones
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
                        Cada colección tiene su propia personalidad. Encuentra la que va contigo.
                    </p>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {collections.map((col) => (
                            <Link
                                key={col.title}
                                href={col.href}
                                className={`group block ${col.color} rounded-2xl p-10 md:p-14 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${col.dark ? 'text-white' : ''}`}
                            >
                                <h2 className={`text-2xl md:text-3xl font-serif mb-4 ${col.accent} group-hover:opacity-80 transition-opacity`}>
                                    {col.title}
                                </h2>
                                <p className={`font-light leading-relaxed mb-8 ${col.dark ? 'text-white/80' : 'text-text-secondary'}`}>
                                    {col.description}
                                </p>
                                <span className={`inline-flex items-center gap-2 text-sm font-medium ${col.accent} group-hover:gap-3 transition-all`}>
                                    Explorar
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
