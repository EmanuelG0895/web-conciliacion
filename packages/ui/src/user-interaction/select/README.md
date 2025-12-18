# Componente Select

Un componente Select reutilizable y accesible construido con Radix UI, totalmente compatible con React Hook Forms y diseñado para seguir el sistema de diseño del proyecto.

## Características

- ✅ **Compatible con React Hook Forms**: Integración completa con `Controller` y soporte nativo
- ✅ **Accesible**: Construido sobre Radix UI con soporte completo para ARIA
- ✅ **Responsive**: Diseño adaptable que funciona en todos los dispositivos
- ✅ **Temático**: Soporte completo para modo oscuro/claro
- ✅ **Personalizable**: Múltiples variantes, tamaños y opciones de personalización
- ✅ **TypeScript**: Tipado completo con IntelliSense
- ✅ **Keyboard Navigation**: Navegación completa con teclado

## Instalación

Este componente ya está incluido en el paquete `@repo/ui`. Si necesitas instalarlo por separado:

```bash
pnpm add @radix-ui/react-select @radix-ui/react-icons
```

## Uso Básico

```tsx
import { Select, SelectOption } from '@repo/ui';

const options: SelectOption[] = [
  { value: 'option1', label: 'Opción 1' },
  { value: 'option2', label: 'Opción 2' },
  { value: 'option3', label: 'Opción 3', disabled: true },
];

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <Select
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Selecciona una opción"
      label="Mi Select"
    />
  );
}
```

## Uso con React Hook Forms (Recomendado)

### Método 1: Con Controller

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Select } from '@repo/ui';

interface FormData {
  country: string;
  status: string;
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        rules={{ required: 'País es obligatorio' }}
        render={({ field, fieldState: { error } }) => (
          <Select
            options={countryOptions}
            placeholder="Selecciona un país"
            label="País"
            field={field}
            error={error?.message}
            required
          />
        )}
      />
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Método 2: Con Hook Personalizado

```tsx
import { useForm } from 'react-hook-form';
import { useSelectController } from '@repo/ui';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const SelectController = useSelectController();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectController
        control={control}
        name="department"
        options={departmentOptions}
        placeholder="Selecciona departamento"
        label="Departamento"
        rules={{ required: 'Departamento es obligatorio' }}
      />
    </form>
  );
}
```

## API

### SelectProps

| Prop | Tipo | Descripción | Default |
|------|------|-------------|---------|
| `options` | `SelectOption[]` | Array de opciones | `[]` |
| `value` | `string` | Valor controlado | - |
| `defaultValue` | `string` | Valor por defecto | - |
| `placeholder` | `string` | Texto placeholder | `'Seleccionar...'` |
| `disabled` | `boolean` | Si está deshabilitado | `false` |
| `required` | `boolean` | Si es campo obligatorio | `false` |
| `size` | `'sm' \\| 'md' \\| 'lg'` | Tamaño del componente | `'md'` |
| `variant` | `'default' \\| 'outlined' \\| 'filled'` | Variante visual | `'default'` |
| `fullWidth` | `boolean` | Ocupa todo el ancho | `false` |
| `className` | `string` | Clases CSS adicionales | - |
| `label` | `string` | Etiqueta del campo | - |
| `error` | `string` | Mensaje de error | - |
| `helperText` | `string` | Texto de ayuda | - |
| `onValueChange` | `(value: string) => void` | Callback al cambiar valor | - |
| `onOpenChange` | `(open: boolean) => void` | Callback al abrir/cerrar | - |
| `field` | `ReactHookFormField` | Campo de React Hook Form | - |

### SelectOption

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Variantes

### Tamaños

- `sm`: Tamaño pequeño (32px altura)
- `md`: Tamaño mediano (36px altura) - **Default**
- `lg`: Tamaño grande (40px altura)

### Estilos

- `default`: Estilo por defecto con borde
- `outlined`: Borde más grueso
- `filled`: Fondo relleno

## Ejemplos Avanzados

### Select con Validación

```tsx
<Controller
  name="country"
  control={control}
  rules={{
    required: 'País es obligatorio',
    validate: (value) => value !== 'restricted' || 'País no disponible'
  }}
  render={({ field, fieldState: { error } }) => (
    <Select
      options={options}
      field={field}
      error={error?.message}
      label="País"
      required
    />
  )}
/>
```

### Select Condicional

```tsx
const departmentOptions = watchCountry === 'mx' 
  ? mexicanDepartments 
  : generalDepartments;

<Select
  options={departmentOptions}
  placeholder={
    watchCountry 
      ? "Selecciona departamento" 
      : "Primero selecciona un país"
  }
  disabled={!watchCountry}
  label="Departamento"
/>
```

### Select con Múltiples Grupos

```tsx
const groupedOptions: SelectOption[] = [
  { value: 'header1', label: '--- Países de América ---', disabled: true },
  { value: 'mx', label: 'México' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'header2', label: '--- Países de Europa ---', disabled: true },
  { value: 'es', label: 'España' },
  { value: 'fr', label: 'Francia' },
];
```

## Accesibilidad

- **ARIA**: Soporte completo para screen readers
- **Keyboard Navigation**: 
  - `Space/Enter`: Abrir/cerrar dropdown
  - `Arrow keys`: Navegar opciones
  - `Esc`: Cerrar dropdown
  - `Home/End`: Primer/última opción
- **Focus Management**: Manejo automático del foco
- **High Contrast**: Compatible con modo alto contraste

## Mejores Prácticas

1. **Siempre proporciona una etiqueta** para mejorar la accesibilidad
2. **Usa `required`** para campos obligatorios
3. **Proporciona `helperText`** para instrucciones adicionales
4. **Maneja errores** con mensajes descriptivos
5. **Considera `fullWidth`** para formularios en móvil
6. **Usa validación** con React Hook Forms para mejor UX

## Personalización

### CSS Variables

El componente utiliza las variables CSS del sistema de diseño:

- `--color-gs-white` / `--color-gs-gray-dark`: Fondos
- `--color-gs-black` / `--color-gs-white`: Textos
- `--color-gs-yellow` / `--color-gs-yellow-dark`: Acentos
- `--color-gs-gray-*`: Bordes y estados

### Clases Personalizadas

```tsx
<Select
  className="custom-select"
  options={options}
  // Sobrescribir estilos específicos
/>
```

## Troubleshooting

### React Hook Form no funciona
- Asegúrate de pasar el prop `field` o usar `Controller`
- Verifica que el nombre del campo sea único

### Estilos no aparecen
- Verifica que el archivo CSS esté importado
- Asegúrate que las variables CSS estén definidas

### Opciones no se muestran
- Verifica que `options` sea un array válido
- Revisa que cada opción tenga `value` y `label`