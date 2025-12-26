"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { JSX } from "react";
import Link from "next/link";

export function Card({
  className,
  textButton,
  title,
  children,
  image,
  href = "",
  link = false,
  onClick,
}: {
  readonly className?: string;
  readonly link?: boolean;
  readonly textButton?: string;
  readonly image?: string | React.ReactNode;
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
}): JSX.Element {
  const renderImage = () => {
    if (typeof image === "string") {
      return (
        <img
          className="rounded-md h-48 sm:h-64 w-full object-cover md:h-12 md:w-12 lg:w-48"
          src={image}
          alt={`Imagen para ${title}`}
        />
      );
    }
    return image;
  };

  // 1. Clases Base de la Tarjeta (Fondo, Borde, y Texto)
  const baseClasses = `${className} p-3 rounded-lg block shadow-lg transition-shadow hover:shadow-2xl 
    
    
    bg-gs-surface-medium /* ¡CAMBIO! Fondo de la tarjeta ahora usa blanco puro (#ffffff) */
    border-gs-surface-medium /* ¡CAMBIO! Borde: Usamos el gris sutil (#f0f0f0) */
    text-gs-text-dark /* Texto principal en negro */
    border-gs-text-dark border
    

    dark:bg-gs-surface-dark 
    dark:border-gs-surface-light 
    dark:text-gs-text-light 
  `;
  const btnClassName =
    "flex justify-center items-baseline border dark:hover:bg-gs-primary-dark border-gs-primary-light rounded-lg px-2 py-1 w-fit mt-3 hover:bg-gs-primary-medium hover:text-white";

  const content = (
    <div className="space-y-3 sm:space-y-5">
      {image && (
        <a className="flex flex-col items-center justify-center" href={href}>
          {renderImage()}
        </a>
      )}
      <h5
        className={`${
          image ? "mt-4 sm:mt-6" : ""
        } text-heading text-xl sm:text-2xl font-semibold tracking-tight`}
      >
        {title}
      </h5>

      {/* 2. Contenido (Hereda el color de texto base) */}
      <div>{children}</div>

      {/* 3. Botón de Enlace (Acento Primario) */}
      {textButton && !link && (
        <a
          href={href}
          className={btnClassName}
          onClick={(e) => e.stopPropagation()}
        >
          {textButton}
          <ArrowRightIcon className="ml-3" />
        </a>
      )}
      {link && (
        <Link href={href} className={btnClassName}>
          {textButton}
          <ArrowRightIcon className="ml-3" />
        </Link>
      )}
    </div>
  );

  // Si tiene onClick, usar button nativo
  if (onClick) {
    return (
      <button
        type="button"
        className={`${baseClasses} cursor-pointer text-left`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  // Sin onClick, usar div estático
  return <div className={baseClasses}>{content}</div>;
}
