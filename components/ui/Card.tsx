import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export default function Card({
    children,
    className = '',
    hover = false,
    padding = 'md',
    onClick,
}: CardProps) {
    const baseStyles = 'bg-white rounded-lg shadow-soft overflow-hidden';
    const hoverStyles = hover ? 'hover:shadow-soft-lg transition-shadow duration-300 cursor-pointer' : '';

    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
