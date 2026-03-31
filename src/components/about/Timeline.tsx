'use client';

import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const steps = [
    {
        step: '01',
        title: 'Selección de Gemas',
        desc: 'Elegimos a mano cada piedra semipreciosa por su color, textura y energía. Cuarzos, ágatas, amatistas, jade y más, directamente de proveedores mexicanos.',
        img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop',
    },
    {
        step: '02',
        title: 'Diseño Artesanal',
        desc: 'Cada pieza se boceta y planea combinando colores, texturas y significados. Buscamos que la pieza final cuente una historia que conecte contigo.',
        img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
    },
    {
        step: '03',
        title: 'Ensamble a Mano',
        desc: 'Hilamos, trenzamos y ensamblamos cada pieza manualmente con perlas cultivadas, hilos de alta resistencia y herrajes con baño de oro de 18k.',
        img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    },
    {
        step: '04',
        title: 'Control de Calidad',
        desc: 'Revisamos cada detalle, cada broche, cada piedra antes de que la pieza llegue a tus manos. Nada sale sin pasar nuestra revisión final.',
        img: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?q=80&w=600&auto=format&fit=crop',
    },
];

export default function Timeline() {
    return (
        <section className="py-24 md:py-36 bg-cream">
            <div className="container mx-auto px-4 max-w-6xl">
                <AnimateOnScroll animation="fade-up" className="text-center mb-16 md:mb-24">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Nuestro Proceso</span>
                    <h2 className="text-3xl md:text-5xl font-serif mb-4">De la Piedra a Tu Mano</h2>
                    <p className="text-text-secondary max-w-md mx-auto">
                        Cada pieza pasa por un proceso cuidadoso donde nada se deja al azar.
                    </p>
                </AnimateOnScroll>

                <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-1 md:gap-0 relative">
                    {/* Vertical line (desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/20 -translate-x-1/2" />

                    {steps.map((item, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div key={item.step} className="md:grid md:grid-cols-2 md:gap-12 lg:gap-20 relative md:py-12">
                                {/* Dot on timeline */}
                                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-cream" />
                                </div>

                                {/* Image */}
                                <AnimateOnScroll
                                    animation={isEven ? 'fade-right' : 'fade-left'}
                                    delay={100}
                                    className={`${isEven ? 'md:order-1' : 'md:order-2'}`}
                                >
                                    <div className="aspect-[4/3] overflow-hidden mb-6 md:mb-0">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </AnimateOnScroll>

                                {/* Content */}
                                <AnimateOnScroll
                                    animation={isEven ? 'fade-left' : 'fade-right'}
                                    delay={250}
                                    className={`flex flex-col justify-center ${isEven ? 'md:order-2 md:pl-12 lg:pl-20' : 'md:order-1 md:pr-12 lg:pr-20 md:text-right'}`}
                                >
                                    <span className="text-accent text-sm tracking-[0.2em] font-medium block mb-3">{item.step}</span>
                                    <h3 className="text-2xl md:text-3xl font-serif mb-4">{item.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                                </AnimateOnScroll>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
