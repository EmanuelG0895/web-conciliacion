"use client";
import React, { createContext, useContext } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import Input from "../input/input";
import Button from "../button/button";
import CustomSelect from "../select/select";
import { Upload, X } from "lucide-react";
import type {
  FormContextType,
  FormProps,
  FormFieldProps,
  FormSelectProps,
  FormCheckboxProps,
  FormRadioProps,
  FormFileUploadProps,
  FormActionsProps,
  FormSubmitButtonProps,
  FormCancelButtonProps,
  FormSectionProps,
} from "./types";

// Form Context
const FormContext = createContext<FormContextType>({});

// Base Form Component
function Form<T extends Record<string, unknown>>({
  onSubmit,
  defaultValues,
  mode = "onChange",
  loading = false,
  disabled = false,
  className,
  children,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    mode,
  });

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={{ loading, disabled }}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className={className}
        >
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
}

// Form Field Component
function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled,
  className,
  size,
  variant,
  fullWidth = true,
  min,
  max,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { disabled: formDisabled } = useContext(FormContext);

  const error = errors[name]?.message as string;
  const isDisabled = disabled || formDisabled;

  return (
    <Input
      {...register(name, {
        required: required ? "Este campo es requerido" : false,
      })}
      type={type}
      label={label}
      placeholder={placeholder}
      error={error}
      disabled={isDisabled}
      className={className}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      min={min}
      max={max}
    />
  );
}

// Form Select Component
function FormSelect({
  name,
  label,
  options,
  placeholder = "Seleccionar...",
  required = false,
  disabled,
  className,
  size = "md",
  variant = "default",
  fullWidth = false,
  helperText,
}: FormSelectProps) {
  const { control } = useFormContext();
  const { disabled: formDisabled } = useContext(FormContext);

  const isDisabled = disabled || formDisabled;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Este campo es requerido" : false,
      }}
      render={({ field, fieldState: { error } }) => (
        <CustomSelect
          options={options}
          placeholder={placeholder}
          label={label}
          required={required}
          disabled={isDisabled}
          className={className}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          helperText={helperText}
          field={field}
          error={error?.message}
        />
      )}
    />
  );
}

// Form Checkbox Component
function FormCheckbox({
  name,
  label,
  value,
  required = false,
  disabled,
  className,
}: FormCheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { disabled: formDisabled } = useContext(FormContext);

  const error = errors[name]?.message as string;
  const isDisabled = disabled || formDisabled;

  return (
    <div className={`flex items-center ${className || ""}`}>
      <input
        {...register(name, {
          required: required ? "Este campo es requerido" : false,
        })}
        type="checkbox"
        value={value}
        disabled={isDisabled}
        className="
          w-4 h-4 text-gs-yellow bg-gray-100 border-gray-300 rounded
          focus:ring-gs-yellow dark:focus:ring-gs-yellow-dark
          dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <label className="ml-2 text-sm font-medium text-gs-black dark:text-gs-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs ml-2">{error}</p>
      )}
    </div>
  );
}

// Form Radio Group Component
function FormRadioGroup({
  name,
  label,
  options,
  required = false,
  disabled,
  className,
}: FormRadioProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { disabled: formDisabled } = useContext(FormContext);

  const error = errors[name]?.message as string;
  const isDisabled = disabled || formDisabled;

  return (
    <div className={className}>
      <fieldset>
        <legend className="text-sm font-medium text-gs-black dark:text-gs-white mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                {...register(name, {
                  required: required ? "Este campo es requerido" : false,
                })}
                type="radio"
                value={option.value}
                disabled={isDisabled}
                className="
                  w-4 h-4 text-gs-yellow bg-gray-100 border-gray-300
                  focus:ring-gs-yellow dark:focus:ring-gs-yellow-dark
                  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              />
              <label className="ml-2 text-sm font-medium text-gs-black dark:text-gs-white">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

// Form File Upload Component
function FormFileUpload({
  name,
  label,
  accept,
  multiple = false,
  maxSize,
  required = false,
  disabled,
  className,
}: FormFileUploadProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { disabled: formDisabled } = useContext(FormContext);

  const error = errors[name]?.message as string;
  const isDisabled = disabled || formDisabled;
  const files = watch(name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (maxSize) {
      const oversizedFiles = selectedFiles.filter(
        (file) => file.size > maxSize
      );
      if (oversizedFiles.length > 0) {
        alert(
          `Algunos archivos exceden el tamaño máximo de ${maxSize / 1024 / 1024}MB`
        );
        return;
      }
    }

    setValue(name, multiple ? selectedFiles : selectedFiles[0]);
  };

  const removeFile = (index: number) => {
    if (multiple && Array.isArray(files)) {
      const newFiles = files.filter((_, i) => i !== index);
      setValue(name, newFiles);
    } else {
      setValue(name, null);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gs-black dark:text-gs-white mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <label className="cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Haz clic para subir {multiple ? "archivos" : "archivo"} o arrastra
            aquí
          </span>
          <input
            {...register(name, {
              required: required ? "Este campo es requerido" : false,
            })}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={isDisabled}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* File Preview */}
      {files && (
        <div className="mt-2 space-y-2">
          {multiple && Array.isArray(files)
            ? files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            : !Array.isArray(files) &&
              files && (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {files.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(0)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
        </div>
      )}

      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

// Form Actions Component
function FormActions({
  children,
  className,
  align = "right",
}: FormActionsProps) {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={`flex gap-3 mt-6 ${alignClasses[align]} ${className || ""}`}
    >
      {children}
    </div>
  );
}

// Form Submit Button Component
function FormSubmitButton({
  children,
  variant = "default",
  size = "default",
  className,
  disabled,
}: FormSubmitButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const { loading, disabled: formDisabled } = useContext(FormContext);

  const isDisabled = disabled || formDisabled || isSubmitting || loading;

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={className}
    >
      {isSubmitting || loading ? "Enviando..." : children}
    </Button>
  );
}

// Form Cancel Button Component
function FormCancelButton({
  children,
  onClick,
  variant = "outline",
  size = "default",
  className,
}: FormCancelButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
}

// Form Section Component
function FormSection({ title, children, className }: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      {title && (
        <h3 className="text-lg font-medium text-gs-black dark:text-gs-white border-b border-gray-200 dark:border-gray-700 pb-2">
          {title}
        </h3>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Attach subcomponents to main Form component
Form.Field = FormField;
Form.Select = FormSelect;
Form.Checkbox = FormCheckbox;
Form.RadioGroup = FormRadioGroup;
Form.FileUpload = FormFileUpload;
Form.Actions = FormActions;
Form.SubmitButton = FormSubmitButton;
Form.CancelButton = FormCancelButton;
Form.Section = FormSection;

export default Form;
export {
  FormField,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormFileUpload,
  FormActions,
  FormSubmitButton,
  FormCancelButton,
  FormSection,
};
