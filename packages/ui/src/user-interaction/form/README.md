# Form Component

Un sistema completo de formularios basado en React Hook Form que proporciona componentes reutilizables para crear formularios con validación, estados automáticos y diseño consistente.

## 📦 Instalación

```tsx
import { Form } from "@repo/ui";
```

## 🚀 Uso Básico

```tsx
interface UserData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

function MyForm() {
  const handleSubmit = (data: UserData) => {
    console.log("Datos enviados:", data);
  };

  return (
    <Form<UserData> onSubmit={handleSubmit}>
      <Form.Section title="Información Personal">
        <Form.Field name="name" label="Nombre" required />
        <Form.Field name="email" label="Email" type="email" required />
      </Form.Section>

      <Form.Section title="Información Laboral">
        <Form.Select 
          name="role" 
          label="Rol" 
          options={[
            { value: "admin", label: "Administrador" },
            { value: "user", label: "Usuario" },
            { value: "guest", label: "Invitado" }
          ]}
          placeholder="Selecciona un rol"
          required
        />
        
        <Form.Select 
          name="department" 
          label="Departamento" 
          variant="outlined"
          size="lg"
          options={[
            { value: "it", label: "Tecnología" },
            { value: "hr", label: "Recursos Humanos" },
            { value: "sales", label: "Ventas" },
            { value: "marketing", label: "Marketing" }
          ]}
          helperText="Selecciona tu área de trabajo"
          required
        />

        <Form.Select 
          name="status" 
          label="Estado" 
          variant="filled"
          options={[
            { value: "active", label: "Activo" },
            { value: "inactive", label: "Inactivo" },
            { value: "suspended", label: "Suspendido", disabled: true }
          ]}
        />
      </Form.Section>

      <Form.Actions>
        <Form.CancelButton onClick={() => console.log("Cancelado")}>
          Cancelar
        </Form.CancelButton>
        <Form.SubmitButton>Guardar</Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
}
```

## 📋 API Components

### Form (Componente Principal)

Contenedor principal que maneja el estado del formulario con React Hook Form.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `onSubmit` | `SubmitHandler<T>` | - | **Requerido.** Función llamada al enviar el formulario |
| `defaultValues` | `DefaultValues<T>` | - | Valores iniciales del formulario |
| `mode` | `"onChange" \| "onBlur" \| "onSubmit"` | `"onChange"` | Cuándo validar los campos |
| `loading` | `boolean` | `false` | Estado de carga global |
| `disabled` | `boolean` | `false` | Deshabilitar todo el formulario |
| `className` | `string` | - | Clases CSS adicionales |

```tsx
<Form<MyDataType>
  onSubmit={handleSubmit}
  defaultValues={{ name: "John", email: "john@example.com" }}
  mode="onBlur"
  loading={isSubmitting}
>
  {/* Campos del formulario */}
</Form>
```

### Form.Field

Campo de entrada de texto que utiliza el componente Input existente.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `string` | - | **Requerido.** Nombre del campo |
| `label` | `string` | - | Etiqueta del campo |
| `type` | `string` | `"text"` | Tipo de input (text, email, password, number, etc.) |
| `placeholder` | `string` | - | Texto de placeholder |
| `required` | `boolean` | `false` | Si el campo es requerido |
| `disabled` | `boolean` | `false` | Deshabilitar el campo |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del campo |
| `variant` | `"default" \| "outlined" \| "filled"` | `"default"` | Variante del diseño |
| `fullWidth` | `boolean` | `true` | Si ocupa todo el ancho disponible |

```tsx
<Form.Field 
  name="username" 
  label="Nombre de usuario"
  placeholder="Ingresa tu usuario"
  required
  size="lg"
  variant="outlined"
/>
```

### Form.Select

Campo de selección con opciones predefinidas. Utiliza el componente Select basado en Radix UI para mejor accesibilidad y experiencia de usuario.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `string` | - | **Requerido.** Nombre del campo |
| `label` | `string` | - | Etiqueta del campo |
| `options` | `SelectOption[]` | - | **Requerido.** Opciones disponibles |
| `placeholder` | `string` | `"Seleccionar..."` | Texto cuando no hay selección |
| `required` | `boolean` | `false` | Si el campo es requerido |
| `disabled` | `boolean` | `false` | Deshabilitar el campo |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del campo |
| `variant` | `"default" \| "outlined" \| "filled"` | `"default"` | Variante del diseño |
| `fullWidth` | `boolean` | `true` | Si ocupa todo el ancho disponible |
| `helperText` | `string` | - | Texto de ayuda debajo del campo |

