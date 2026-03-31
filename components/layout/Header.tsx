'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart/CartContext';

import SearchOverlay from '@/components/layout/SearchOverlay';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems, toggleCart } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Tienda', href: '/tienda' },
        { name: 'Colecciones', href: '/colecciones' },
        { name: 'Materiales', href: '/materiales' },
        { name: 'Blog', href: '/blog' },
        { name: 'Nosotros', href: '/sobre-nosotros' },
    ];

    const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

    const isHome = pathname === '/';
    const isTransparent = isHome && !scrolled;

    return (
        <header
            className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm'
                    : isHome
                        ? 'bg-transparent text-white'
                        : 'bg-white'
                }`}
        >  {/* Top bar */}
            <div className={`hidden md:block text-center py-1.5 ${isTransparent ? 'bg-white/10 backdrop-blur-sm text-white' : 'bg-primary text-white'}`}>
                <p className="text-xs tracking-[0.2em] uppercase">Envio gratis en compras +$1,300 MXN</p>
            </div>

            <div className="container mx-auto">
                {/* Main header row */}
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left: Mobile menu + Search */}
                    <div className="flex items-center gap-2 w-1/3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-primary hover:text-accent transition-colors"
                            aria-label="Menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`hidden md:block p-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-primary'}`}
                            aria-label="Buscar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="flex flex-col items-center group w-1/3">
                        <span className={`font-serif text-2xl md:text-3xl tracking-[0.15em] transition-colors ${isTransparent ? 'text-white' : 'text-primary'}`}>
                            PUNTO GEMA
                        </span>
                        <span className={`text-[10px] md:text-xs tracking-[0.35em] uppercase -mt-0.5 transition-colors ${isTransparent ? 'text-white/70' : 'text-text-secondary'}`}>
                            nova
                        </span>
                    </Link>

                    {/* Right: Icons */}
                    <div className="flex items-center justify-end gap-3 w-1/3">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`md:hidden p-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-primary'}`}
                            aria-label="Buscar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`p-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-primary'}`}
                                    aria-label="Mi cuenta"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-sm shadow-soft-lg py-1 animate-fade-in">
                                        <Link href="/cuenta" className="block px-4 py-2.5 text-sm text-text-primary hover:bg-cream">
                                            Mi Cuenta
                                        </Link>
                                        <Link href="/cuenta/pedidos" className="block px-4 py-2.5 text-sm text-text-primary hover:bg-cream">
                                            Mis Pedidos
                                        </Link>
                                        {user?.role === 'ADMIN' && (
                                            <Link href="/admin" className="block px-4 py-2.5 text-sm text-text-primary hover:bg-cream">
                                                Admin
                                            </Link>
                                        )}
                                        <hr className="my-1 border-gray-100" />
                                        <button
                                            onClick={() => { logout(); setIsUserMenuOpen(false); }}
                                            className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-cream"
                                        >
                                            Cerrar Sesion
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className={`p-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-primary'}`} aria-label="Iniciar sesion">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        )}

                        <button
                            onClick={toggleCart}
                            className={`relative p-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-primary'}`}
                            aria-label="Carrito"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-medium rounded-full w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation — below logo */}
                <nav className="hidden md:flex items-center justify-center gap-10 pb-3 -mt-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-[13px] tracking-[0.12em] uppercase transition-colors pb-0.5 ${isActive(item.href)
                                ? isTransparent ? 'text-white border-b border-white' : 'text-primary border-b border-primary'
                                : isTransparent ? 'text-white/70 hover:text-white' : 'text-text-secondary hover:text-primary'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in">
                    <nav className="container mx-auto py-6 flex flex-col gap-5">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm tracking-[0.1em] uppercase transition-colors ${isActive(item.href)
                                    ? 'text-primary font-medium'
                                    : 'text-text-secondary hover:text-primary'
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </header>
    );
}
