export interface CustomRadioGroupProps {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  id: string;
  name: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}
