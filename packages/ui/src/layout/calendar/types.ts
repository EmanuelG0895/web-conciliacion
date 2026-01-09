import React from "react";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // --- Tus propiedades personalizadas ---
  readonly label?: string;
  readonly minDate?: string | Date;
  readonly maxDate?: string | Date;
  
  // Agregamos esta para poder pintar el input de rojo si hay error
  readonly error?: string; 

  // --- Propiedades requeridas por React Hook Form y HTML ---
  
  // 'name' es opcional en HTML, pero si quieres forzarlo obligatorio quítale el ?
  readonly name?: string; 
  
  // Es vital aceptar string, number o array para compatibilidad total, 
  // aunque usualmente usarás string en fechas.
  readonly value?: string | number | readonly string[]; 

  // React Hook Form necesita 'onBlur' para saber cuando el usuario deja el campo (validación onTouch)
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  
  // El evento de cambio estándar
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;

  // Estilos y estados
  readonly required?: boolean;
  readonly disabled?: boolean; // Importante para heredar del FormContext
  readonly className?: string;
}