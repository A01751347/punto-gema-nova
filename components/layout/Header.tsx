'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart/CartContext';

import SearchOverlay from '@/components/layout/SearchOverlay';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems, toggleCart } = useCart();
    const pathname = usePathname();

    const navigation = [
        { name: 'Tienda', href: '/tienda' },
        { name: 'Colecciones', href: '/colecciones' },
        { name: 'Materiales', href: '/materiales' },
        { name: 'Blog', href: '/blog' },
        { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    ];

    const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

    return (
        <header className="sticky top-0 z-40 bg-white shadow-sm">
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-primary tracking-wide">PUNTO GEMA NOVA</div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${isActive(item.href)
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-secondary hover:text-primary'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search Icon */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-text-secondary hover:text-primary transition-colors"
                            aria-label="Buscar"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        {/* User Account */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="p-2 text-text-secondary hover:text-primary transition-colors"
                                    aria-label="Mi cuenta"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </button>

                                {/* User Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-soft-lg py-2 animate-fade-in">
                                        <Link
                                            href="/cuenta"
                                            className="block px-4 py-2 text-sm text-text-primary hover:bg-cream-light"
                                        >
                                            Mi Cuenta
                                        </Link>
                                        <Link
                                            href="/cuenta/pedidos"
                                            className="block px-4 py-2 text-sm text-text-primary hover:bg-cream-light"
                                        >
                                            Mis Pedidos
                                        </Link>
                                        {user?.role === 'ADMIN' && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-2 text-sm text-text-primary hover:bg-cream-light"
                                            >
                                                Admin
                                            </Link>
                                        )}
                                        <hr className="my-2" />
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-cream-light"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="p-2 text-text-secondary hover:text-primary transition-colors"
                                aria-label="Iniciar sesión"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </Link>
                        )}


                        {/* Cart */}
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-text-secondary hover:text-primary transition-colors"
                            aria-label="Carrito"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            {/* Cart count badge */}
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
                            aria-label="Menú"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down bg-white absolute w-full left-0 px-4 shadow-lg top-20">
                        <nav className="flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-base font-medium transition-colors ${isActive(item.href)
                                        ? 'text-primary'
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
            </div>

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </header>
    );
}
