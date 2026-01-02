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

export type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogOverlayProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
};