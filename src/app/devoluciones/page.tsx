import type { Metadata } from 'next';
import { RefreshCw, ShieldCheck, AlertCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Devoluciones | Yutnüu',
    description: 'Garantía de satisfacción y proceso de devoluciones.',
};

export default function ReturnsPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#f8f9fa] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <RefreshCw className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2c4a52] mb-6">Devoluciones y Garantía</h1>
                    <p className="text-lg text-gray-600 font-light">
                        Tu satisfacción y la salud de tu piel son nuestra prioridad absoluta.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-16 space-y-16">

                {/* Intro */}
                <section>
                    <h2 className="text-2xl font-serif text-[#2c4a52] mb-6">Garantía de Satisfacción</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        En Yutnüu formulamos con los estándares más altos de calidad. Si por alguna razón no estás completamente enamorada(o) de tu producto, queremos solucionarlo.
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
                    <h2 className="text-2xl font-serif text-[#2c4a52] mb-6">Condiciones para Devolución</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">1</div>
                            <p className="text-gray-600">
                                <strong>Producto Dañado o Defectuoso:</strong> Si recibiste el producto roto, derramado o con algún defecto de fabricación, te lo repondremos inmediatamente sin costo alguno.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">2</div>
                            <p className="text-gray-600">
                                <strong>Reacción Adversa:</strong> Aunque nuestros productos son hipoalergénicos, cada piel es un mundo. Si experimentas alguna reacción, suspende su uso y contáctanos. Evaluaremos tu caso para un reembolso o cambio por una fórmula más suave.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">3</div>
                            <p className="text-gray-600">
                                <strong>Cambio de Opinión:</strong> Si el producto está 100% cerrado y sellado, puedes devolverlo. En este caso, el costo del envío de retorno corre por cuenta del cliente ($120 MXN).
                            </p>
                        </li>
                    </ul>
                </section>

                {/* Process */}
                <section>
                    <h2 className="text-2xl font-serif text-[#2c4a52] mb-6">¿Cómo iniciar el proceso?</h2>
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <ol className="space-y-8 relative border-l border-gray-100 ml-3">
                            <li className="pl-8 relative">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#d4af37] ring-4 ring-white" />
                                <h4 className="font-bold text-[#2c4a52] mb-2">1. Escríbenos</h4>
                                <p className="text-sm text-gray-600">
                                    Envía un correo a <a href="mailto:ayuda@yutnuu.mx" className="text-[#d4af37] underline">ayuda@yutnuu.mx</a> con tu número de orden (#1234) en el asunto.
                                </p>
                            </li>
                            <li className="pl-8 relative">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white" />
                                <h4 className="font-bold text-[#2c4a52] mb-2">2. Evidencia</h4>
                                <p className="text-sm text-gray-600">
                                    Adjunta fotos del producto (especialmente si llegó dañado) y una breve explicación de la razón de la devolución.
                                </p>
                            </li>
                            <li className="pl-8 relative">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white" />
                                <h4 className="font-bold text-[#2c4a52] mb-2">3. Solución</h4>
                                <p className="text-sm text-gray-600">
                                    Nuestro equipo te responderá en máximo 24 horas hábiles con una guía de retorno o la confirmación de tu reembolso.
                                </p>
                            </li>
                        </ol>
                    </div>
                </section>

                {/* Warning */}
                <div className="flex gap-4 p-4 bg-orange-50 border-l-4 border-orange-300 text-orange-800 text-sm">
                    <AlertCircle className="flex-shrink-0" size={20} />
                    <p>
                        Por razones de higiene y seguridad sanitaria, no podemos aceptar devoluciones de productos abiertos o usados, a menos que se trate de un defecto de calidad comprobable o reacción adversa reportada.
                    </p>
                </div>

            </div>
        </main>
    );
}
