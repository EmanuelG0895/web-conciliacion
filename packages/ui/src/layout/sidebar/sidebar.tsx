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
  console.log(isOpen);
  return (
    <>
      {isOpen ? (
        "abierto"
      ) : (
        <button className="bg-red-700" onClick={closeSidebar}>
          cerrar
        </button>
      )}
    </>
  );
}
