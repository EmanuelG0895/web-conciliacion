"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  readonly logo?: React.ReactElement | string;
  readonly logoText?: string;
  readonly links?: NavLink[];
  readonly showUserMenu?: boolean;
  readonly userName?: string;
  readonly children: React.ReactElement;
}

export function Navbar({ logo = "", logoText = "GS", children }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">{logo}</div>
          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">{children}</div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            {children}
          </div>
        )}
      </div>
    </nav>
  );
}
