'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface CartItem {
    id: string; // Product ID
    name: string;
    price: number;
    image?: string;
    quantity: number;
    slug: string; // For linking back to product
    size?: string;
}

interface CartContextType {
    items: CartItem[];
    isCartOpen: boolean;
    subtotal: number;
    totalItems: number;
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from Local Storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('pgn_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from local storage', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to Local Storage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('pgn_cart', JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addItem = useCallback((newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((i) => i.id === newItem.id);

            const quantityToAdd = newItem.quantity || 1;

            if (existingItemIndex > -1) {
                // Update existing item correctly (immutable)
                const updatedItems = [...prevItems];
                const existingItem = updatedItems[existingItemIndex];

                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + quantityToAdd
                };

                return updatedItems;
            } else {
                // Add new item
                return [...prevItems, { ...newItem, quantity: quantityToAdd }];
            }
        });
        setIsCartOpen(true); // Auto open cart on add
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const value = React.useMemo(() => ({
        items,
        isCartOpen,
        subtotal,
        totalItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
    }), [items, isCartOpen, subtotal, totalItems, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