#### SelectOption Interface

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean; // Opcional: deshabilitar opción específica
}
```

#### Ejemplos

**Uso Básico:**
```tsx
<Form.Select
  name="country"
  label="País"
  placeholder="Selecciona tu país"
  options={[
    { value: "mx", label: "México" },
    { value: "us", label: "Estados Unidos" },
    { value: "es", label: "España" }
  ]}
  required
/>
```

**Con diferentes variantes y tamaños:**
```tsx
{/* Select con variante outlined */}
<Form.Select
  name="department"
  label="Departamento"
  variant="outlined"
  size="lg"
  options={[
    { value: "it", label: "Tecnología" },
    { value: "hr", label: "Recursos Humanos" },
    { value: "sales", label: "Ventas" }
  ]}
  helperText="Selecciona tu área de trabajo"
  required
/>

{/* Select compacto */}
<Form.Select
  name="priority"
  label="Prioridad"
  size="sm"
  variant="filled"
  options={[
    { value: "low", label: "Baja" },
    { value: "medium", label: "Media" },
    { value: "high", label: "Alta" },
    { value: "critical", label: "Crítica", disabled: true }
  ]}
/>
```

**Con opción deshabilitada:**
```tsx
<Form.Select
  name="status"
  label="Estado"
  options={[
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "suspended", label: "Suspendido", disabled: true }
  ]}
  helperText="Las opciones deshabilitadas no se pueden seleccionar"
/>
```

#### Características del Select

- **🎯 Basado en Radix UI**: Mejor accesibilidad y navegación con teclado
- **⌨️ Navegación por teclado**: Space/Enter para abrir, flechas para navegar, Esc para cerrar
- **🎨 Responsive**: Se adapta automáticamente al contenedor
- **🌙 Tema**: Soporte completo para modo oscuro/claro
- **♿ Accesible**: Cumple estándares WCAG 2.1

#### ✨ Mejoras vs Select HTML Nativo

El nuevo `Form.Select` ofrece ventajas significativas sobre un select HTML tradicional:

| Característica | Select HTML | Form.Select (Radix UI) |
|---|---|---|
| **Navegación teclado** | ✅ Básica | ✅ Completa + atajos |
| **Accesibilidad** | ✅ Limitada | ✅ WCAG 2.1 compliant |
| **Personalización** | ❌ Muy limitada | ✅ Totalmente personalizable |
| **Animaciones** | ❌ Ninguna | ✅ Animaciones suaves |
| **Responsive** | ✅ Básico | ✅ Completamente adaptable |
| **Opciones deshabilitadas** | ✅ Sí | ✅ Con mejor indicación visual |
| **Modo oscuro** | ❌ Inconsistente | ✅ Soporte nativo |
| **Focus management** | ❌ Básico | ✅ Avanzado |

**Navegación por teclado disponible:**
- `Space` / `Enter`: Abrir/cerrar dropdown
- `↑` / `↓`: Navegar por las opciones
- `Home` / `End`: Primera/última opción
- `Esc`: Cerrar dropdown
- `A-Z`: Buscar opciones por letra

### Form.Checkbox

Campo de checkbox individual.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `string` | - | **Requerido.** Nombre del campo |
| `label` | `string` | - | **Requerido.** Texto del checkbox |
| `value` | `string` | - | Valor del checkbox (para grupos) |
| `required` | `boolean` | `false` | Si el checkbox es requerido |
| `disabled` | `boolean` | `false` | Deshabilitar el checkbox |

```tsx
<Form.Checkbox
  name="terms"
  label="Acepto los términos y condiciones"
  required
/>
```

### Form.RadioGroup

Grupo de radio buttons para selección única.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `string` | - | **Requerido.** Nombre del campo |
| `label` | `string` | - | **Requerido.** Título del grupo |
| `options` | `Array<{value: string, label: string}>` | - | **Requerido.** Opciones disponibles |
| `required` | `boolean` | `false` | Si la selección es requerida |
| `disabled` | `boolean` | `false` | Deshabilitar todo el grupo |

```tsx
<Form.RadioGroup
  name="plan"
  label="Plan de suscripción"
  options={[
    { value: "basic", label: "Básico - $10/mes" },
    { value: "premium", label: "Premium - $25/mes" },
    { value: "enterprise", label: "Enterprise - $50/mes" }
  ]}
  required
