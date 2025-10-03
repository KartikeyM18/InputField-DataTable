import React, { useState } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number';
  showClearButton?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  id,
  name,
  required = false,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasError = invalid || !!errorMessage;

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'h-8 text-sm px-2.5',
    md: 'h-10 text-base px-3',
    lg: 'h-12 text-lg px-4',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Variant classes
  const variantClasses = {
    filled: clsx(
      'bg-gray-100 dark:bg-gray-800 border-b-2',
      hasError
        ? 'border-red-500 dark:border-red-400'
        : isFocused
        ? 'border-blue-500 dark:border-blue-400'
        : 'border-gray-300 dark:border-gray-600',
      'focus:bg-gray-50 dark:focus:bg-gray-750'
    ),
    outlined: clsx(
      'bg-transparent border-2 rounded-lg',
      hasError
        ? 'border-red-500 dark:border-red-400'
        : isFocused
        ? 'border-blue-500 dark:border-blue-400'
        : 'border-gray-300 dark:border-gray-600',
      'focus:border-blue-500 dark:focus:border-blue-400'
    ),
    ghost: clsx(
      'bg-transparent border-b-2 rounded-none',
      hasError
        ? 'border-red-500 dark:border-red-400'
        : isFocused
        ? 'border-blue-500 dark:border-blue-400'
        : 'border-gray-300 dark:border-gray-600'
    ),
  };

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'block font-medium mb-1.5 text-gray-700 dark:text-gray-300',
            labelSizeClasses[size],
            disabled && 'opacity-50'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={clsx(
            'w-full transition-all duration-200 outline-none',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            sizeClasses[size],
            variantClasses[variant],
            disabled && 'opacity-50 cursor-not-allowed',
            loading && 'pr-10',
            (showClearButton && value) || isPassword ? 'pr-10' : '',
            (showClearButton && value && isPassword) ? 'pr-20' : ''
          )}
        />

        {/* Icons container */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && (
            <Loader2
              className="animate-spin text-gray-400 dark:text-gray-500"
              size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
            />
          )}

          {!loading && showClearButton && value && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear input"
            >
              <X size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
            </button>
          )}

          {!loading && isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
              ) : (
                <Eye size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Helper text or error message */}
      {(hasError || helperText) && (
        <div
          id={hasError ? `${inputId}-error` : `${inputId}-helper`}
          className={clsx(
            'mt-1.5 text-xs',
            hasError
              ? 'text-red-500 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {hasError ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

export default InputField;