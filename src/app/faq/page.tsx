'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        category: "Productos y Fórmulas",
        items: [
            {
                question: "¿Los productos son aptos para pieles sensibles?",
                answer: "Absolutamente. Todas nuestras fórmulas son hipoalergénicas y han sido testeadas dermatológicamente en paneles con pieles sensibles. Evitamos fragancias sintéticas agresivas y alcoholes secantes."
            },
            {
                question: "¿Son productos veganos y libres de crueldad?",
                answer: "Sí. Yutnüu es una marca 100% Cruelty-Free certificada. No realizamos pruebas en animales en ninguna etapa de producción, y nuestros ingredientes son de origen vegetal o sintético seguro (bio-idéntico)."
            },
            {
                question: "¿Qué es el Aceite de Tuna y por qué lo usan?",
                answer: "El Aceite de Tuna (Opuntia Ficus-Indica) es nuestro ingrediente estrella. Es rico en Vitamina K (ilumina ojeras), Vitamina E (150% más que el argán) y ácidos grasos esenciales que reparan la barrera cutánea sin obstruir los poros."
            },
            {
                question: "¿Cuál es la caducidad de los productos?",
                answer: "Nuestros productos tienen una vida útil de 12 meses cerrados y 6 meses una vez abiertos (PAO), debido a que utilizamos conservadores suaves y naturales para proteger tu microbiota."
            }
        ]
    },
    {
        category: "Envíos y Pedidos",
        items: [
            {
                question: "¿Cuánto cuesta el envío?",
                answer: "El envío estándar es de $150 MXN a todo México. Ofrecemos envío GRATIS en compras superiores a $999 MXN."
            },
            {
                question: "¿Cuánto tarda en llegar mi pedido?",
                answer: "Los pedidos se procesan en 24 horas. El tiempo de entrega estándar es de 3 a 5 días hábiles. En zonas extendidas puede tomar hasta 7 días."
            },
            {
                question: "¿Hacen envíos internacionales?",
                answer: "Por el momento solo enviamos dentro de la República Mexicana. Estamos trabajando para llegar a USA y Latinoamérica pronto."
            }
        ]
    },
    {
        category: "Sustentabilidad",
        items: [
            {
                question: "¿Son sus envases reciclables?",
                answer: "Sí. Utilizamos vidrio ámbar para proteger las fórmulas y facilitar el reciclaje. Nuestras cajas son de cartón."
            },
            {
                question: "¿Tienen programa de refill?",
                answer: "Estamos pilotando un programa de retorno de envases en CDMX. Si juntas 5 envases vacíos iguales, te regalamos un producto en tu próxima compra."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-[#f8f9fa] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <HelpCircle className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2c4a52] mb-6">Preguntas Frecuentes</h1>
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        Resolvemos tus dudas sobre nuestra ciencia, ingredientes y procesos. Si no encuentras lo que buscas, nuestro equipo de soporte está listo para ayudarte.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-4xl py-16 space-y-16">
                {FAQS.map((category, catIdx) => (
                    <section key={catIdx}>
                        <h2 className="text-2xl font-serif text-[#2c4a52] mb-8 pb-2 border-b border-gray-100">
                            {category.category}
                        </h2>
                        <div className="space-y-4">
                            {category.items.map((item, idx) => {
                                const id = `${catIdx}-${idx}`;
                                const isOpen = openIndex === id;

                                return (
                                    <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden transition-all hover:shadow-sm">
                                        <button
                                            onClick={() => toggle(id)}
                                            className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50/50 transition-colors"
                                        >
                                            <span className="font-medium text-[#2c4a52] text-lg pr-8">{item.question}</span>
                                            {isOpen ?
                                                <ChevronUp className="text-[#d4af37] flex-shrink-0" /> :
                                                <ChevronDown className="text-gray-400 flex-shrink-0" />
                                            }
                                        </button>
                                        <div
                                            className={`bg-gray-50/30 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <p className="p-6 text-gray-600 leading-relaxed pt-2">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
