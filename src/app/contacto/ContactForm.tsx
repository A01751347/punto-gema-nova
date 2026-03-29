'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For now, just succeed. We will hook up real email later if needed.
        setStatus('success');
    }

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-2xl">
                    ✓
                </div>
                <h3 className="text-xl font-serif text-green-800 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-green-700/80">
                    Gracias por escribirnos. Nuestro equipo te responderá a la brevedad posible.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-green-600 font-bold hover:underline"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#1a1a1a] focus:bg-white transition-colors placeholder:text-gray-300"
                        placeholder="Tu nombre"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#1a1a1a] focus:bg-white transition-colors placeholder:text-gray-300"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="subject" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Asunto</label>
                <select
                    id="subject"
                    name="subject"
                    className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#1a1a1a] focus:bg-white transition-colors text-gray-700"
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
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 focus:outline-none focus:border-[#1a1a1a] focus:bg-white transition-colors placeholder:text-gray-300 resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                ></textarea>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full md:w-auto px-10 py-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
            </div>
        </form>
    );
}
