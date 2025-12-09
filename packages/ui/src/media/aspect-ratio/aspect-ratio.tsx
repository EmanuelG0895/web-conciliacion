'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface AspectRatioRootProps extends AspectRatio.AspectRatioProps {
  children: React.ReactNode;
  className?: string;
  ratio?: number;
}

const AspectRatioRoot = React.forwardRef<HTMLDivElement, AspectRatioRootProps>(
  ({ children, className, ratio = 16 / 9, ...props }, forwardedRef) => (
    <AspectRatio.Root
      ref={forwardedRef}
      ratio={ratio}
      className={clsx('overflow-hidden', className)}
      {...props}
    >
      {children}
    </AspectRatio.Root>
  ),
);

AspectRatioRoot.displayName = 'AspectRatioRoot';

export { AspectRatioRoot };
