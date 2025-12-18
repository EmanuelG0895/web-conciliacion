export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  // Opciones del select
  options: SelectOption[];
  
  // Props básicas
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  
  // Estilos y variantes
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  fullWidth?: boolean;
  className?: string;
  
  // Label y validación
  label?: string;
  error?: string;
  helperText?: string;
  
  // Eventos
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  
  // React Hook Form
  field?: {
    name: string;
    value?: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    ref: React.Ref<HTMLSelectElement>;
  };
}