/>
```

### Form.FileUpload

Campo para subir archivos con vista previa y validación.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `string` | - | **Requerido.** Nombre del campo |
| `label` | `string` | - | Etiqueta del campo |
| `accept` | `string` | - | Tipos de archivo aceptados (ej: "image/*", ".pdf") |
| `multiple` | `boolean` | `false` | Permitir múltiples archivos |
| `maxSize` | `number` | - | Tamaño máximo en bytes |
| `required` | `boolean` | `false` | Si el archivo es requerido |
| `disabled` | `boolean` | `false` | Deshabilitar el campo |

```tsx
<Form.FileUpload
  name="avatar"
  label="Foto de perfil"
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  required
/>

<Form.FileUpload
  name="documents"
  label="Documentos"
  accept=".pdf,.doc,.docx"
  multiple
  maxSize={10 * 1024 * 1024} // 10MB
/>
```

### Form.Actions

Contenedor para botones de acción del formulario.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `align` | `"left" \| "center" \| "right"` | `"right"` | Alineación de los botones |
| `className` | `string` | - | Clases CSS adicionales |

```tsx
<Form.Actions align="center">
  <Form.CancelButton onClick={handleCancel}>
    Cancelar
  </Form.CancelButton>
  <Form.SubmitButton>
    Guardar
  </Form.SubmitButton>
</Form.Actions>
```

### Form.SubmitButton

Botón de envío con estados automáticos de loading.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "link" \| "danger"` | `"default"` | Variante del botón |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Tamaño del botón |
| `disabled` | `boolean` | `false` | Deshabilitar el botón |

```tsx
<Form.SubmitButton variant="default" size="lg">
  Crear Usuario
</Form.SubmitButton>
```

### Form.CancelButton

Botón de cancelar que no envía el formulario.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `onClick` | `() => void` | - | **Requerido.** Función al hacer clic |
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "link" \| "danger"` | `"outline"` | Variante del botón |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Tamaño del botón |

```tsx
<Form.CancelButton onClick={handleCancel} variant="outline">
  Cancelar
</Form.CancelButton>
```

### Form.Section

Agrupa campos relacionados con un título opcional.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | - | Título de la sección |
| `className` | `string` | - | Clases CSS adicionales |

```tsx
<Form.Section title="Información Personal">
  <Form.Field name="firstName" label="Nombre" />
  <Form.Field name="lastName" label="Apellido" />
</Form.Section>

<Form.Section title="Contacto">
  <Form.Field name="email" label="Email" />
  <Form.Field name="phone" label="Teléfono" />
</Form.Section>
```

## 🎯 Ejemplos Completos

### Formulario de Usuario Completo

```tsx
interface UserFormData {
  // Información básica
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Selecciones
  country: string;
  role: string;
  plan: string;
  
  // Opciones
  newsletter: boolean;
  terms: boolean;
  
  // Archivos
  avatar: File;
  documents: File[];
}

function CompleteUserForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      // Enviar datos a API
      await submitUser(data);
      alert("Usuario creado exitosamente");
    } catch (error) {
      alert("Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Lógica de cancelación
    router.back();
  };

  return (
    <Form<UserFormData>
      onSubmit={handleSubmit}
      loading={loading}
      className="max-w-2xl mx-auto space-y-6"
    >
      <Form.Section title="Información Personal">
        <div className="grid grid-cols-2 gap-4">
          <Form.Field
            name="firstName"
            label="Nombre"
            placeholder="Tu nombre"
            required
          />
          <Form.Field
            name="lastName"
            label="Apellido"
            placeholder="Tu apellido"
            required
          />
        </div>
        
        <Form.Field
          name="email"
          label="Email"
          type="email"
          placeholder="tu@email.com"
          required
        />
        
        <Form.Field
          name="phone"
          label="Teléfono"
          type="tel"
          placeholder="+52 555 123 4567"
        />
      </Form.Section>

      <Form.Section title="Ubicación y Rol">
        <Form.Select
          name="country"
          label="País"
          options={countryOptions}
          placeholder="Selecciona tu país"
          required
        />
        
        <Form.RadioGroup
          name="role"
          label="Rol en la organización"
          options={[
            { value: "admin", label: "Administrador" },
            { value: "manager", label: "Gerente" },
            { value: "employee", label: "Empleado" }
          ]}
          required
        />
      </Form.Section>

      <Form.Section title="Suscripción">
        <Form.RadioGroup
          name="plan"
          label="Plan de suscripción"
          options={[
            { value: "basic", label: "Básico - Gratis" },
            { value: "premium", label: "Premium - $29/mes" },
            { value: "enterprise", label: "Enterprise - $99/mes" }
          ]}
        />
      </Form.Section>

      <Form.Section title="Archivos">
        <Form.FileUpload
          name="avatar"
          label="Foto de perfil"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
        />
        
        <Form.FileUpload
          name="documents"
          label="Documentos adicionales"
          accept=".pdf,.doc,.docx"
          multiple
          maxSize={10 * 1024 * 1024}
        />
      </Form.Section>

      <Form.Section title="Preferencias">
        <div className="space-y-3">
          <Form.Checkbox
            name="newsletter"
            label="Quiero recibir el newsletter semanal"
          />
          <Form.Checkbox
            name="terms"
            label="Acepto los términos y condiciones"
            required
          />
        </div>
      </Form.Section>

      <Form.Actions>
        <Form.CancelButton onClick={handleCancel}>
          Cancelar
        </Form.CancelButton>
        <Form.SubmitButton>
          Crear Usuario
        </Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
}
```

### Formulario Modal Simple

```tsx
function UserModal({ user, onSave, onClose }) {
  const handleSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Editar Usuario">
      <Form
        onSubmit={handleSubmit}
        defaultValues={user}
        className="space-y-4"
      >
        <Form.Field name="name" label="Nombre" required />
        <Form.Field name="email" label="Email" type="email" required />
        <Form.Select
          name="role"
          label="Rol"
          options={roleOptions}
          required
        />
        
        <Form.Actions>
          <Form.CancelButton onClick={onClose}>
            Cancelar
          </Form.CancelButton>
          <Form.SubmitButton>
            Guardar
          </Form.SubmitButton>
        </Form.Actions>
      </Form>
    </Modal>
  );
}
```

## 🎨 Layout y Estilos

### Grid Layout

```tsx
<Form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Form.Field name="firstName" label="Nombre" />
    <Form.Field name="lastName" label="Apellido" />
  </div>
  
  <Form.Field name="email" label="Email" /> {/* Full width */}
  
  <div className="grid grid-cols-3 gap-4">
    <Form.Field name="city" label="Ciudad" />
    <Form.Field name="state" label="Estado" />
    <Form.Field name="zip" label="CP" />
  </div>
</Form>
```

### Responsive Design

```tsx
<Form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <Form.Field name="field1" label="Campo 1" />
    <Form.Field name="field2" label="Campo 2" />
    <Form.Field name="field3" label="Campo 3" />
  </div>
</Form>
```

## ✅ Mejores Prácticas

### 1. Tipado TypeScript

```tsx
// Define tus tipos claramente
interface UserForm {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Usa el genérico del Form
<Form<UserForm> onSubmit={handleSubmit}>
```

### 2. Validación

```tsx
// El componente ya incluye validación básica
<Form.Field name="email" type="email" required />

// Para validaciones más complejas, puedes usar Zod o Yup
// (implementación futura)
```

### 3. Estados de Loading

```tsx
function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await saveData(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} loading={isSubmitting}>
      {/* Los botones se deshabilitan automáticamente */}
    </Form>
  );
}
```

### 4. Valores por Defecto

```tsx
// Para edición
<Form
  defaultValues={existingUser}
  onSubmit={handleUpdate}
>

// Para creación con valores iniciales
<Form
  defaultValues={{
    role: 'user',
    country: 'mx',
    newsletter: true
  }}
  onSubmit={handleCreate}
>
```

## � Ejemplo Completo: Formulario de Usuario

Aquí tienes un ejemplo completo que muestra todas las capacidades del formulario con el Select mejorado:

```tsx
import { Form } from "@repo/ui";
import type { SelectOption } from "@repo/ui";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  state: string;
  department: string;
  role: string;
  status: string;
  isActive: boolean;
  gender: string;
  notifications: string[];
  avatar?: FileList | File;
}

// Definir opciones para los selects
const countryOptions: SelectOption[] = [
  { value: "mx", label: "México" },
  { value: "us", label: "Estados Unidos" },
  { value: "ca", label: "Canadá" },
  { value: "es", label: "España" },
];

