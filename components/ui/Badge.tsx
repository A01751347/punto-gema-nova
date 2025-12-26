import React, { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'info' | 'accent';
    size?: 'sm' | 'md';
    className?: string;
}

export default function Badge({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}: BadgeProps) {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';

    const variantStyles = {
        default: 'bg-cream text-text-primary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        info: 'bg-info/10 text-info',
        accent: 'bg-accent-botanical/10 text-accent-botanical',
    };

    const sizeStyles = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
            {children}
        </span>
    );
}
