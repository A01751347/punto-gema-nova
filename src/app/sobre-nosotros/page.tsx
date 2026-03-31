import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import AboutHero from '@/components/about/AboutHero';
import ValuesCounter from '@/components/about/ValuesCounter';
import Timeline from '@/components/about/Timeline';
import TeamShowcase from '@/components/about/TeamShowcase';

export const metadata: Metadata = {
    title: 'Nuestra Historia | Punto Gema Nova',
    description: 'Joyeria artesanal mexicana con piedras semipreciosas, perlas y bano de oro de 18k. Conoce la historia detras de Punto Gema Nova.',
};

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen overflow-hidden">

            {/* 1. Hero inmersivo con parallax */}
            <AboutHero />

            {/* 2. Contadores animados */}
            <ValuesCounter />

            {/* 3. Origin Story — Imagen + texto */}
            <section className="py-24 md:py-36">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <AnimateOnScroll animation="fade-right">
                            <div className="relative">
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop"
                                        alt="Proceso artesanal de joyería"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Floating accent card */}
                                <div className="absolute -bottom-6 -right-6 md:-right-10 bg-accent text-white p-6 md:p-8 max-w-[200px]">
                                    <span className="text-3xl md:text-4xl font-serif block mb-1">100%</span>
                                    <span className="text-xs tracking-[0.2em] uppercase text-white/80">Hecho a mano</span>
                                </div>
                            </div>
                        </AnimateOnScroll>

                        <AnimateOnScroll animation="fade-left" delay={200}>
                            <div>
                                <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">El Origen</span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 leading-tight">
                                    La Magia de<br />las Piedras
                                </h2>
                                <div className="text-text-secondary space-y-6 leading-relaxed">
                                    <p>
                                        Todo comenzó con la fascinación por las gemas que la tierra mexicana nos regala.
                                        Cuarzos, ágatas, jades y amatistas que llevan millones de años formándose bajo
                                        la superficie, esperando ser descubiertos.
                                    </p>
                                    <p>
                                        Nos enamoramos de la idea de combinar esas piedras con perlas cultivadas y baño
                                        de oro de 18k para crear piezas que fueran más que accesorios.
                                    </p>
                                </div>
                                <blockquote className="mt-8 border-l-2 border-accent pl-6 py-2">
                                    <p className="italic text-lg font-serif leading-relaxed">
                                        &ldquo;Queríamos que cada collar, pulsera o set contara una historia
                                        y conectara con quien lo lleva.&rdquo;
                                    </p>
                                </blockquote>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* 4. Timeline del proceso */}
            <Timeline />

            {/* 5. Valores — Cards interactivas */}
            <section className="py-24 md:py-36 bg-primary text-white relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <AnimateOnScroll animation="fade-up" className="mb-16 md:mb-20">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Filosofía</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Tres pilares innegociables</h2>
                        <p className="text-white/50 max-w-lg text-lg">
                            Que guían cada pieza que creamos.
                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                num: '01',
                                title: 'Calidad Artesanal',
                                text: 'Cada pieza es ensamblada a mano con piedras semipreciosas seleccionadas, perlas cultivadas y herrajes con baño de oro de 18k. No hay producción en serie.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                    </svg>
                                ),
                            },
                            {
                                num: '02',
                                title: 'Diseño con Intención',
                                text: 'Cada combinación de gemas, colores y texturas está pensada para transmitir algo especial. Diseñamos piezas que complementan tu estilo.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                ),
                            },
                            {
                                num: '03',
                                title: 'Honestidad Total',
                                text: 'Somos transparentes con nuestros materiales y procesos. Cada piedra es genuina, cada acabado es el que prometemos. Sin atajos.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                ),
                            },
                        ].map((v, i) => (
                            <AnimateOnScroll key={v.num} animation="fade-up" delay={i * 150}>
                                <div className="group bg-white/5 border border-white/10 p-8 md:p-10 hover:bg-white/10 hover:border-accent/30 transition-all duration-500 h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-accent/60 text-sm tracking-wider">{v.num}</span>
                                        <div className="text-accent/60 group-hover:text-accent transition-colors duration-500">
                                            {v.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors duration-500">{v.title}</h3>
                                    <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">{v.text}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Materiales showcase */}
            <section className="py-24 md:py-36">
                <div className="container mx-auto px-4 max-w-6xl">
                    <AnimateOnScroll animation="fade-up" className="text-center mb-16 md:mb-20">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Nuestros Materiales</span>
                        <h2 className="text-3xl md:text-5xl font-serif mb-4">Lo Que Nos Define</h2>
                        <p className="text-text-secondary max-w-lg mx-auto">
                            Cada material cuenta su propia historia milenaria.
                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { name: 'Cuarzo Rosa', desc: 'Amor y sanación', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Perlas Naturales', desc: 'Elegancia eterna', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Ágata', desc: 'Equilibrio y fuerza', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Chapa de Oro 18k', desc: 'Brillo auténtico', img: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?q=80&w=400&auto=format&fit=crop' },
                        ].map((mat, i) => (
                            <AnimateOnScroll key={mat.name} animation="fade-up" delay={i * 100}>
                                <div className="group cursor-pointer">
                                    <div className="aspect-square overflow-hidden mb-4 relative">
                                        <img
                                            src={mat.img}
                                            alt={mat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                                    </div>
                                    <h4 className="text-sm font-medium tracking-wide group-hover:text-accent transition-colors">{mat.name}</h4>
                                    <p className="text-xs text-text-secondary mt-0.5">{mat.desc}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Galería behind the scenes */}
            <TeamShowcase />

            {/* 8. Quote CTA con fondo visual */}
            <section className="relative py-28 md:py-40 text-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1599459183200-59c3fd67e37b?q=80&w=1600&auto=format&fit=crop"
                        alt="Joyería artesanal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/90" />
                </div>

                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <AnimateOnScroll animation="scale-in">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-8">Nuestra Promesa</span>
                        <blockquote className="text-3xl md:text-5xl font-serif leading-snug mb-8">
                            &ldquo;Las joyas son pequeños recordatorios de lo que nos hace especiales.&rdquo;
                        </blockquote>
                        <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-xl mx-auto">
                            Queremos que cada pieza que lleves cuente tu historia y te haga sentir
                            segura, auténtica y radiante.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/tienda">
                                <button className="h-14 px-10 bg-primary text-white hover:bg-accent transition-colors text-xs tracking-[0.2em] uppercase">
                                    Descubre la Colección
                                </button>
                            </Link>
                            <Link href="/proceso">
                                <button className="h-14 px-10 border border-primary/20 text-primary hover:border-accent hover:text-accent transition-colors text-xs tracking-[0.2em] uppercase">
                                    Conoce el Proceso
                                </button>
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>
        </main>
    );
}
