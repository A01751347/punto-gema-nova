import type { Metadata } from 'next';
import { Truck, MapPin, Clock, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Envíos | Yutnüu',
    description: 'Información detallada sobre nuestros métodos de envío, tiempos de entrega y cobertura.',
};

export default function ShippingPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#f8f9fa] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Truck className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2c4a52] mb-6">Envíos y Entregas</h1>
                    <p className="text-lg text-gray-600 font-light">
                        Nos aseguramos de que tu experiencia Yutnüu sea perfecta desde el clic hasta tu puerta.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-16 space-y-12">

                {/* Coverage */}
                <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#2c4a52]/5 rounded-full text-[#2c4a52]">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-[#2c4a52] mb-3">Cobertura Nacional</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Realizamos envíos a <strong>todos los estados de la República Mexicana</strong>. Trabajamos con las paqueterías más confiables (FedEx, DHL, Estafeta) para asegurar que tu paquete llegue a tiempo y en perfectas condiciones.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                            *Para zonas extendidas o de difícil acceso, el tiempo de entrega podría variar.
                        </p>
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* Costs & Times */}
                <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#2c4a52]/5 rounded-full text-[#2c4a52]">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-[#2c4a52] mb-4">Costos y Tiempos</h3>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold text-[#2c4a52] block mb-1">Envío Estándar</span>
                                    <span className="text-sm text-gray-500">3 a 5 días hábiles</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-[#2c4a52] block">$150.00 MXN</span>
                                    <span className="text-xs text-[#d4af37] font-medium">Gratis en órdenes +$999</span>
                                </div>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold text-[#2c4a52] block mb-1">Envío Express</span>
                                    <span className="text-sm text-gray-500">1 a 2 días hábiles</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-[#2c4a52] block">$180.00 MXN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* International */}
                <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#2c4a52]/5 rounded-full text-[#2c4a52]">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-[#2c4a52] mb-3">Envíos Internacionales</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Actualmente nuestra tienda en línea solo procesa pedidos dentro de México. Sin embargo, si estás interesado en distribuir o comprar desde el extranjero (USA/Canadá), por favor contáctanos en <a href="mailto:hola@yutnuu.mx" className="text-[#d4af37] underline">hola@yutnuu.mx</a> para cotizar un envío especial.
                        </p>
                    </div>
                </div>

                {/* Packaging */}
                <div className="bg-[#f4f4f0] p-8 rounded-2xl mt-8">
                    <h3 className="font-bold text-[#2c4a52] mb-3">📦 Nuestro Empaque Sustentable</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        Tu pedido llegará en una caja de cartón reciclado certificado FSC, protegida con papel kraft en lugar de plástico de burbujas. Utilizamos cinta activada por agua y tintas a base de soya para minimizar nuestra huella de carbono. Por favor, recicla la caja al recibirla.
                    </p>
                </div>

            </div>
        </main>
    );
}
