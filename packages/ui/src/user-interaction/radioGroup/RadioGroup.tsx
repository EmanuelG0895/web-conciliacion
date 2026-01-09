import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CustomRadioGroupProps } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Radio({
  id,
  label,
  value,
  description,
  disabled,
  name,
  selectedValue,
  onChange,
  className,
}: Readonly<CustomRadioGroupProps>) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div key={id} className="flex flex-row items-center gap-2">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={selectedValue === value}
          disabled={disabled}
          onChange={() => onChange?.(value)}
          className={cn(
            // Círculo exterior
            "appearance-none w-5 h-5 border-2 border-gray-600 rounded-full",
            "grid place-content-center cursor-pointer",
            "checked:border-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed",
            // Punto interno (Sin transición)
            "before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:bg-transparent",
            "checked:before:bg-yellow-400"
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer select-none text-gray-700",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default Radio;
