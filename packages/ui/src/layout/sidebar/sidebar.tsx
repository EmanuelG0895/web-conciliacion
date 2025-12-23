"use client";
import type React from "react";
import {
  Home,
  MonitorCog,
  Shield,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import { useSidebar } from "@repo/providers";

interface SidebarLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  //links: SidebarLink[];
  title?: string;
}

export function Sidebar({ title = "Grupo Salinas" }: SidebarProps) {
  const { isOpen, toggleSidebar } = useSidebar();
  const sidebarLinks: SidebarLink[] = [
    {
      label: "Inicio",
      href: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Seguros",
      href: "/seguros",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      label: "Back Office",
      href: "/backoffice",
      icon: <MonitorCog className="w-5 h-5" />,
    },
  ];

  const sidebarWidthClass = isOpen
    ? "translate-x-0 w-64"
    : "-translate-x-full md:translate-x-0 md:w-20";

  return (
    <div
      className={`
        fixed md:relative h-dvh md:min-h-[calc(100vh-64px)] md:flex md:flex-col inset-y-0 left-0 z-50 shadow-xl border-r border-gs-primary-light dark:border-gs-primary-dark shadow-gs-primary-light dark:shadow-gs-primary-dark bg-gs-surface-light dark:bg-gs-surface-dark transition-[width,transform] duration-500 ease-in-out
        ${sidebarWidthClass}
      `}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-gs-primary-light dark:border-gs-primary-dark overflow-hidden shrink-0">
        <div
          className={`flex items-center w-full ${isOpen ? "justify-between" : "justify-center"}`}
        >
          {/* Título animado: Cambiado 'hidden md:flex' por animación de max-width */}
          <h2
            className={`
              text-xl font-bold truncate text-gs-text-dark dark:text-gs-text-light
              transition-[max-width,opacity] duration-500 ease-in-out
              ${isOpen ? "max-w-[180px] opacity-100 mr-2" : "max-w-0 opacity-0 mr-0"}
            `}
          >
            {title}
          </h2>

          <button
            className="p-1 rounded-lg hover:bg-gs-surface-medium dark:hover:bg-gs-tonal-dark transition-colors shrink-0 text-gs-text-dark dark:text-gs-text-light"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <SidebarClose className="w-6 h-6" />
            ) : (
              <SidebarOpen className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-2 space-y-2 overflow-x-hidden overflow-y-auto flex-1">
        {sidebarLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`
              flex items-center p-3 rounded-xl text-sm font-medium 
              text-gs-text-dark dark:text-gs-text-light
              hover:bg-gs-surface-medium dark:hover:bg-gs-tonal-dark
              hover:text-gs-text-dark dark:hover:text-gs-text-light
              transition-all duration-500 group
              ${!isOpen ? "justify-center" : ""}
            `}
            title={!isOpen ? link.label : ""}
          >
            {/* Contenedor del Icono */}
            <div
              className={`shrink-0 transition-all duration-500 ${isOpen ? "mr-3" : "mr-0"}`}
            >
              {link.icon}
            </div>

            {/* Texto animado */}
            <span
              className={`
                whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-500 ease-in-out
                ${isOpen ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"}
              `}
            >
              {link.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
