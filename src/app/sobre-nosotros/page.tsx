import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Nuestra Historia | Yutnüu',
    description: 'De las tierras altas de México a tu piel. La historia detrás de Yutnüu y nuestra obsesión por la cosmética botánica.',
};

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen pt-0 pb-20">

            {/* Hero Section */}
            <section className="relative px-4 py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/banner-tuna.png"
                        alt="Paisaje de Tuna"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-[#1e343a]/90" />

                <div className="container mx-auto max-w-5xl relative z-10 text-center text-white">
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Nuestra Esencia
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8 text-[#d4af37]">
                        No creamos productos,<br />
                        <span className="italic text-white">capturamos paisajes.</span>
                    </h1>
                    <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                        Yutnüu nace de la fascinación por la resistencia.
                        La capacidad de la naturaleza para prosperar en los entornos más hostiles.
                    </p>
                </div>
            </section>

            {/* The Origin Story */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div>
                            <h2 className="text-3xl font-serif text-[#2c4a52] mb-6">El Secreto del Desierto</h2>
                            <div className="h-1 w-16 bg-[#d4af37] mb-8" />
                            <div className="text-text-secondary space-y-6 font-light leading-relaxed">
                                <p>
                                    En las zonas áridas de México, donde el sol es implacable y el agua es escasa, la vida encuentra una forma no solo de sobrevivir, sino de florecer.
                                </p>
                                <p>
                                    Observamos que la tuna (Opuntia) no se seca; al contrario, su interior está repleto de agua y nutrientes. Nos preguntamos:
                                    <span className="italic text-[#2c4a52] font-medium"> "¿Qué pasaría si pudiéramos transferir esa capacidad de retención de humedad a la piel humana?"</span>
                                </p>
                            </div>
                        </div>


                        <div className="aspect-[3/4] bg-cream-light rounded-t-full rounded-b-3xl relative overflow-hidden group shadow-xl">
                            <Image
                                src="/images/tuna.png"
                                alt="Cosecha de Tuna"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-0 right-0 text-center">
                                <span className="text-white/90 text-sm font-medium tracking-widest uppercase">Cosecha Silvestre Responsable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-4 bg-cream-light">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#2c4a52] mb-4">Filosofía Yutnüu</h2>
                        <p className="text-text-secondary max-w-lg mx-auto font-light">
                            Tres pilares innegociables que guían cada fórmula que desarrollamos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[#d4af37] text-5xl font-serif block mb-6">01</span>
                            <h3 className="text-xl font-bold text-[#2c4a52] mb-4">Eficacia Clínica</h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                No usamos "pixie dusting" (añadir una gota de activo solo para ponerlo en la etiqueta).
                                Usamos concentraciones funcionales validadas por estudios.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[#d4af37] text-5xl font-serif block mb-6">02</span>
                            <h3 className="text-xl font-bold text-[#2c4a52] mb-4">Origen Trazable</h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                Conocemos a los productores. Sabemos en qué ladera creció el nopal y cuándo fue prensado.
                                Sin intermediarios opacos.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[#d4af37] text-5xl font-serif block mb-6">03</span>
                            <h3 className="text-xl font-bold text-[#2c4a52] mb-4">Honestidad Radical</h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                Si un producto huele a planta, es porque no lo enmascaramos con fragancias sintéticas.
                                La belleza real es sensorial y auténtica.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team / Founder (Optional placeholder) */}
            <section className="py-24 px-4 bg-white text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-serif text-[#2c4a52] mb-8">
                        "La piel es el archivo de nuestra historia."
                    </h2>
                    <p className="text-lg text-text-secondary font-light italic mb-12">
                        Queremos que tu piel cuente una historia de vitalidad y respeto, no de agresiones.
                    </p>

                    <Link href="/tienda">
                        <button className="px-8 py-4 bg-[#2c4a52] text-white hover:bg-[#d4af37] transition-colors rounded-lg uppercase tracking-widest text-xs font-bold">
                            Descubre la Colección
                        </button>
                    </Link>
                </div>
            </section>

        </main>
    );
}
