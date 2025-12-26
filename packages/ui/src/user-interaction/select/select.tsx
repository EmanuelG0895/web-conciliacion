"use client";

import React, { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import type { SelectProps } from "./types";

const sizeClasses = {
  sm: "h-8 px-2 py-1 text-sm",
  md: "h-9 px-3 py-2 text-base",
  lg: "h-10 px-4 py-3 text-lg",
};

const variantClasses = {
  default: `border border-gs-gray-medium 
    bg-gs-surface-light text-gs-black
    dark:border-gs-gray-dark dark:bg-gs-surface-dark dark:text-gs-surface-light
    focus:border-gs-yellow dark:focus:border-gs-yellow-dark
    hover:border-gs-gray-dark dark:hover:border-gs-gray-light`,
  outlined: `border-2 border-gs-gray-medium 
    bg-transparent text-gs-black
    dark:border-gs-gray-medium dark:text-gs-surface-light
    focus:border-gs-yellow dark:focus:border-gs-yellow-dark
    hover:border-gs-gray-dark dark:hover:border-gs-gray-light`,
  filled: `border-b-2 border-gs-gray-light 
    bg-gs-gray-light text-gs-black
    dark:bg-gs-surface-dark dark:border-gs-gray-medium dark:text-gs-surface-light
    focus:border-gs-yellow dark:focus:border-gs-yellow-dark
    hover:border-gs-gray-dark dark:hover:border-gs-gray-light`,
};

const CustomSelect = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      name,
      placeholder = "Seleccionar...",
      value,
      defaultValue,
      disabled = false,
      required = false,
      size = "md",
      variant = "default",
      fullWidth = false,
      className = "",
      label,
      error,
      helperText,
      onValueChange,
      onOpenChange,
      field,
      ...props
    },
    ref
  ) => {
    // Si se pasa field (React Hook Form), usamos esos valores
    const finalValue = field?.value ?? value;
    const finalOnChange = field?.onChange ?? onValueChange;
    const finalName = field?.name ?? name;

    const baseClasses = `
    inline-flex items-center justify-between rounded-md transition-all duration-200 outline-none
    placeholder:text-gs-text-dark dark:placeholder:text-gs-gray-light
    disabled:cursor-not-allowed disabled:opacity-50 
  `;

    const combinedClassName = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : "w-max"}
    ${error ? "border-red-500 dark:border-red-400" : ""}
    ${className}
  `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block text-sm font-medium text-gs-black dark:text-gs-surface-light mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <Select.Root
          value={finalValue}
          defaultValue={defaultValue}
          onValueChange={finalOnChange}
          onOpenChange={onOpenChange}
          disabled={disabled}
          required={required}
          name={finalName}
          {...props}
        >
          <Select.Trigger
            ref={ref}
            className={combinedClassName}
            aria-invalid={!!error}
          >
            <Select.Value placeholder={placeholder} />
            <Select.Icon asChild>
              <ChevronDownIcon className="h-4 w-4" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className={`
              overflow-hidden rounded-md border border-gs-gray-medium
              bg-gs-surface-light dark:bg-gs-surface-dark
              shadow-lg z-50 
              min-w-(--radix-select-trigger-width)
              max-h-[300px]
            `}
              position="popper"
              sideOffset={4}
            >
              <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-gs-surface-light dark:bg-gs-surface-dark text-gs-gray-medium">
                <ChevronDownIcon className="h-3 w-3 rotate-180" />
              </Select.ScrollUpButton>

              <Select.Viewport className="p-1">
                {options.map((option) => (
                  <SelectItem
                    className="hover:bg-gs-surface-medium dark:bg-gs-surface-dark"
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select.Viewport>

              <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-gs-surface-light dark:bg-gs-surface-dark text-gs-gray-medium">
                <ChevronDownIcon className="h-3 w-3" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {(error || helperText) && (
          <p
            className={`text-xs mt-1 ${
              error
                ? "text-red-500 dark:text-red-400"
                : "text-gs-gray-medium dark:text-gs-gray-light"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

const SelectItem = forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ className = "", children, ...props }, ref) => (
  <Select.Item
    ref={ref}
    className={`
      relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none
      focus:bg-gs-gray-light dark:focus:bg-gs-gray-medium
      focus:text-gs-black dark:focus:text-gs-text-light
      data-disabled:pointer-events-none data-disabled:opacity-50
      hover:bg-gs-gray-light dark:hover:bg-gs-surface-medium
      transition-colors
      ${className}
    `}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Select.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </Select.ItemIndicator>
    </span>
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
));

CustomSelect.displayName = "Select";
SelectItem.displayName = "SelectItem";

export default CustomSelect;
export { SelectItem };
