"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../../user-interaction";

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
    <nav className="sticky top-0 z-50 bg-gs-surface-light dark:bg-gs-surface-dark border-b border-gs-primary-light dark:border-gs-primary-dark shadow-sm shadow-gs-primary-light dark:shadow-gs-primary-dark">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center justify-between gap-3 text-2xl font-bold text-gs-text-dark dark:text-gs-text-light">
            <span className="md:hidden">{logo}</span>
            <a href="/">{logoText}</a>
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">{children}</div>
            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gs-surface-medium dark:bg-gs-tonal-dark hover:bg-gs-tonal-medium dark:hover:bg-gs-tonal-medium transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gs-text-dark dark:text-gs-text-light" />
              ) : (
                <Menu className="w-5 h-5 text-gs-text-dark dark:text-gs-text-light" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gs-primary-light dark:border-gs-primary-dark py-4">
            {children}
          </div>
        )}
      </div>
    </nav>
  );
}
