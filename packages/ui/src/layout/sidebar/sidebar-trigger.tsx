"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@repo/providers"

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      aria-label="Abrir menú"
    >
      menu
      <Menu className="w-5 h-5 text-foreground" />
    </button>
  );
}
