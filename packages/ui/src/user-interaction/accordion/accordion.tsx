'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { AccordionContentProps, AccordionItemProps, AccordionRootProps, AccordionTriggerProps } from './types';

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Root
      className={clsx(
        'w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white',
        className,
      )}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </Accordion.Root>
  ),
);

AccordionRoot.displayName = 'AccordionRoot';

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={clsx(
        'border-b border-gray-200 last:border-b-0 dark:border-gray-700',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
);

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={clsx(
        'group flex flex-1 items-center justify-between px-5 py-4 text-left text-sm font-medium transition-all hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:bg-gray-700 dark:focus-visible:ring-blue-400',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-gray-400"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all dark:text-gray-300',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-5 pt-0 pb-4">{children}</div>
  </Accordion.Content>
));

AccordionContent.displayName = 'AccordionContent';

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
