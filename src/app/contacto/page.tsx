import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Contacto | YUTNÜÜ',
    description: 'Ponte en contacto con nuestro equipo. Atención al cliente, dudas sobre productos y ventas corporativas.',
};

export default function ContactPage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20">

            {/* Hero with Map/Texture background */}
            <section className="relative px-4 py-20 bg-[#2c4a52] text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Estamos para ti
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-[#d4af37] mb-6">
                        Conversemos
                    </h1>
                    <p className="text-lg text-white/80 font-light max-w-xl mx-auto leading-relaxed">
                        ¿Dudas sobre qué rutina es ideal para tí? ¿O simplemente quieres saludar?
                        Nuestro equipo de expertos está listo para escucharte.
                    </p>
                </div>
            </section>

            <section className="py-20 px-4 -mt-10 relative z-20 container mx-auto max-w-6xl">
                <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-gray-100">

                    {/* Contact Info Side */}
                    <div className="md:w-5/12 bg-cream-light p-10 md:p-14 border-r border-gray-100 relative overflow-hidden">
                        {/* Blob */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#2c4a52]/5 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 space-y-12 h-full flex flex-col justify-center">
                            <div>
                                <h3 className="text-xl font-serif text-[#2c4a52] mb-6">Canales Directos</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] transition-colors">
                                            ✉️
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</span>
                                            <a href="mailto:hola@yutnuu.mx" className="text-lg text-[#2c4a52] font-medium hover:text-[#d4af37] transition-colors">
                                                hola@yutnuu.mx
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] transition-colors">
                                            💬
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Whatsapp</span>
                                            <a href="https://wa.me/5211234567890" target="_blank" rel="noopener noreferrer" className="text-lg text-[#2c4a52] font-medium hover:text-[#d4af37] transition-colors">
                                                +52 (1) 123 456 7890
                                            </a>
                                            <p className="text-xs text-text-light mt-1">Lun - Vie, 9:00 - 18:00</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] transition-colors">
                                            📍
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Oficina Central</span>
                                            <p className="text-text-secondary leading-relaxed">
                                                Colonia Roma Norte,<br />
                                                Ciudad de México, CP 06700
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-200">
                                <h4 className="text-sm font-bold text-[#2c4a52] mb-4">Preguntas Frecuentes</h4>
                                <ul className="space-y-3 text-sm text-text-secondary">
                                    <li>
                                        <a href="#" className="hover:text-[#d4af37] transition-colors flex items-center gap-2">
                                            <span>→</span> ¿Tienen envíos internacionales?
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-[#d4af37] transition-colors flex items-center gap-2">
                                            <span>→</span> Política de devoluciones
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-7/12 p-10 md:p-14 bg-white">
                        <h3 className="text-2xl font-serif text-[#2c4a52] mb-2">Envíanos un mensaje</h3>
                        <p className="text-text-secondary font-light mb-8">Te responderemos en menos de 24 horas.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#2c4a52] focus:bg-white transition-colors placeholder:text-gray-300"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#2c4a52] focus:bg-white transition-colors placeholder:text-gray-300"
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="subject" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Asunto</label>
                                <select
                                    id="subject"
                                    className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#2c4a52] focus:bg-white transition-colors text-gray-700"
                                >
                                    <option>Información de Producto</option>
                                    <option>Mi Pedido</option>
                                    <option>Prensa / Colaboraciones</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#2c4a52] focus:bg-white transition-colors placeholder:text-gray-300 resize-none"
                                    placeholder="¿En qué podemos ayudarte?"
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button className="w-full md:w-auto px-10 py-3 shadow-lg hover:shadow-xl transition-all">
                                    Enviar Mensaje
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </main>
    );
}
