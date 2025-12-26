import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
        const baseStyles = 'px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200';
        const errorStyles = error ? 'border-error focus:ring-error' : 'border-gray-300';
        const widthStyle = fullWidth ? 'w-full' : '';

        return (
            <div className={`${fullWidth ? 'w-full' : ''}`}>
                {label && (
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`${baseStyles} ${errorStyles} ${widthStyle} ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-error">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-text-light">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
