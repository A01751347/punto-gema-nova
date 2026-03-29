import type { Metadata } from 'next';
import { RefreshCw, ShieldCheck, AlertCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Devoluciones | Punto Gema Nova',
    description: 'Política de devoluciones y garantía de nuestras piezas de joyería artesanal.',
};

export default function ReturnsPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#f8f9fa] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <RefreshCw className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">Devoluciones y Garantía</h1>
                    <p className="text-lg text-gray-600 font-light">
                        Tu satisfacción y la calidad de cada pieza son nuestra prioridad absoluta.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-16 space-y-16">

                {/* Intro */}
                <section>
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6">Garantía de Satisfacción</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        En Punto Gema Nova elaboramos cada pieza con los más altos estándares de calidad artesanal. Utilizamos piedras semipreciosas, perlas, baño de oro de 18k y plata .925. Si por alguna razón no estás completamente satisfecha(o) con tu joya, queremos solucionarlo.
                    </p>
                    <div className="flex items-center gap-4 bg-green-50 p-6 rounded-xl border border-green-100 text-green-800">
                        <ShieldCheck size={32} className="flex-shrink-0" />
                        <p className="font-medium">
                            Tienes <strong>30 días naturales</strong> a partir de la fecha de entrega para solicitar un cambio o devolución.
                        </p>
                    </div>
                </section>

                {/* Conditions */}
                <section>
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6">Condiciones para Devolución</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">1</div>
                            <p className="text-gray-600">
                                <strong>Pieza Defectuosa:</strong> Si tu joya presenta una piedra suelta, broche o cierre dañado, u otro defecto de fabricación, te la repondremos sin costo alguno.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">2</div>
                            <p className="text-gray-600">
                                <strong>Producto Dañado en Envío:</strong> Si recibiste tu pieza rota o dañada durante el transporte, envíanos evidencia fotográfica y te enviaremos un reemplazo de inmediato.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">3</div>
                            <p className="text-gray-600">
                                <strong>Cambio de Opinión:</strong> Si la pieza está en su empaque original sin usar, puedes devolverla. En este caso, el costo del envío de retorno corre por cuenta del cliente ($120 MXN).
                            </p>
                        </li>
                    </ul>
                </section>

                {/* Process */}
                <section>
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6">¿Cómo iniciar el proceso?</h2>
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <ol className="space-y-8 relative border-l border-gray-100 ml-3">
                            <li className="pl-8 relative">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#d4af37] ring-4 ring-white" />
                                <h4 className="font-bold text-[#1a1a1a] mb-2">1. Escríbenos</h4>
                                <p className="text-sm text-gray-600">
                                    Envía un correo a <a href="mailto:ayuda@puntogemanova.com" className="text-[#d4af37] underline">ayuda@puntogemanova.com</a> con tu número de orden (#1234) en el asunto.
                                </p>
                            </li>
                            <li className="pl-8 relative">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white" />
                                <h4 className="font-bold text-[#1a1a1a] mb-2">2. Evidencia</h4>
                                <p className="text-sm text-gray-600">
                                    Adjunta fotos de la pieza (especialmente si presenta algún defecto o daño) y una breve explicación de la razón de la devolución.
                                </p>
                            </li>
                            <li className="pl-8 relative">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white" />
                                <h4 className="font-bold text-[#1a1a1a] mb-2">3. Solución</h4>
                                <p className="text-sm text-gray-600">
                                    Nuestro equipo te responderá en máximo 24 horas hábiles con una guía de retorno o la confirmación de tu reemplazo/reembolso.
                                </p>
                            </li>
                        </ol>
                    </div>
                </section>

                {/* Warning */}
                <div className="flex gap-4 p-4 bg-orange-50 border-l-4 border-orange-300 text-orange-800 text-sm">
                    <AlertCircle className="flex-shrink-0" size={20} />
                    <p>
                        Las piezas personalizadas o hechas a medida (grabados, diseños especiales) no son elegibles para devolución, salvo que presenten un defecto de fabricación comprobable.
                    </p>
                </div>

            </div>
        </main>
    );
}
