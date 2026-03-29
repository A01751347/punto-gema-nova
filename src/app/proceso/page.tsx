import type { Metadata } from 'next';
import { Gem, Search, Hand, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Nuestro Proceso | Punto Gema Nova',
    description: 'Conoce el proceso artesanal detrás de cada pieza de Punto Gema Nova: diseño, selección de materiales, elaboración a mano y control de calidad.',
};

const steps = [
    {
        number: '01',
        title: 'Diseño',
        description: 'Cada pieza nace de una inspiración: colores, texturas y formas de la naturaleza.',
        icon: Gem,
    },
    {
        number: '02',
        title: 'Selección de Materiales',
        description: 'Elegimos piedras semipreciosas y materiales de calidad, uno por uno.',
        icon: Search,
    },
    {
        number: '03',
        title: 'Elaboración Artesanal',
        description: 'Cada pieza es ensamblada a mano con dedicación y cuidado.',
        icon: Hand,
    },
    {
        number: '04',
        title: 'Control de Calidad',
        description: 'Revisamos cada detalle antes de empacar tu pieza.',
        icon: CheckCircle,
    },
];

export default function ProcesoPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero */}
            <section className="bg-[#f4f4f0] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">
                        Nuestro Proceso
                    </h1>
                    <p className="text-lg text-gray-600 font-light">
                        Del diseño a tus manos
                    </p>
                </div>
            </section>

            {/* Steps */}
            <div className="container mx-auto px-4 max-w-4xl py-16 space-y-20">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isReversed = index % 2 !== 0;

                    return (
                        <div
                            key={step.number}
                            className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
                        >
                            <div className="md:w-1/2">
                                <div className="text-[#d4af37] font-bold text-6xl opacity-20 mb-[-20px] ml-[-10px]">
                                    {step.number}
                                </div>
                                <h2 className="text-2xl font-serif text-[#1a1a1a] mb-4">
                                    {step.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            <div className="md:w-1/2 bg-gray-50 h-64 rounded-2xl flex items-center justify-center">
                                <Icon size={64} className="text-[#c9b99a] opacity-50" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
