"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { JSX } from "react";

export function Card({
  className,
  textButton,
  title,
  children,
  image,
  href = "",
  onClick,
}: {
  readonly className?: string;
  readonly textButton?: string;
  readonly image?: string | React.ReactNode;
  readonly title: string;
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

  const baseClasses = `${className} p-3  border-default bg-gs-gray-light block rounded-lg border text-black shadow-lg transition-shadow hover:shadow-2xl dark:bg-gray-900 dark:text-white`;

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
      <div className="text-black dark:text-white">{children}</div>
      {textButton && (
        <a
          href={href}
          className="flex items-center border border-black rounded-lg px-2 py-1 w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          {textButton}
          <ArrowRightIcon className="ml-3"/>
        </a>
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
