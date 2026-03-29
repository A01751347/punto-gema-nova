import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Nuestra Historia | Punto Gema Nova',
    description: 'Joyería artesanal mexicana con piedras semipreciosas, perlas y baño de oro de 18k. Conoce la historia detrás de Punto Gema Nova.',
};

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen pt-0 pb-20">

            {/* Hero Section */}
            <section className="relative px-4 py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/banner-tuna.png"
                        alt="Joyería artesanal Punto Gema Nova"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-[#000000]/90" />

                <div className="container mx-auto max-w-5xl relative z-10 text-center text-white">
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Nuestra Esencia
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8 text-[#d4af37]">
                        No solo creamos joyas,<br />
                        <span className="italic text-white">creamos momentos.</span>
                    </h1>
                    <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                        Punto Gema Nova nace de la pasión por las piedras naturales
                        y la tradición artesanal mexicana que transforma minerales en piezas llenas de significado.
                    </p>
                </div>
            </section>

            {/* The Origin Story */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div>
                            <h2 className="text-3xl font-serif text-[#1a1a1a] mb-6">La Magia de las Piedras</h2>
                            <div className="h-1 w-16 bg-[#d4af37] mb-8" />
                            <div className="text-text-secondary space-y-6 font-light leading-relaxed">
                                <p>
                                    Todo comenzó con la fascinación por las gemas que la tierra mexicana nos regala. Cuarzos, ágatas, jades y amatistas que llevan millones de años formándose bajo la superficie, esperando ser descubiertos.
                                </p>
                                <p>
                                    Nos enamoramos de la idea de combinar esas piedras con perlas cultivadas y baño de oro de 18k para crear piezas que fueran más que accesorios:
                                    <span className="italic text-[#1a1a1a] font-medium"> "Queríamos que cada collar, pulsera o set contara una historia y conectara con quien lo lleva."</span>
                                </p>
                            </div>
                        </div>


                        <div className="aspect-[3/4] bg-cream-light rounded-t-full rounded-b-3xl relative overflow-hidden group shadow-xl">
                            <Image
                                src="/images/tuna.png"
                                alt="Piedras semipreciosas y joyería artesanal"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-0 right-0 text-center">
                                <span className="text-white/90 text-sm font-medium tracking-widest uppercase">Hecho a Mano en México</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-4 bg-cream-light">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-4">Filosofía Punto Gema Nova</h2>
                        <p className="text-text-secondary max-w-lg mx-auto font-light">
                            Tres pilares innegociables que guían cada pieza que creamos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[#d4af37] text-5xl font-serif block mb-6">01</span>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Calidad Artesanal</h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                Cada pieza es ensamblada a mano con piedras semipreciosas seleccionadas, perlas cultivadas y herrajes con baño de oro de 18k. No hay producción en serie: cada joya es única.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[#d4af37] text-5xl font-serif block mb-6">02</span>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Diseño con Intención</h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                Cada combinación de gemas, colores y texturas está pensada para transmitir algo especial. Diseñamos piezas que complementan tu estilo y te acompañan en momentos importantes.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[#d4af37] text-5xl font-serif block mb-6">03</span>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Honestidad</h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                Somos transparentes con nuestros materiales y procesos. Cada piedra es genuina, cada acabado es el que prometemos. Sin atajos ni descripciones engañosas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote / CTA */}
            <section className="py-24 px-4 bg-white text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-serif text-[#1a1a1a] mb-8">
                        "Las joyas son pequeños recordatorios de lo que nos hace especiales."
                    </h2>
                    <p className="text-lg text-text-secondary font-light italic mb-12">
                        Queremos que cada pieza que lleves cuente tu historia y te haga sentir segura, auténtica y radiante.
                    </p>

                    <Link href="/tienda">
                        <button className="px-8 py-4 bg-[#1a1a1a] text-white hover:bg-[#d4af37] transition-colors rounded-lg uppercase tracking-widest text-xs font-bold">
                            Descubre la Colección
                        </button>
                    </Link>
                </div>
            </section>

        </main>
    );
}
