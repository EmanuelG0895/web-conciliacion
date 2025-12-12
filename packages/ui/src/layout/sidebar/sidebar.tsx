"use client";
import type React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@repo/providers";

interface SidebarLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  title?: string;
}

export function Sidebar({ links, title = "Menu" }: SidebarProps) {
  const { isOpen, closeSidebar } = useSidebar();
  const sidebarPositionClass = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 
        w-64 bg-gray-950 text-white shadow-xl 
        transform transition-transform duration-300 ease-in-out
        ${sidebarPositionClass}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold">{title}</h2>
        {/* Botón de cerrar, usando setIsOpen */}
        <button
          className="text-gray-400 hover:text-white cursor-pointer"
          onClick={() => {
            closeSidebar();
            console.log("click");
          }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center p-2 rounded-lg text-sm font-medium hover:bg-gray-800"
            // Puedes añadir onClick aquí para cerrar la barra lateral al hacer clic en un enlace
          >
            {link.icon && <span className="mr-3">{link.icon}</span>}
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
