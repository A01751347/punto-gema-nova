import type { Metadata } from 'next';
import { Lock, Eye, FileText, Database } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Punto Gema Nova',
    description: 'Cómo protegemos y utilizamos tus datos personales.',
};

export default function PrivacyPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#f8f9fa] py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Lock className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-4">Política de Privacidad</h1>
                    <p className="text-gray-500 font-light text-sm">
                        Última actualización: 28 de Marzo de 2026
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-12 space-y-12 text-gray-700 leading-relaxed text-sm md:text-base">

                <section>
                    <p className="mb-6">
                        En <strong>Punto Gema Nova</strong>, respetamos profundamente tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas al utilizar nuestro sitio web <strong>www.puntogemanova.com</strong>.
                    </p>
                    <p>
                        Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Nos alineamos con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.
                    </p>
                </section>

                <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-[#1a1a1a] mb-4">
                        <Database size={20} /> 1. Información que recopilamos
                    </h2>
                    <p className="mb-4">Podemos recopilar los siguientes datos personales:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-600">
                        <li><strong>Datos de Identificación:</strong> Nombre completo.</li>
                        <li><strong>Datos de Contacto:</strong> Correo electrónico, número de teléfono, dirección de envío y facturación.</li>
                        <li><strong>Preferencias de Estilo (Opcional):</strong> Información que proporcionas voluntariamente en nuestro Quiz de Estilo (preferencias de materiales, ocasiones de uso, estilos favoritos) para recibir recomendaciones personalizadas de joyería.</li>
                        <li><strong>Datos Transaccionales:</strong> Historial de compras. <strong>Nota importante:</strong> Punto Gema Nova NO almacena datos bancarios completos. Los pagos son procesados de forma segura por Mercado Pago/Stripe.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-[#1a1a1a] mb-4">
                        <Eye size={20} /> 2. Uso de la información
                    </h2>
                    <p className="mb-4">Utilizamos tus datos exclusivamente para:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-600">
                        <li>Procesar y entregar tus pedidos.</li>
                        <li>Enviar notificaciones sobre el estado de tu compra.</li>
                        <li>Mejorar tu experiencia de usuario mediante personalización.</li>
                        <li>Enviar boletines informativos o promociones (solo si has dado tu consentimiento explícito). Puedes darte de baja en cualquier momento.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-[#1a1a1a] mb-4">
                        <Lock size={20} /> 3. Protección de Datos
                    </h2>
                    <p>
                        Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado. Utilizamos encriptación SSL (Secure Socket Layer) en todo nuestro sitio web para garantizar que la transmisión de datos sea segura.
                    </p>
                </section>

                <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-[#1a1a1a] mb-4">
                        <FileText size={20} /> 4. Cookies
                    </h2>
                    <p>
                        Utilizamos cookies propias y de terceros para mejorar la navegación, analizar el uso del sitio y personalizar el contenido. Puedes configurar tu navegador para rechazar las cookies, aunque esto podría limitar algunas funcionalidades de la tienda (como mantener productos en el carrito).
                    </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">Derechos ARCO</h3>
                    <p className="text-sm mb-4">
                        Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (ARCO) al tratamiento de tus datos personales.
                    </p>
                    <p className="text-sm">
                        Para ejercer estos derechos, envía una solicitud a nuestro Oficial de Privacidad en: <a href="mailto:privacidad@puntogemanova.com" className="text-[#d4af37] font-medium underline">privacidad@puntogemanova.com</a>.
                    </p>
                </section>

            </div>
        </main>
    );
}
