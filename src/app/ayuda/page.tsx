import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Truck, RefreshCw, Lock, Book, MessageCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Centro de Ayuda | Yutnüu',
    description: '¿En qué podemos ayudarte hoy?',
};

const TOPICS = [
    {
        icon: <HelpCircle size={32} />,
        title: "Preguntas Frecuentes",
        desc: "Respuestas rápidas sobre productos y cuenta.",
        href: "/faq"
    },
    {
        icon: <Truck size={32} />,
        title: "Envíos y Entregas",
        desc: "Rastreo, costos y tiempos de llegada.",
        href: "/envios"
    },
    {
        icon: <RefreshCw size={32} />,
        title: "Cambios y Devoluciones",
        desc: "Conoce nuestra garantía de satisfacción.",
        href: "/devoluciones"
    },
    {
        icon: <FileText size={32} />,
        title: "Facturación",
        desc: "Genera tu CFDI 4.0 con tu número de orden.",
        href: "/facturacion"
    },
    {
        icon: <Lock size={32} />,
        title: "Privacidad y Seguridad",
        desc: "Cómo protegemos tus datos personales.",
        href: "/politica-privacidad"
    },
    {
        icon: <Book size={32} />,
        title: "Referencias Científicas",
        desc: "Nuestra biblioteca de estudios.",
        href: "/referencias"
    },
    {
        icon: <MessageCircle size={32} />,
        title: "Contacto Directo",
        desc: "¿No encuentras lo que buscas? Escríbenos.",
        href: "/contacto"
    }
];

export default function HelpHubPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#2c4a52] text-white py-20 border-b border-white/10">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <span className="text-[#d4af37] tracking-widest uppercase text-xs font-bold block mb-4">Soporte Yutnüu</span>
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">¿Cómo podemos ayudarte?</h1>
                    <div className="max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Buscar un tema (ej. envíos, ingredientes)..."
                            className="w-full h-12 rounded-full px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            disabled // Placeholder functionality for now
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOPICS.map((topic, idx) => (
                        <Link href={topic.href} key={idx} className="group">
                            <div className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-[#d4af37]/30 transition-all h-full bg-white">
                                <div className="text-[#2c4a52] group-hover:text-[#d4af37] transition-colors mb-4 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-[#d4af37]/10">
                                    {topic.icon}
                                </div>
                                <h3 className="text-xl font-serif text-[#2c4a52] mb-2">{topic.title}</h3>
                                <p className="text-gray-500 font-light text-sm">{topic.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 bg-[#f8f9fa] rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-serif text-[#2c4a52] mb-4">¿Sigues con dudas?</h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Nuestro equipo de dermatología y atención al cliente está disponible de Lunes a Viernes de 9:00 a 18:00 hrs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contacto" className="bg-[#2c4a52] text-white px-8 py-3 rounded-full hover:bg-[#1a2e33] transition-colors">
                            Formulario de Contacto
                        </Link>
                        <a href="mailto:hola@yutnuu.mx" className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
                            Enviar Email
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
