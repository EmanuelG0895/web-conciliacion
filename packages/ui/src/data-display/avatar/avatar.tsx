'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import * as Avatar from '@radix-ui/react-avatar';

interface AvatarRootProps extends Avatar.AvatarProps {
  children: React.ReactNode;
  className?: string;
}

interface AvatarImageProps extends Avatar.AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface AvatarFallbackProps extends Avatar.AvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Avatar.Root
      ref={forwardedRef}
      className={clsx(
        'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full align-middle select-none',
        'bg-gray-100 dark:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </Avatar.Root>
  ),
);

AvatarRoot.displayName = 'AvatarRoot';

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, forwardedRef) => (
    <Avatar.Image
      ref={forwardedRef}
      src={src}
      alt={alt}
      className={clsx(
        'h-full w-full rounded-[inherit] object-cover',
        className,
      )}
      {...props}
    />
  ),
);

AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ children, className, delayMs = 600, ...props }, forwardedRef) => (
    <Avatar.Fallback
      ref={forwardedRef}
      delayMs={delayMs}
      className={clsx(
        'flex h-full w-full items-center justify-center rounded-[inherit] bg-gray-200 text-sm font-medium text-gray-900',
        'dark:bg-gray-700 dark:text-gray-100',
        className,
      )}
      {...props}
    >
      {children}
    </Avatar.Fallback>
  ),
);

AvatarFallback.displayName = 'AvatarFallback';

export { AvatarRoot, AvatarImage, AvatarFallback };
