'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownMenuRootProps extends DropdownMenu.DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps
  extends DropdownMenu.DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

interface DropdownMenuContentProps
  extends DropdownMenu.DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuItemProps extends DropdownMenu.DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

interface DropdownMenuCheckboxItemProps
  extends DropdownMenu.DropdownMenuCheckboxItemProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuRadioItemProps
  extends DropdownMenu.DropdownMenuRadioItemProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuLabelProps extends DropdownMenu.DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

interface DropdownMenuSeparatorProps
  extends DropdownMenu.DropdownMenuSeparatorProps {
  className?: string;
}

interface DropdownMenuSubTriggerProps
  extends DropdownMenu.DropdownMenuSubTriggerProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

interface DropdownMenuSubContentProps
  extends DropdownMenu.DropdownMenuSubContentProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = ({
  children,
  ...props
}) => <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>;

DropdownMenuRoot.displayName = 'DropdownMenuRoot';

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ children, className, asChild = false, ...props }, forwardedRef) => (
  <DropdownMenu.Trigger
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
  </DropdownMenu.Trigger>
));

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuPortal: React.FC<DropdownMenu.DropdownMenuPortalProps> = (
  props,
) => <DropdownMenu.Portal {...props} />;

DropdownMenuPortal.displayName = 'DropdownMenuPortal';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ children, className, sideOffset = 4, ...props }, forwardedRef) => (
  <DropdownMenuPortal>
    <DropdownMenu.Content
      ref={forwardedRef}
      sideOffset={sideOffset}
      className={clsx(
        'z-50 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Content>
  </DropdownMenuPortal>
));

DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ children, className, inset, ...props }, forwardedRef) => (
  <DropdownMenu.Item
    ref={forwardedRef}
    className={clsx(
      'relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none',
      'focus:bg-gray-100 focus:text-gray-900',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
  </DropdownMenu.Item>
));

DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ children, className, ...props }, forwardedRef) => (
  <DropdownMenu.CheckboxItem
    ref={forwardedRef}
    className={clsx(
      'relative flex cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none',
      'focus:bg-gray-100 focus:text-gray-900',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenu.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenu.ItemIndicator>
    </span>
    {children}
  </DropdownMenu.CheckboxItem>
));

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>(({ children, className, ...props }, forwardedRef) => (
  <DropdownMenu.RadioItem
    ref={forwardedRef}
    className={clsx(
      'relative flex cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none',
      'focus:bg-gray-100 focus:text-gray-900',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenu.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </DropdownMenu.ItemIndicator>
    </span>
    {children}
  </DropdownMenu.RadioItem>
));

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(({ children, className, inset, ...props }, forwardedRef) => (
  <DropdownMenu.Label
    ref={forwardedRef}
    className={clsx(
      'px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
  </DropdownMenu.Label>
));

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenu.Separator
    ref={forwardedRef}
    className={clsx('my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
    {...props}
  />
));

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={clsx(
      'ml-auto text-xs tracking-widest text-gray-500 dark:text-gray-400',
      className,
    )}
    {...props}
  />
);

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

const DropdownMenuGroup: React.FC<DropdownMenu.DropdownMenuGroupProps> = (
  props,
) => <DropdownMenu.Group {...props} />;

DropdownMenuGroup.displayName = 'DropdownMenuGroup';

const DropdownMenuSub: React.FC<DropdownMenu.DropdownMenuSubProps> = (
  props,
) => <DropdownMenu.Sub {...props} />;

DropdownMenuSub.displayName = 'DropdownMenuSub';

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ children, className, inset, ...props }, forwardedRef) => (
  <DropdownMenu.SubTrigger
    ref={forwardedRef}
    className={clsx(
      'flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none',
      'focus:bg-gray-100 focus:text-gray-900',
      'data-[state=open]:bg-gray-100',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100 dark:data-[state=open]:bg-gray-700',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenu.SubTrigger>
));

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <DropdownMenu.SubContent
    ref={forwardedRef}
    className={clsx(
      'z-50 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      'dark:border-gray-700 dark:bg-gray-800',
      className,
    )}
    {...props}
  >
    {children}
  </DropdownMenu.SubContent>
));

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

const DropdownMenuRadioGroup: React.FC<
  DropdownMenu.DropdownMenuRadioGroupProps
> = (props) => <DropdownMenu.RadioGroup {...props} />;

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

export {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
