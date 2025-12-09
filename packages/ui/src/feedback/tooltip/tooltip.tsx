'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TooltipProviderProps extends Tooltip.TooltipProviderProps {
  children: React.ReactNode;
}

interface TooltipRootProps extends Tooltip.TooltipProps {
  children: React.ReactNode;
}

interface TooltipTriggerProps extends Tooltip.TooltipTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

interface TooltipContentProps extends Tooltip.TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 200,
  ...props
}) => (
  <Tooltip.Provider delayDuration={delayDuration} {...props}>
    {children}
  </Tooltip.Provider>
);

TooltipProvider.displayName = 'TooltipProvider';

const TooltipRoot: React.FC<TooltipRootProps> = ({ children, ...props }) => (
  <Tooltip.Root {...props}>{children}</Tooltip.Root>
);

TooltipRoot.displayName = 'TooltipRoot';

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ children, className, asChild = false, ...props }, forwardedRef) => (
    <Tooltip.Trigger
      ref={forwardedRef}
      asChild={asChild}
      className={className}
      {...props}
    >
      {children}
    </Tooltip.Trigger>
  ),
);

TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipPortal: React.FC<Tooltip.TooltipPortalProps> = (props) => (
  <Tooltip.Portal {...props} />
);

TooltipPortal.displayName = 'TooltipPortal';

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    { children, className, showArrow = true, sideOffset = 4, ...props },
    forwardedRef,
  ) => (
    <TooltipPortal>
      <Tooltip.Content
        ref={forwardedRef}
        sideOffset={sideOffset}
        className={clsx(
          'z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'dark:bg-gray-50 dark:text-gray-900',
          className,
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-50" />
        )}
      </Tooltip.Content>
    </TooltipPortal>
  ),
);

TooltipContent.displayName = 'TooltipContent';

export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
};
