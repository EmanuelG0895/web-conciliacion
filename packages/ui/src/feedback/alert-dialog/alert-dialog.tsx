'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface AlertDialogRootProps extends AlertDialog.AlertDialogProps {
  children: React.ReactNode;
}

interface AlertDialogTriggerProps extends AlertDialog.AlertDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

interface AlertDialogContentProps extends AlertDialog.AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogOverlayProps extends AlertDialog.AlertDialogOverlayProps {
  className?: string;
}

interface AlertDialogTitleProps extends AlertDialog.AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogDescriptionProps
  extends AlertDialog.AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogActionProps extends AlertDialog.AlertDialogActionProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogCancelProps extends AlertDialog.AlertDialogCancelProps {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogRoot: React.FC<AlertDialogRootProps> = ({
  children,
  ...props
}) => <AlertDialog.Root {...props}>{children}</AlertDialog.Root>;

AlertDialogRoot.displayName = 'AlertDialogRoot';

const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ children, className, asChild = false, ...props }, forwardedRef) => (
  <AlertDialog.Trigger
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
  </AlertDialog.Trigger>
));

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

const AlertDialogPortal: React.FC<AlertDialog.AlertDialogPortalProps> = (
  props,
) => <AlertDialog.Portal {...props} />;

AlertDialogPortal.displayName = 'AlertDialogPortal';

const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialogOverlayProps
>(({ className, ...props }, forwardedRef) => (
  <AlertDialog.Overlay
    ref={forwardedRef}
    className={clsx(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialog.Content
      ref={forwardedRef}
      className={clsx(
        'fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg duration-200',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </AlertDialog.Content>
  </AlertDialogPortal>
));

AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);

AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);

AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ children, className, ...props }, forwardedRef) => (
  <AlertDialog.Title
    ref={forwardedRef}
    className={clsx(
      'text-lg font-semibold text-gray-900 dark:text-gray-100',
      className,
    )}
    {...props}
  >
    {children}
  </AlertDialog.Title>
));

AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ children, className, ...props }, forwardedRef) => (
  <AlertDialog.Description
    ref={forwardedRef}
    className={clsx('text-sm text-gray-600 dark:text-gray-400', className)}
    {...props}
  >
    {children}
  </AlertDialog.Description>
));

AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ children, className, ...props }, forwardedRef) => (
  <AlertDialog.Action
    ref={forwardedRef}
    className={clsx(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
      'bg-red-600 text-white hover:bg-red-700',
      'focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none',
      'dark:bg-red-700 dark:hover:bg-red-800',
      className,
    )}
    {...props}
  >
    {children}
  </AlertDialog.Action>
));

AlertDialogAction.displayName = 'AlertDialogAction';

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ children, className, ...props }, forwardedRef) => (
  <AlertDialog.Cancel
    ref={forwardedRef}
    className={clsx(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
      'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
      'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      className,
    )}
    {...props}
  >
    {children}
  </AlertDialog.Cancel>
));

AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
