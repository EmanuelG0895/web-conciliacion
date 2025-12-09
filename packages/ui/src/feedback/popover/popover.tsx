'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';

interface PopoverRootProps extends Popover.PopoverProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps extends Popover.PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

interface PopoverContentProps extends Popover.PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  showClose?: boolean;
}

const PopoverRoot: React.FC<PopoverRootProps> = ({ children, ...props }) => (
  <Popover.Root {...props}>{children}</Popover.Root>
);

PopoverRoot.displayName = 'PopoverRoot';

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, asChild = false, ...props }, forwardedRef) => (
    <Popover.Trigger
      ref={forwardedRef}
      asChild={asChild}
      className={clsx(
        !asChild &&
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:hover:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </Popover.Trigger>
  ),
);

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      children,
      className,
      showArrow = true,
      showClose = true,
      sideOffset = 4,
      ...props
    },
    forwardedRef,
  ) => (
    <Popover.Portal>
      <Popover.Content
        ref={forwardedRef}
        sideOffset={sideOffset}
        className={clsx(
          'z-50 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <Popover.Close
            className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <Cross2Icon className="h-4 w-4" />
          </Popover.Close>
        )}
        {showArrow && (
          <Popover.Arrow className="fill-white dark:fill-gray-800" />
        )}
      </Popover.Content>
    </Popover.Portal>
  ),
);

PopoverContent.displayName = 'PopoverContent';

const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  Popover.PopoverCloseProps
>(({ children, className, ...props }, forwardedRef) => (
  <Popover.Close
    ref={forwardedRef}
    className={clsx(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:hover:bg-gray-700',
      className,
    )}
    {...props}
  >
    {children}
  </Popover.Close>
));

PopoverClose.displayName = 'PopoverClose';

export { PopoverRoot, PopoverTrigger, PopoverContent, PopoverClose };
