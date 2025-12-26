import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ciencia y Transparencia | YUTNÜÜ',
    description: 'Conoce la ciencia detrás de nuestras formulaciones. Fichas técnicas, estudios clínicos y transparencia total sobre nuestros ingredientes.',
};

export default function SciencePage() {
    return (
        <main className="bg-white min-h-screen">

            {/* Hero Section - Immersivo */}
            <section className="relative bg-primary text-white py-32 md:py-48 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
                {/* Decorative background circle */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-white/5 backdrop-blur-sm">
                        Investigación y Desarrollo
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] text-[#d4af37]">
                        Opuntia Ficus – Indica:<br />
                        <span className="text-white/60 italic font-light">Más allá de la cosmética.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed border-l-2 border-white/20 pl-6">
                        Analizamos a profundidad el perfil fitoquímico de nuestro ingrediente estrella.
                        Evidencia científica sobre composición, extracción y bioactividad.
                    </p>
                </div>
            </section>

            {/* General Description - Clean & Centered */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-sm font-bold tracking-widest text-primary/50 uppercase mb-4">Descripción General</h2>
                    <p className="text-2xl md:text-4xl font-serif text-primary leading-tight mb-8">
                        El Aceite de Semilla de Tuna
                        <span className="italic text-gray-400 block text-lg md:text-2xl mt-2">(Opuntia ficus-indica L. Mill.)</span>
                    </p>
                    <div className="prose prose-lg mx-auto text-text-secondary font-light">
                        <p>
                            También conocido como aceite de semilla de nopal, es un lípido vegetal de alto valor obtenido de las semillas del fruto.
                            Representa un recurso invaluable dentro de la <strong className="text-primary font-medium">bioeconomía circular</strong>,
                            aprovechando las semillas que anteriormente se consideraban subproducto.
                            Su perfil destaca por un grado excepcional de insaturación <strong>(hasta 82.3%)</strong> y una concentración de antioxidantes
                            superior a aceites de referencia como el argán.
                        </p>
                    </div>
                </div>
            </section>

            {/* Chemical Composition - Split Layout with Texture */}
            <section className="py-24 px-4 bg-cream-light relative overflow-hidden">
                {/* Texture */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Composición Química</h2>
                        <div className="h-1 w-20 bg-accent/50 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Fatty Acids Card */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/10 transition-colors">
                            <h3 className="text-xl font-serif text-primary mb-8 border-b border-gray-100 pb-4">
                                Perfil de Ácidos Grasos
                            </h3>
                            <ul className="space-y-6">
                                <li className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Ácido Linoleico (Omega-6)</span>
                                        <span className="font-mono text-sm text-primary/60">58.5% – 88.9%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                        Ácido graso esencial dominante. Restaura la barrera cutánea y mejora la textura.
                                    </p>
                                </li>
                                <li className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Ácido Oleico (Omega-9)</span>
                                        <span className="font-mono text-sm text-primary/60">~19.7%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                        Hidratación profunda y vehículo para otros activos.
                                    </p>
                                </li>
                                <li className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-gray-900">Ácido Palmítico</span>
                                        <span className="font-mono text-sm text-primary/60">11-13%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Bioactives - Visual List */}
                        <div className="space-y-8 flex flex-col justify-center">
                            <div>
                                <h3 className="text-xl font-serif text-primary mb-6">Bioactivos y Antioxidantes</h3>
                                <p className="text-gray-600 mb-8 font-light">
                                    La verdadera magia ocurre aquí. Componentes menores en cantidad pero gigantes en bioactividad.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-serif text-xl">
                                        E
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Vitamina E (Tocoferoles)</h4>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            Hasta <strong>150% más</strong> que el aceite de argán. Predomina el γ-tocoferol (~20mg/100g), brindando estabilidad oxidativa superior.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary font-serif text-xl">
                                        β
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Fitoesteroles</h4>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            Rico en β-sitosterol (11.6–58.3 mg/100g). Propiedades antiinflamatorias y reestructurantes para pieles dañadas.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-serif text-xl">
                                        P
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Polifenoles</h4>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            Alta concentración de flavonoides y ácido ferúlico (347 µg/g), un potente antioxidante foto-protector.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mechanisms - Dark Section for Contrast */}
            <section className="py-24 px-4 bg-primary text-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Dermocosmética</span>
                        <h2 className="text-3xl md:text-5xl font-serif">Mecanismos de Acción</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Regeneración Celular",
                                desc: "El ácido linoleico penetra profundamente estimulando la renovación celular, mientras el ácido ferúlico potencia la síntesis de colágeno.",
                                icon: "01"
                            },
                            {
                                title: "Fotoprotección Biológica",
                                desc: "Reduce la apoptosis de fibroblastos causada por UV. Actúa como un escudo reduciendo la formación de radicales libres.",
                                icon: "02"
                            },
                            {
                                title: "Función Barrera",
                                desc: "Refuerza el 'cemento' intercelular limitando la pérdida de agua (TEWL) sin ocluir los poros.",
                                icon: "03"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <span className="text-4xl font-serif text-accent mb-6 block">{item.icon}</span>
                                <h3 className="text-xl font-medium mb-4 text-white">{item.title}</h3>
                                <p className="text-white/95 font-light leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <div>
                                <strong className="block text-white mb-1 text-sm">Actividad Antiinflamatoria</strong>
                                <p className="text-white/90 text-xs">Modula la respuesta inflamatoria vía β-sitosterol.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            <div>
                                <strong className="block text-white mb-1 text-sm">Perfil Sensorial Dry-Touch</strong>
                                <p className="text-white/90 text-xs">Absorción rápida, no comedogénico.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interesting Facts - Floating Cards Layout */}
            <section className="py-24 px-4 bg-white relative">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-12 border-l-4 border-accent pl-6">
                        Datos de Interés
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-cream-light p-8 rounded-2xl md:col-span-2 hover:shadow-lg transition-shadow duration-300">
                            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">Producción</span>
                            <h3 className="text-2xl font-serif text-primary mb-4">1 Tonelada = 1 Litro</h3>
                            <p className="text-text-secondary font-light leading-relaxed">
                                Se requiere aproximadamente <strong>1,000 kg de fruta</strong> para producir solo <strong>1 litro</strong> de este aceite precioso. Es un proceso laborioso que justifica su exclusividad.
                            </p>
                        </div>

                        <div className="bg-primary p-8 rounded-2xl text-white transform md:translate-y-8">
                            <span className="text-4xl mb-4 block">🌵</span>
                            <h3 className="font-bold mb-2 text-white">Sostenibilidad</h3>
                            <p className="text-sm text-white/95 leading-relaxed">
                                Valorizamos semillas que antes eran desechadas, creando un ciclo de economía circular perfecto.
                            </p>
                        </div>

                        <div className="bg-stone-100 p-8 rounded-2xl transform md:-translate-y-4">
                            <span className="text-4xl mb-4 block">🚀</span>
                            <h3 className="font-bold text-primary mb-2">Resistencia Extrema</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Por su estabilidad oxidativa, se estudia su uso en condiciones de alta radiación y estrés ambiental.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Extraction & Bibliography - Minimalist Footer */}
            <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-lg font-bold text-primary mb-4 uppercase tracking-wide">Método: Cold Press</h2>
                        <p className="text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
                            Utilizamos exclusivamente extracción mecánica sin solventes ni calor, preservando integramente los tocoferoles y ácidos grasos que otros métodos destruyen.
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-8 bg-white">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Referencias & Evidencia</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500 font-mono">
                            <p>1. Mohamed Fawzy Ramadan (Ed). Cold Pressed Oils: Green Technology, Bioactive Compounds... Academic Press, 2018.</p>
                            <p>2. Ennouri, M., et al. (2005). Fatty acid composition and rheological properties of prickly pear seed oil. J. Agric. Food Chem.</p>
                            <p>3. Ramirez-Moreno, S. et al. (2017). Antioxidant and Antimicrobial Properties of Cactus Pear Opuntia Seed.</p>
                            <p>4. Regalado-Rentería, E. et al. (2014). Assessment of extraction methods and biological value.</p>
                            <p>5. O’Brien, R. D. et al. (Eds.). (2016). Introduction to Fats and Oils Technology.</p>
                            <p>6. Compilación técnica interna basada en literatura de Springer Nature y Elsevier.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
