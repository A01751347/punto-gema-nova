import type { Metadata } from 'next';
import { Truck, MapPin, Clock, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Envíos | Punto Gema Nova',
    description: 'Información sobre envíos, tiempos de entrega y cobertura de Punto Gema Nova. Envío gratis en compras mayores a $1,300 MXN.',
};

export default function ShippingPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#f8f9fa] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Truck className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">Envíos y Entregas</h1>
                    <p className="text-lg text-gray-600 font-light">
                        Nos aseguramos de que tu experiencia Punto Gema Nova sea perfecta desde el clic hasta tu puerta.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-16 space-y-12">

                {/* Coverage */}
                <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#1a1a1a]/5 rounded-full text-[#1a1a1a]">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-[#1a1a1a] mb-3">Cobertura Nacional</h3>
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
                    <div className="p-3 bg-[#1a1a1a]/5 rounded-full text-[#1a1a1a]">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-[#1a1a1a] mb-4">Costos y Tiempos</h3>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold text-[#1a1a1a] block mb-1">Envío Estándar</span>
                                    <span className="text-sm text-gray-500">3 a 5 días hábiles</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-[#1a1a1a] block">$150.00 MXN</span>
                                    <span className="text-xs text-[#d4af37] font-medium">Gratis en compras +$1,300 MXN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* International */}
                <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#1a1a1a]/5 rounded-full text-[#1a1a1a]">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-[#1a1a1a] mb-3">Envíos Internacionales</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Actualmente solo realizamos envíos dentro de México. Si te encuentras en el extranjero y estás interesada en alguna de nuestras piezas, contáctanos en <a href="mailto:hola@puntogemanova.com" className="text-[#d4af37] underline">hola@puntogemanova.com</a> y buscaremos la mejor opción para ti.
                        </p>
                    </div>
                </div>

                {/* Packaging */}
                <div className="bg-[#f4f4f0] p-8 rounded-2xl mt-8">
                    <h3 className="font-bold text-[#1a1a1a] mb-3">Nuestro Empaque</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        Cada pedido llega en una elegante caja de presentación con interior acolchado, ideal para regalo o para guardar tus joyas. Cuidamos cada detalle para que la experiencia de abrir tu paquete sea tan especial como la pieza que lleva dentro. Todas nuestras cajas incluyen una bolsa de terciopelo para proteger tu joya en el día a día.
                    </p>
                </div>

            </div>
        </main>
    );
}
