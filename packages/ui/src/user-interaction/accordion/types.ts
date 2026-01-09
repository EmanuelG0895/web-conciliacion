import * as Accordion from '@radix-ui/react-accordion';
export interface AccordionItemProps extends Accordion.AccordionItemProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionTriggerProps extends Accordion.AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionContentProps extends Accordion.AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionRootProps extends Accordion.AccordionSingleProps {
  className?: string;
}