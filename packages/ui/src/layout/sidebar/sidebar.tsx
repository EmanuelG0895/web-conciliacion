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
  const { isOpen } = useSidebar();

  return (
    <div className={`${isOpen ? "hidden" : "flex"} absolute bg-gray-950`}>
      abierto
    </div>
  );
}
