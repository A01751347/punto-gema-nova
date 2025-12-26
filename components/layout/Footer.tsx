'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState('');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubscribing(true);
        setSubscribeMessage('');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubscribeMessage('¡Gracias por suscribirte!');
                setEmail('');
            } else {
                setSubscribeMessage('Error al suscribirse. Intenta de nuevo.');
            }
        } catch (error) {
            setSubscribeMessage('Error al suscribirse. Intenta de nuevo.');
        } finally {
            setIsSubscribing(false);
        }
    };

    const footerLinks = {
        tienda: [
            { name: 'Todos los Productos', href: '/tienda' },
            { name: 'Hidratación', href: '/tienda?category=hidratacion' },
            { name: 'Anti-Edad', href: '/tienda?category=anti-edad' },
            { name: 'Manchas', href: '/tienda?category=manchas' },
            { name: 'Acné', href: '/tienda?category=acne' },
        ],
        ayuda: [
            { name: 'Preguntas Frecuentes', href: '/ciencia/faq' },
            { name: 'Envíos', href: '/envios' },
            { name: 'Devoluciones', href: '/devoluciones' },
            { name: 'Contacto', href: '/contacto' },
            { name: 'Política de Privacidad', href: '/privacidad' },
        ],
        ciencia: [
            { name: 'Ingredientes', href: '/ciencia/ingredientes' },
            { name: 'Referencias', href: '/ciencia/referencias' },
            { name: 'Metodología', href: '/ciencia/metodologia' },
            { name: 'Blog', href: '/blog' },
        ],
    };

    return (
        <footer className="bg-cream-light border-t border-cream">
            <div className="container mx-auto py-12">
                {/* Newsletter Section */}
                <div className="mb-12 text-center mt-8">
                    <h3 className="text-2xl font-semibold text-text-primary mb-2">
                        Recibe rutinas y lanzamientos
                    </h3>
                    <p className="text-text-secondary mb-6">
                        Suscríbete a nuestro newsletter y obtén contenido exclusivo
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button type="submit" isLoading={isSubscribing}>
                            Suscribirse
                        </Button>
                    </form>
                    {subscribeMessage && (
                        <p className="mt-2 text-sm text-primary">{subscribeMessage}</p>
                    )}
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div>
                        <h4 className="text-2xl font-bold text-primary mb-4">YUTNÜÜ</h4>
                        <p className="text-sm text-text-secondary mb-4">
                            Cosmética natural con respaldo científico. Transparencia, trazabilidad y resultados medibles.
                        </p>
                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Tienda */}
                    <div>
                        <h5 className="font-semibold text-text-primary mb-4">Tienda</h5>
                        <ul className="space-y-2">
                            {footerLinks.tienda.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ayuda */}
                    <div>
                        <h5 className="font-semibold text-text-primary mb-4">Ayuda</h5>
                        <ul className="space-y-2">
                            {footerLinks.ayuda.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ciencia */}
                    <div>
                        <h5 className="font-semibold text-text-primary mb-4">Ciencia</h5>
                        <ul className="space-y-2">
                            {footerLinks.ciencia.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center items-center gap-8 mb-8 py-8 border-y border-cream">
                    <div className="flex items-center space-x-2 text-text-secondary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">Envío Gratis +$500</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm">Pago Seguro</span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        <span className="text-sm">Devoluciones 30 días</span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="text-center text-sm text-text-secondary">
                    <p>&copy; {new Date().getFullYear()} YUTNÜÜ. Todos los derechos reservados.</p>
                    <p className="mt-2">Hecho en México con ingredientes naturales y respaldo científico.</p>
                </div>
            </div>
        </footer>
    );
}
