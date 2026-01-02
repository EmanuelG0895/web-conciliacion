import { ReactNode } from "react";
import { SubmitHandler, DefaultValues } from "react-hook-form";
import type { SelectOption } from "../select/types";

export interface FormContextType {
  loading?: boolean;
  disabled?: boolean;
}

export interface FormProps<T extends Record<string, unknown>> {
  readonly onSubmit: SubmitHandler<T>;
  readonly defaultValues?: DefaultValues<T>;
  readonly mode?: "onChange" | "onBlur" | "onSubmit";
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export interface FormFieldProps {
  readonly name: string;
  readonly label?: string;
  readonly type?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "default" | "outlined" | "filled";
  readonly fullWidth?: boolean;
  readonly min?: string;
  readonly max?: string;
}

export interface FormSelectProps {
  readonly name: string;
  readonly label?: string;
  readonly options: SelectOption[];
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "default" | "outlined" | "filled";
  readonly fullWidth?: boolean;
  readonly helperText?: string;
}

export interface FormCheckboxProps {
  readonly name: string;
  readonly label: string;
  readonly value?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
}

export interface FormRadioProps {
  readonly name: string;
  readonly label: string;
  readonly options: Array<{ value: string; label: string }>;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
}

export interface FormFileUploadProps {
  readonly name: string;
  readonly label?: string;
  readonly accept?: string;
  readonly multiple?: boolean;
  readonly maxSize?: number; // in bytes
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
}

export interface FormActionsProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly align?: "left" | "center" | "right";
}

export interface FormSubmitButtonProps {
  readonly children: ReactNode;
  readonly variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger";
  readonly size?: "default" | "sm" | "lg" | "icon";
  readonly className?: string;
  readonly disabled?: boolean;
}

export interface FormCancelButtonProps {
  readonly children: ReactNode;
  readonly onClick: () => void;
  readonly variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger";
  readonly size?: "default" | "sm" | "lg" | "icon";
  readonly className?: string;
}

export interface FormSectionProps {
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
}
