'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';

interface DialogRootProps extends Dialog.DialogProps {
  children: React.ReactNode;
}

interface DialogTriggerProps extends Dialog.DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

interface DialogContentProps extends Dialog.DialogContentProps {
  children: React.ReactNode;
  className?: string;
  showClose?: boolean;
}

interface DialogOverlayProps extends Dialog.DialogOverlayProps {
  className?: string;
}

interface DialogTitleProps extends Dialog.DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps extends Dialog.DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogRoot: React.FC<DialogRootProps> = ({ children, ...props }) => (
  <Dialog.Root {...props}>{children}</Dialog.Root>
);

DialogRoot.displayName = 'DialogRoot';

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, className, asChild = false, ...props }, forwardedRef) => (
    <Dialog.Trigger
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
    </Dialog.Trigger>
  ),
);

DialogTrigger.displayName = 'DialogTrigger';

const DialogPortal: React.FC<Dialog.DialogPortalProps> = (props) => (
  <Dialog.Portal {...props} />
);

DialogPortal.displayName = 'DialogPortal';

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, forwardedRef) => (
    <Dialog.Overlay
      ref={forwardedRef}
      className={clsx(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  ),
);

DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, showClose = true, ...props }, forwardedRef) => (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Content
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
        {showClose && (
          <Dialog.Close
            className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none dark:ring-offset-gray-800"
            aria-label="Close"
          >
            <Cross2Icon className="h-4 w-4" />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = 'DialogContent';

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);

DialogHeader.displayName = 'DialogHeader';

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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

DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Dialog.Title
      ref={forwardedRef}
      className={clsx(
        'text-lg leading-none font-semibold tracking-tight text-gray-900 dark:text-gray-100',
        className,
      )}
      {...props}
    >
      {children}
    </Dialog.Title>
  ),
);

DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className, ...props }, forwardedRef) => (
  <Dialog.Description
    ref={forwardedRef}
    className={clsx('text-sm text-gray-600 dark:text-gray-400', className)}
    {...props}
  >
    {children}
  </Dialog.Description>
));

DialogDescription.displayName = 'DialogDescription';

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  Dialog.DialogCloseProps
>(({ children, className, ...props }, forwardedRef) => (
  <Dialog.Close
    ref={forwardedRef}
    className={clsx(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:hover:bg-gray-700',
      className,
    )}
    {...props}
  >
    {children}
  </Dialog.Close>
));

DialogClose.displayName = 'DialogClose';

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
