"use client";
import { LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { AvatarRoot, AvatarImage, AvatarFallback } from "../avatar";

interface ProfileProps {
  readonly userName: string;
  readonly showUserMenu: boolean;
  readonly image_profile: string | React.ReactNode;
  readonly image_alt?: string;
}

export default function Profile({
  userName = "User",
  showUserMenu = true,
  image_profile,
  image_alt,
}: ProfileProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      {showUserMenu && (
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold hover:opacity-90 transition-opacity"
          >
            {typeof image_profile === "string" && image_profile ? (
              <AvatarRoot>
                <AvatarImage
                  alt={
                    userName ? `${userName}'s profile image` : "profile image"
                  }
                  src={image_profile}
                />
                <AvatarFallback>JD</AvatarFallback>
              </AvatarRoot>
            ) : (
              image_profile
            )}
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gs-surface-light dark:bg-gs-surface-dark border border-border rounded-lg shadow-lg py-1">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-semibold text-foreground">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground">
                  user@example.com
                </p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
