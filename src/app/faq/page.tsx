'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        category: "Productos y Materiales",
        items: [
            {
                question: "¿De qué materiales están hechas sus joyas?",
                answer: "Nuestras piezas están elaboradas con piedras semipreciosas naturales (cuarzo, ágata, amatista, jade, ojo de tigre, entre otras), perlas cultivadas de agua dulce y herrajes con baño de oro de 18k. Cada material es seleccionado a mano para garantizar calidad y autenticidad."
            },
            {
                question: "¿Cómo debo cuidar mis joyas?",
                answer: "Recomendamos evitar el contacto con perfumes, cremas y agua. Guarda tus piezas en un lugar seco, de preferencia en la caja o bolsa que incluimos. Para limpiarlas, usa un paño suave y seco. Con estos cuidados, el baño de oro y las piedras conservarán su brillo por mucho más tiempo."
            },
            {
                question: "¿Puedo personalizar una pieza o pedir un diseño especial?",
                answer: "Sí, ofrecemos servicio de personalización. Puedes elegir combinaciones de piedras, largos específicos o solicitar un diseño a medida. Escríbenos a hola@puntogemanova.com con tu idea y te enviaremos una cotización."
            },
            {
                question: "¿Las piedras naturales pueden variar de color?",
                answer: "Sí, y eso es parte de su belleza. Al ser piedras naturales, cada una tiene tonalidades, vetas e inclusiones únicas. Ninguna pieza es idéntica a otra, lo que hace que tu joya sea verdaderamente irrepetible."
            }
        ]
    },
    {
        category: "Envíos y Pedidos",
        items: [
            {
                question: "¿Cuánto cuesta el envío?",
                answer: "El envío estándar tiene un costo fijo de $150 MXN a todo México. En compras superiores a $1,300 MXN el envío es completamente GRATIS."
            },
            {
                question: "¿Cuánto tarda en llegar mi pedido?",
                answer: "Los pedidos se procesan en 24-48 horas. El tiempo de entrega estándar es de 3 a 5 días hábiles. En zonas extendidas puede tomar hasta 7 días hábiles."
            },
            {
                question: "¿Hacen envíos internacionales?",
                answer: "Por el momento solo realizamos envíos dentro de la República Mexicana. Estamos trabajando para habilitar envíos a USA y Latinoamérica próximamente."
            }
        ]
    },
    {
        category: "Devoluciones y Garantía",
        items: [
            {
                question: "¿Cuál es su política de devoluciones?",
                answer: "Tienes 30 días naturales a partir de la recepción de tu pedido para solicitar un cambio o devolución. La pieza debe estar en su empaque original, sin uso y en perfectas condiciones. Las piezas personalizadas o hechas a medida no aplican para devolución."
            },
            {
                question: "¿Qué hago si mi pieza llega dañada?",
                answer: "Contáctanos en un plazo de 48 horas a hola@puntogemanova.com con fotos del daño y tu número de pedido. Nos haremos cargo del envío de reposición sin costo alguno."
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
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">Preguntas Frecuentes</h1>
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        Resolvemos tus dudas sobre nuestras joyas, materiales, envíos y más. Si no encuentras lo que buscas, escríbenos a hola@puntogemanova.com y con gusto te ayudamos.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-4xl py-16 space-y-16">
                {FAQS.map((category, catIdx) => (
                    <section key={catIdx}>
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-8 pb-2 border-b border-gray-100">
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
                                            <span className="font-medium text-[#1a1a1a] text-lg pr-8">{item.question}</span>
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
