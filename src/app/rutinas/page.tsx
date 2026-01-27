import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import {
    Droplet,
    Sun,
    Moon,
    Sparkles,
    Shield,
    Feather,
    Zap,
    Clock,
    CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Rituales y Rutinas | Yutnüu',
    description: 'Guía experta de aplicación. Maximiza la eficacia de nuestras fórmulas botánicas con el orden correcto.',
};

export default function RoutinesPage() {
    return (
        <main className="bg-white min-h-screen pt-0 pb-20">

            {/* Hero Section */}
            <section className="relative px-4 py-20 md:py-32 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    {/* Abstract Pattern */}
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 C 50 100 80 0 100 100" stroke="white" strokeWidth="0.5" fill="none" />
                    </svg>
                </div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 flex items-center justify-center gap-2">
                        <Sparkles size={14} /> Guía de Aplicación
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-accent mb-6 leading-tight">
                        El Arte del Layering
                    </h1>
                    <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                        En cosmética, el orden de los factores sí altera el producto.
                        Aprende a superponer tus fórmulas Yutnüu para una absorción y eficacia óptima.
                    </p>
                </div>
            </section>

            {/* Introducción: Regla de Oro */}
            <section className="py-16 px-4 bg-cream-light border-b border-gray-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl font-serif text-primary mb-6">La Regla de Oro</h2>
                    <p className="text-text-secondary leading-relaxed">
                        Aplica siempre tus productos <strong>de la textura más ligera a la más pesada</strong>.
                        Esto permite que las fórmulas acuosas penetren primero, seguidas por las emulsiones y finalmente los aceites que sellan la humedad.
                    </p>
                </div>
            </section>

            {/* Ritual Facial Completo Layering */}
            <section className="py-24 px-4 bg-white relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="mb-16 flex items-end justify-between border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-4xl font-serif text-primary mb-2">Ritual Facial Diario</h2>
                            <p className="text-gray-500 font-light">AM: Protección & Luminosidad • PM: Reparación Profunda</p>
                        </div>
                        <div className="hidden md:flex gap-4 text-primary/50">
                            <Sun size={24} />
                            <span>/</span>
                            <Moon size={24} />
                        </div>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary/10 via-primary/20 to-primary/10 hidden md:block" />

                        {/* Step 1: Suero */}
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-16">
                                <div className="w-16 h-16 rounded-full bg-cream border border-primary/10 flex items-center justify-center text-primary z-10">
                                    <span className="font-serif text-xl">01</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">Tratamiento Dirigido</span>
                                        <h3 className="text-2xl font-serif text-primary group-hover:text-accent transition-colors">Suero Facial Yutnüu</h3>
                                    </div>
                                    <Zap className="text-accent" size={28} strokeWidth={1.5} />
                                </div>
                                <p className="text-text-secondary font-light mb-6 leading-relaxed">
                                    Tratamiento antioxidante ligero de rápida absorción. Su función es penetrar en las capas más profundas para combatir líneas de expresión y aportar luminosidad.
                                </p>
                                <div className="bg-cream-light rounded-xl p-4 flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <strong className="block text-primary text-sm mb-1">Modo de uso</strong>
                                        <p className="text-xs text-gray-600">Sobre rostro limpio y seco, aplica suavemente hasta su total absorción.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Crema */}
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-16">
                                <div className="w-16 h-16 rounded-full bg-cream border border-primary/10 flex items-center justify-center text-primary z-10">
                                    <span className="font-serif text-xl">02</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">Hidratación y Soporte</span>
                                        <h3 className="text-2xl font-serif text-primary group-hover:text-accent transition-colors">Crema Facial Yutnüu</h3>
                                    </div>
                                    <Droplet className="text-blue-300" size={28} strokeWidth={1.5} />
                                </div>
                                <p className="text-text-secondary font-light mb-6 leading-relaxed">
                                    Aporta la carga hídrica necesaria y regenera. Gracias a la niacinamida y el pantenol, mejora la textura y unifica el tono mientras mantiene la piel elástica.
                                </p>
                                <div className="bg-cream-light rounded-xl p-4 flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <strong className="block text-primary text-sm mb-1">Modo de uso</strong>
                                        <p className="text-xs text-gray-600">Masajea con movimientos circulares ascendentes. Sella los activos del suero.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Aceite */}
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-16">
                                <div className="w-16 h-16 rounded-full bg-primary text-white border border-primary flex items-center justify-center z-10 shadow-lg">
                                    <span className="font-serif text-xl">03</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-[#2c4a52] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                                {/* Decorative glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">Sellado y Potencia (Paso Maestro)</span>
                                        <h3 className="text-2xl font-serif text-accent">Aceite de Tuna Puro</h3>
                                    </div>
                                    <Shield className="text-accent" size={28} strokeWidth={1.5} />
                                </div>
                                <p className="text-white/80 font-light mb-6 leading-relaxed relative z-10">
                                    El "cierre de oro". Un concentrado lipídico que imita la barrera natural de la piel. Evita la pérdida de agua transepidérmica y aporta antioxidantes puros.
                                </p>
                                <div className="bg-white/10 rounded-xl p-4 flex items-start gap-3 relative z-10 border border-white/5">
                                    <Moon size={18} className="text-accent mt-1 flex-shrink-0" />
                                    <div>
                                        <strong className="block text-accent text-sm mb-1">Ideal para la Noche</strong>
                                        <p className="text-xs text-white/70">Aplica 2-3 gotas como último paso para despertar con una piel regenerada.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ritual Capilar */}
            <section className="py-24 px-4 bg-cream relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Cuidado del Cabello</span>
                            <h2 className="text-4xl font-serif text-primary mb-6">Ritual de Nutrición Capilar</h2>
                            <p className="text-text-secondary font-light leading-relaxed mb-8">
                                Más allá de un estilizador, un alimento para tu fibra capilar.
                                Nuestro Aceite Capilar combina argán, linaza y tuna para fortalecer sin apelmazar.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-primary">
                                        <Feather size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Nutrición Ligera</h4>
                                        <p className="text-sm text-gray-600">Nutre profundamente medios y puntas secas sin dejar sensación grasa.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-primary">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Brillo y Control</h4>
                                        <p className="text-sm text-gray-600">Sella la cutícula y controla el frizz instantáneamente.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/tienda/aceite-capilar-yutnuu">
                                    <Button className="px-8 py-3 bg-primary hover:bg-primary-light text-white shadow-lg">
                                        Ver Producto
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-[3rem] shadow-xl relative overflow-hidden group">
                                <Image
                                    src="https://yutnu-images.s3.us-east-2.amazonaws.com/products/1766778492644-IMG_7419.jpg"
                                    alt="Aceite Capilar Yutnüu"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                                    <div className="mb-4 inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm text-[#d4af37] border border-white/20 hover:scale-110 transition-transform">
                                        <Feather size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-serif text-3xl text-white mb-2 shadow-sm">Aceite Capilar</h3>
                                    <p className="text-sm text-[#d4af37] font-bold uppercase tracking-widest drop-shadow-md">Yutnüu Cosmetics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 bg-white text-center border-t border-gray-100">
                <div className="container mx-auto max-w-2xl">
                    <Clock size={48} className="mx-auto text-primary/20 mb-6" />
                    <h2 className="text-3xl font-serif text-primary mb-6">
                        La constancia es el secreto
                    </h2>
                    <p className="text-text-secondary font-light mb-10 leading-relaxed">
                        Los resultados visibles son la suma de pequeños rituales diarios.
                        Empieza hoy a transformar la salud de tu piel.
                    </p>

                    <Link href="/tienda">
                        <Button variant="outline" className="px-10 py-4 border-accent text-accent hover:bg-accent hover:text-white text-lg">
                            Explorar la Tienda
                        </Button>
                    </Link>
                </div>
            </section>

        </main>
    );
}
