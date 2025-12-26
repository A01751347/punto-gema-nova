import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ciencia y Transparencia | YUTNÜÜ',
    description: 'Conoce la ciencia detrás de nuestras formulaciones. Fichas técnicas, estudios clínicos y transparencia total sobre nuestros ingredientes.',
};

export default function SciencePage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            {/* Header / Hero */}
            <section className="bg-primary text-white py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">
                    <span className="text-sm font-bold tracking-widest text-white/50 uppercase mb-4 block">
                        Investigación y Desarrollo
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        Opuntia Ficus – Indica:<br />
                        <span className="text-white/70 italic">Más allá de la cosmética convencional.</span>
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed">
                        Analizamos a profundidad el perfil fitoquímico de nuestro ingrediente estrella.
                        Evidencia científica sobre composición, extracción y bioactividad.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 max-w-5xl -mt-10 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 space-y-16">

                    {/* General Description */}
                    <section>
                        <h2 className="text-2xl font-serif text-primary mb-6 border-b border-gray-100 pb-2">Descripción General</h2>
                        <div className="prose prose-lg text-text-secondary">
                            <p>
                                El <strong>Aceite de Semilla de Tuna</strong> (Opuntia ficus-indica L. Mill.), también conocido como aceite de semilla de nopal,
                                es un lípido vegetal de alto valor obtenido de las semillas del fruto.
                                Representa un recurso invaluable dentro de la bioeconomía circular, aprovechando las semillas que anteriormente se consideraban subproducto.
                            </p>
                            <p className="mt-4">
                                Su perfil destaca por un grado excepcional de insaturación (hasta <strong>82.3%</strong>) y una concentración de antioxidantes
                                superior a aceites de referencia como el argán.
                            </p>
                        </div>
                    </section>

                    {/* Chemical Composition */}
                    <section>
                        <h2 className="text-2xl font-serif text-primary mb-6 border-b border-gray-100 pb-2">Composición Química Clave</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Fatty Acids */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide text-xs">Perfil de Ácidos Grasos</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                                        <span className="font-medium text-primary">Ácido Linoleico (Omega-6)</span>
                                        <span className="text-sm font-mono text-gray-500">58.5% – 88.9%</span>
                                    </li>
                                    <li className="text-xs text-gray-400 italic mb-2">
                                        Ácido graso esencial dominante. Restaura la barrera cutánea.
                                    </li>

                                    <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                                        <span className="font-medium text-primary">Ácido Oleico (Omega-9)</span>
                                        <span className="text-sm font-mono text-gray-500">19.7% approx</span>
                                    </li>

                                    <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                                        <span className="text-gray-700">Ácido Palmítico</span>
                                        <span className="text-sm font-mono text-gray-500">11-13%</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Bioactives */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide text-xs">Bioactivos y Antioxidantes</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-medium text-primary">Vitamina E (Tocoferoles)</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Contiene hasta <strong>150% más vitamina E</strong> que el aceite de argán.
                                            Predomina el γ-tocoferol (aprox. 20mg/100g), ofreciendo una estabilidad oxidativa superior.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-primary">Fitoesteroles</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Rico en β-sitosterol (11.6–58.3 mg/100g). Aporta propiedades antiinflamatorias y reestructurantes.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-primary">Polifenoles</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Alta concentración de polifenoles, flavonoides y taninos.
                                            Principios activos destacados: ácido ferúlico (347 µg/g).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Applications & Mechanisms */}
                    <section className="bg-cream-light -mx-8 md:-mx-12 px-8 md:px-12 py-12">
                        <h2 className="text-2xl font-serif text-primary mb-8 text-center">Mecanismos de Acción Dermocosmética</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-serif text-xl mb-3 text-primary">Regeneración</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    El <strong>ácido linoleico</strong> penetra profundamente estimulando la renovación celular.
                                    El ácido ferúlico potencia la síntesis de nuevas fibras de colágeno y elastina.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-serif text-xl mb-3 text-primary">Fotoprotección</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Reduce la apoptosis de fibroblastos causada por UV. Actúa como un "booster" natural
                                    reduciendo la inmunosupresión y formación de oxígeno singlete asociada al fotoenvejecimiento.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-serif text-xl mb-3 text-primary">Función Barrera</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    El ácido palmítico y los fitoesteroles refuerzan la capa lipídica, previniendo la pérdida transepidérmica de agua (TEWL)
                                    sin efecto oclusivo graso.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
                            <div className="border-l-2 border-primary/20 pl-4">
                                <strong className="block text-primary mb-1">Actividad Antiinflamatoria</strong>
                                Modula la respuesta inflamatoria gracias al β-sitosterol y ácido oleico. Útil en pieles reactivas y para calmar irritaciones post-exposición solar.
                            </div>
                            <div className="border-l-2 border-primary/20 pl-4">
                                <strong className="block text-primary mb-1">Perfil Sensorial</strong>
                                Absorción "dry-touch" rápida. No deja residuos grasos ni comedogénicos, siendo apto para pieles mixtas y grasas.
                            </div>
                        </div>
                    </section>

                    {/* Extraction Method */}
                    <section>
                        <h2 className="text-2xl font-serif text-primary mb-6 border-b border-gray-100 pb-2">Método de Obtención: Prensado en Frío</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Utilizamos exclusivamente el método mecánico de <strong>Cold Press</strong>.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Sin solventes químicos (hexano).</li>
                            <li>Tolerancia térmica mínima para preservar la integridad de los tocoferoles y ácidos grasos insaturados.</li>
                            <li>Rendimiento bajo natural (0.5% – 6.1%), lo que explica su alto valor en el mercado frente a aceites extraídos químicamente.</li>
                        </ul>
                    </section>

                    {/* Bibliography */}
                    <section className="pt-12 border-t border-gray-100">
                        <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-4 flex items-center gap-2">
                            Referencias Bibliográficas & Estudios
                        </button>
                        <div className="text-xs text-gray-400 font-mono space-y-2 max-h-48 overflow-y-auto pr-2 bg-gray-50 p-4 rounded-lg">
                            <p>1. Mohamed Fawzy Ramadan (Ed). Cold Pressed Oils: Green Technology, Bioactive Compounds... Academic Press, 2018.</p>
                            <p>2. Ennouri, M., et al. (2005). Fatty acid composition and rheological properties of prickly pear seed oil. J. Agric. Food Chem.</p>
                            <p>3. Ramirez-Moreno, S. et al. (2017). Antioxidant and Antimicrobial Properties of Cactus Pear Opuntia Seed. Journal of Food Quality.</p>
                            <p>4. Regalado-Rentería, E. et al. (2014). Assessment of extraction methods and biological value.</p>
                            <p>5. O’Brien, R. D. et al. (Eds.). (2016). Introduction to Fats and Oils Technology.</p>
                            <p>... y compilación técnica interna basada en literatura de Springer Nature, Elsevier y Journal of Ethnopharmacology.</p>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
