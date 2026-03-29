import Link from 'next/link';

export const metadata = {
    title: 'Colecciones | Punto Gema Nova',
    description: 'Explora nuestras colecciones de joyeria artesanal.',
};

const collections = [
    {
        title: 'Permanente',
        subtitle: 'Siempre disponible',
        description: 'Las piezas base de nuestra marca. Disenadas para acompanarte todos los dias con elegancia atemporal.',
        href: '/tienda?collection=permanente',
    },
    {
        title: 'Piezas Casi Unicas',
        subtitle: 'Edicion limitada',
        description: 'Cuando se acaban, no vuelven. Combinaciones especiales de piedras y materiales en ediciones muy reducidas.',
        href: '/tienda?collection=casi-unica',
    },
    {
        title: 'Personalizados',
        subtitle: 'Hecho para ti',
        description: 'Tu pieza, tu historia. Elige piedras, iniciales y tamano para crear algo que sea solo tuyo.',
        href: '/personalizados',
    },
    {
        title: 'Temporada',
        subtitle: 'Colecciones especiales',
        description: 'Para fechas que importan. San Valentin, Dia de las Madres, Navidad y mas.',
        href: '/tienda?collection=temporada',
    },
];

export default function ColeccionesPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                        Punto Gema Nova
                    </span>
                    <h1 className="text-4xl md:text-6xl mb-6">
                        Nuestras Colecciones
                    </h1>
                    <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                        Cada coleccion tiene su propia personalidad. Encuentra la que va contigo.
                    </p>
                </div>
            </section>

            {/* Collections */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="space-y-0">
                        {collections.map((col, i) => (
                            <Link
                                key={col.title}
                                href={col.href}
                                className={`group block grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 ${i < collections.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-cream/50 transition-colors -mx-6 px-6`}
                            >
                                <div className="md:col-span-1">
                                    <span className="text-sm text-accent">0{i + 1}</span>
                                </div>
                                <div className="md:col-span-4">
                                    <h2 className="text-2xl md:text-3xl group-hover:text-accent transition-colors">{col.title}</h2>
                                    <span className="text-xs tracking-[0.2em] uppercase text-text-light mt-1 block">{col.subtitle}</span>
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-text-secondary leading-relaxed">{col.description}</p>
                                </div>
                                <div className="md:col-span-2 flex items-center md:justify-end">
                                    <span className="text-sm text-text-secondary group-hover:text-accent transition-colors flex items-center gap-2">
                                        Explorar
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
