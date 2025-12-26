import { ReactNode } from "react";
import { SubmitHandler, DefaultValues } from "react-hook-form";
import type { SelectOption } from "../select/types";

export interface FormContextType {
  loading?: boolean;
  disabled?: boolean;
}

export interface FormProps<T extends Record<string, unknown>> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  mode?: "onChange" | "onBlur" | "onSubmit";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  fullWidth?: boolean;
  min?: string;
  max?: string;
}

export interface FormSelectProps {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  fullWidth?: boolean;
  helperText?: string;
}

export interface FormCheckboxProps {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormRadioProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormFileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormActionsProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export interface FormSubmitButtonProps {
  children: ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
}

export interface FormCancelButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}