const departmentOptions: SelectOption[] = [
  { value: "it", label: "Tecnología" },
  { value: "hr", label: "Recursos Humanos" },
  { value: "sales", label: "Ventas" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finanzas" },
];

const roleOptions: SelectOption[] = [
  { value: "admin", label: "Administrador" },
  { value: "manager", label: "Gerente" },
  { value: "employee", label: "Empleado" },
  { value: "contractor", label: "Contratista" },
];

const statusOptions: SelectOption[] = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "pending", label: "Pendiente" },
  { value: "suspended", label: "Suspendido", disabled: true },
];

export function UserRegistrationForm() {
  const handleSubmit = (data: UserFormData) => {
    console.log("Datos del usuario:", data);
    // Aquí enviarías los datos al backend
  };

  const handleCancel = () => {
    // Lógica para cancelar
    console.log("Formulario cancelado");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Registro de Usuario</h1>
      
      <Form<UserFormData>
        onSubmit={handleSubmit}
        defaultValues={{
          status: "active", // Valor por defecto
          isActive: true,
        }}
      >
        <Form.Section title="Información Personal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Field
              name="firstName"
              label="Nombre"
              placeholder="Ingresa el nombre"
              required
            />
            
            <Form.Field
              name="lastName"
              label="Apellido"
              placeholder="Ingresa el apellido"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Field
              name="email"
              label="Correo Electrónico"
              type="email"
              placeholder="usuario@ejemplo.com"
              required
            />
            
            <Form.Field
              name="phone"
              label="Teléfono"
              type="tel"
              placeholder="+52 55 1234 5678"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Select básico */}
            <Form.Select
              name="country"
              label="País"
              options={countryOptions}
              placeholder="Selecciona un país"
              required
              helperText="País de residencia"
            />

            {/* Select con variante outlined */}
            <Form.Select
              name="state"
              label="Estado/Provincia"
              variant="outlined"
              options={[
                { value: "cdmx", label: "Ciudad de México" },
                { value: "jal", label: "Jalisco" },
                { value: "nl", label: "Nuevo León" },
                { value: "qro", label: "Querétaro" },
              ]}
              placeholder="Selecciona estado"
            />
          </div>
        </Form.Section>

        <Form.Section title="Información Laboral">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Select grande con variante filled */}
            <Form.Select
              name="department"
              label="Departamento"
              variant="filled"
              size="lg"
              options={departmentOptions}
              placeholder="Selecciona departamento"
              required
              helperText="Área de trabajo"
            />

            {/* Select mediano */}
            <Form.Select
              name="role"
              label="Rol"
              size="md"
              options={roleOptions}
              placeholder="Selecciona rol"
              required
            />

            {/* Select con opción deshabilitada */}
            <Form.Select
              name="status"
              label="Estado"
              size="sm"
              options={statusOptions}
              helperText="Estado actual del usuario"
            />
          </div>
        </Form.Section>

        <Form.Section title="Información Adicional">
          <Form.RadioGroup
            name="gender"
            label="Género"
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Femenino" },
              { value: "other", label: "Otro" },
              { value: "prefer-not-to-say", label: "Prefiero no decir" },
            ]}
          />

          <Form.Checkbox
            name="isActive"
            label="Usuario activo en el sistema"
          />

          <Form.FileUpload
            name="avatar"
            label="Foto de Perfil"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
          />
        </Form.Section>

        <Form.Actions align="right">
          <Form.CancelButton onClick={handleCancel}>
            Cancelar
          </Form.CancelButton>
          <Form.SubmitButton>
            Registrar Usuario
          </Form.SubmitButton>
        </Form.Actions>
      </Form>
    </div>
  );
}
```

## �🔧 Integración con React Hook Form

El componente está construido sobre React Hook Form, por lo que tienes acceso a todas sus características:

- **Performance optimizada** con mínimos re-renders
- **Validación en tiempo real**
- **Manejo automático de estados**
- **API simple y consistente**
- **TypeScript nativo**

## 🎯 Casos de Uso Comunes

- ✅ Formularios de registro/login
- ✅ Formularios de perfil de usuario
- ✅ Formularios de configuración
- ✅ Formularios modales
- ✅ Wizards multi-paso
- ✅ Formularios con archivos
- ✅ Formularios de contacto
- ✅ Formularios de checkout

## 🔮 Próximas Características

- [ ] Integración con esquemas de validación (Zod/Yup)
- [ ] Componentes para arrays dinámicos
- [ ] Campos condicionales
- [ ] Autoguardado
- [ ] Wizard/Stepper components
- [ ] Más tipos de campos (DatePicker, ColorPicker, etc.)