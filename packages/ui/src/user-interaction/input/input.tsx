"use client";
import { InputHTMLAttributes } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  readonly label?: string;
  readonly error?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "default" | "outlined" | "filled";
  readonly fullWidth?: boolean;
  readonly disabled?: boolean;
  readonly placeholder?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  default: `border border-[var(--color-gs-gray-medium)] 
    bg-[var(--color-gs-white)] text-[var(--color-gs-black)]
    dark:border-[var(--color-gs-gray-dark)] dark:bg-[var(--color-gs-gray-dark)] dark:text-[var(--color-gs-white)]
    focus:border-[var(--color-gs-yellow)] dark:focus:border-[var(--color-gs-yellow-dark)]`,
  outlined: `border-2 border-[var(--color-gs-gray-medium)] 
    bg-transparent text-[var(--color-gs-black)]
    dark:border-[var(--color-gs-gray-medium)] dark:text-[var(--color-gs-white)]
    focus:border-[var(--color-gs-yellow)] dark:focus:border-[var(--color-gs-yellow-dark)]`,
  filled: `border-b-2 border-[var(--color-gs-gray-light)] 
    bg-[var(--color-gs-gray-light)] text-[var(--color-gs-black)]
    dark:bg-[var(--color-gs-gray-dark)] dark:border-[var(--color-gs-gray-medium)] dark:text-[var(--color-gs-white)]
    focus:border-[var(--color-gs-yellow)] dark:focus:border-[var(--color-gs-yellow-dark)]`,
};

export default function Input({
  label,
  error,
  size = "md",
  variant = "default",
  fullWidth = false,
  disabled = false,
  className,
  ...props
}: InputProps) {
  const baseClasses = `
    rounded-md transition-all duration-200 outline-none
    placeholder:text-[var(--color-gs-gray-medium)] dark:placeholder:text-[var(--color-gs-gray-light)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const widthClass = fullWidth ? "w-full" : "";
  const errorClass = error ? "border-red-500 dark:border-red-600" : "";

  const combinedClassName = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${widthClass}
    ${errorClass}
    ${className || ""}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block text-sm font-medium text-gs-black dark:text-gs-white mb-2">
          {label}
        </label>
      )}
      <input className={combinedClassName} disabled={disabled} {...props} />
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
