'use client';

import React from 'react';
import CustomSelect from './select';
import type { SelectProps } from './types';

export interface UseSelectControllerProps extends SelectProps {
  control?: any; // De react-hook-form
  name: string;
  rules?: any; // Reglas de validación de react-hook-form
}

/**
 * Hook para usar el componente Select con React Hook Forms
 * Utiliza el patrón Controller de react-hook-form
 */
export const useSelectController = () => {
  const SelectController = React.forwardRef<HTMLButtonElement, UseSelectControllerProps>(
    ({ control, name, rules, ...props }, ref) => {
      // Si no hay react-hook-form disponible, usar el componente normal
      if (typeof window !== 'undefined' && !control) {
        return <CustomSelect ref={ref} {...props} />;
      }

      // Importación dinámica para evitar errores si react-hook-form no está instalado
      const [Controller, setController] = React.useState<any>(null);

      React.useEffect(() => {
        const loadController = async () => {
          try {
            const rhf = await import('react-hook-form');
            setController(() => rhf.Controller);
          } catch (error) {
            console.warn('React Hook Form no está disponible. Usando componente Select básico.');
          }
        };

        if (control) {
          loadController();
        }
      }, [control]);

      if (control && Controller) {
        return (
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }: any) => (
              <CustomSelect
                ref={ref}
                {...props}
                field={field}
                error={error?.message}
              />
            )}
          />
        );
      }

      return <CustomSelect ref={ref} {...props} />;
    }
  );

  SelectController.displayName = 'SelectController';

  return SelectController;
};

export default useSelectController;