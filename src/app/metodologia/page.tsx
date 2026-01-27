import type { Metadata } from 'next';
import { FlaskConical, ClipboardCheck, Users, Leaf } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Nuestra Metodología | Yutnüu',
    description: 'Cómo formulamos, probamos y garantizamos la calidad de nuestros productos.',
};

export default function MethodologyPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#f4f4f0] py-16 md:py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <FlaskConical className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2c4a52] mb-6">Metodología de Formulación</h1>
                    <p className="text-lg text-gray-600 font-light">
                        En la intersección de la tradición herbolaria y la química clínica moderna.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-16 space-y-20">

                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                        <div className="text-[#d4af37] font-bold text-6xl opacity-20 mb-[-20px] ml-[-10px]">01</div>
                        <h2 className="text-2xl font-serif text-[#2c4a52] mb-4">Selección de Bio-Activos</h2>
                        <p className="text-gray-600 leading-relaxed">
                            No seguimos tendencias. Seleccionamos ingredientes basándonos en su <strong>peso molecular</strong> y su capacidad de penetración en la dermis. Priorizamos extractos endémicos mexicanos como la Tuna y el Agave, pero solo cuando estudios clínicos demuestran su eficacia superior a los sintéticos convencionales.
                        </p>
                    </div>
                    <div className="md:w-1/2 bg-gray-50 h-64 rounded-2xl flex items-center justify-center">
                        <Leaf size={64} className="text-[#8c9e8e] opacity-50" />
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                    <div className="md:w-1/2">
                        <div className="text-[#d4af37] font-bold text-6xl opacity-20 mb-[-20px] ml-[-10px]">02</div>
                        <h2 className="text-2xl font-serif text-[#2c4a52] mb-4">Estabilidad y Preservación</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Nuestro reto más grande es crear fórmulas naturales que no se echen a perder en una semana. Utilizamos un sistema de conservación de amplio espectro aceptado por ECOCERT, que protege contra bacterias y hongos sin alterar el microbioma de tu piel. Realizamos pruebas de "challenge test" rigurosas.
                        </p>
                    </div>
                    <div className="md:w-1/2 bg-gray-50 h-64 rounded-2xl flex items-center justify-center">
                        <ClipboardCheck size={64} className="text-[#8c9e8e] opacity-50" />
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                        <div className="text-[#d4af37] font-bold text-6xl opacity-20 mb-[-20px] ml-[-10px]">03</div>
                        <h2 className="text-2xl font-serif text-[#2c4a52] mb-4">Pruebas Dermatológicas</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Antes de que un producto toque tu piel, ha sido probado en laboratorio y en paneles de voluntarios humanos (nunca animales). Medimos parámetros como la hidratación transepidérmica (TEWL) y la respuesta irritativa para garantizar seguridad total.
                        </p>
                    </div>
                    <div className="md:w-1/2 bg-gray-50 h-64 rounded-2xl flex items-center justify-center">
                        <Users size={64} className="text-[#8c9e8e] opacity-50" />
                    </div>
                </div>

                <div className="bg-[#2c4a52] text-white p-10 rounded-3xl text-center mt-12">
                    <h3 className="text-2xl font-serif mb-4">Nuestro Compromiso Clean Beauty</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-light opacity-90">
                        <span>🚫 Sin Parabenos</span>
                        <span>🚫 Sin Fragancias Sintéticas</span>
                        <span>🚫 Sin Siliconas</span>
                        <span>🚫 Sin Aceites Minerales</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
