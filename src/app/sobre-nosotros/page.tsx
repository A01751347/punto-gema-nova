import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Nuestra Historia | Punto Gema Nova',
    description: 'Joyeria artesanal mexicana con piedras semipreciosas, perlas y bano de oro de 18k. Conoce la historia detras de Punto Gema Nova.',
};

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen">

            {/* Hero */}
            <section className="py-24 md:py-36 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-6">
                        Nuestra Esencia
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif leading-[1.08] mb-8">
                        No solo creamos joyas,<br />
                        creamos <em className="text-accent">momentos.</em>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                        Punto Gema Nova nace de la pasion por las piedras naturales
                        y la tradicion artesanal mexicana que transforma minerales en piezas llenas de significado.
                    </p>
                </div>
            </section>

            {/* Origin Story */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <div>
                            <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">El Origen</span>
                            <h2 className="text-3xl md:text-4xl mb-8">La Magia de las Piedras</h2>
                            <div className="text-text-secondary space-y-6 leading-relaxed">
                                <p>
                                    Todo comenzo con la fascinacion por las gemas que la tierra mexicana nos regala.
                                    Cuarzos, agatas, jades y amatistas que llevan millones de anos formandose bajo
                                    la superficie, esperando ser descubiertos.
                                </p>
                                <p>
                                    Nos enamoramos de la idea de combinar esas piedras con perlas cultivadas y bano
                                    de oro de 18k para crear piezas que fueran mas que accesorios:
                                </p>
                                <blockquote className="border-l-2 border-accent pl-6 italic text-text-primary">
                                    &ldquo;Queriamos que cada collar, pulsera o set contara una historia
                                    y conectara con quien lo lleva.&rdquo;
                                </blockquote>
                            </div>
                        </div>

                        <div className="aspect-[3/4] bg-cream rounded-sm flex items-center justify-center">
                            <span className="text-text-light text-sm tracking-wider uppercase">Foto proximamente</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 md:py-32 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Filosofia</span>
                        <h2 className="text-3xl md:text-4xl text-white mb-4">Tres pilares innegociables</h2>
                        <p className="text-white/60 max-w-lg">
                            Que guian cada pieza que creamos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                        {[
                            {
                                num: '01',
                                title: 'Calidad Artesanal',
                                text: 'Cada pieza es ensamblada a mano con piedras semipreciosas seleccionadas, perlas cultivadas y herrajes con bano de oro de 18k. No hay produccion en serie.',
                            },
                            {
                                num: '02',
                                title: 'Diseno con Intencion',
                                text: 'Cada combinacion de gemas, colores y texturas esta pensada para transmitir algo especial. Disenamos piezas que complementan tu estilo.',
                            },
                            {
                                num: '03',
                                title: 'Honestidad',
                                text: 'Somos transparentes con nuestros materiales y procesos. Cada piedra es genuina, cada acabado es el que prometemos. Sin atajos.',
                            },
                        ].map((v) => (
                            <div key={v.num} className="bg-primary p-10 md:p-12">
                                <span className="text-accent text-sm tracking-wider block mb-6">{v.num}</span>
                                <h3 className="text-xl text-white mb-4">{v.title}</h3>
                                <p className="text-white/60 leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote CTA */}
            <section className="py-24 md:py-32 text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <blockquote className="text-3xl md:text-4xl font-serif leading-snug mb-8">
                        &ldquo;Las joyas son pequenos recordatorios de lo que nos hace especiales.&rdquo;
                    </blockquote>
                    <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-xl mx-auto">
                        Queremos que cada pieza que lleves cuente tu historia y te haga sentir
                        segura, autentica y radiante.
                    </p>
                    <Link href="/tienda">
                        <button className="h-13 px-10 bg-primary text-white hover:bg-accent transition-colors text-sm tracking-[0.15em] uppercase">
                            Descubre la Coleccion
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
