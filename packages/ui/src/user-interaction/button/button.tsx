"use client";
import React from "react";

// 1. Interfaz de Props: Omitimos 'ref' (manejado por forwardRef) y las props nativas
//    MÁS COMUNES ('className', 'onClick', 'disabled', 'type') para que no sean heredadas
//    automáticamente, y así podamos declararlas explícitamente y priorizarlas.
interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "ref" | "className" | "onClick" | "disabled" | "type"
> {
  // --- PROPS PERSONALIZADAS (Máxima Prioridad) ---
  children?: React.ReactNode;
  variant?: "default" | "danger" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  // --- PROPS NATIVAS COMUNES RE-DECLARADAS (Alta Prioridad) ---
  // Al declararlas aquí, aparecen justo después de las personalizadas en el autocompletado.
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer";

const VARIANT_STYLES = {
  default:
    "bg-gs-primary-light dark:bg-gs-primary-dark text-gs-text-dark dark:text-gs-text-light hover:opacity-90",
  danger:
    "bg-red-600 dark:bg-red-700 text-gs-text-light hover:bg-red-700 dark:hover:bg-red-800 focus-visible:ring-red-200 dark:focus-visible:ring-red-800",
  outline:
    "flex justify-center items-baseline border dark:hover:bg-gs-primary-dark border-gs-primary-light rounded-lg px-2 py-1 w-fit hover:bg-gs-primary-medium hover:text-whit",
  secondary:
    "bg-gs-surface-medium dark:bg-gs-tonal-dark text-gs-text-dark dark:text-gs-text-light hover:bg-gs-tonal-medium dark:hover:bg-gs-tonal-medium",
  ghost:
    "hover:bg-gs-surface-medium dark:hover:bg-gs-tonal-dark text-gs-text-dark dark:text-gs-text-light border border-gs-surface-medium dark:border-gs-tonal-dark",
  link: "text-gs-primary-light dark:text-gs-primary-dark underline-offset-4 hover:underline",
} as const;

const SIZE_STYLES = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9 rounded-md",
} as const;

// 2. Usar React.forwardRef para recibir el ref como segundo argumento.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children = "Button",
      variant = "default",
      size = "default",
      className = "",
      icon,
      iconPosition = "left",
      disabled,
      onClick,
      // Todas las demás props nativas (id, role, aria-label, etc.) se recolectan aquí
      ...props
    },
    // El 'ref' se recibe automáticamente aquí
    ref
  ) => {
    const buttonClassName = React.useMemo(() => {
      return `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`.trim();
    }, [variant, size, className]);

    const renderIcon = (iconContent: React.ReactNode) => {
      if (typeof iconContent === "string") {
        return (
          <img
            src={iconContent}
            alt=""
            className="size-4 object-contain"
            aria-hidden="true"
          />
        );
      }
      return iconContent;
    };

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={buttonClassName}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {icon && iconPosition === "left" && renderIcon(icon)}
        {children}
        {icon && iconPosition === "right" && renderIcon(icon)}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
