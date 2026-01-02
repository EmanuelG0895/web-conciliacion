# Table Component

El componente `Table` es un componente reutilizable para mostrar datos tabulares en React, con soporte para ordenamiento, filas rayadas, filas seleccionables y personalización de celdas.

## Uso Básico

```tsx
import Table, { TableColumn } from "@tu-paquete/ui/src/data-display/table/table";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

const columnas: TableColumn<Usuario>[] = [
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "correo", label: "Correo", sortable: true },
];

const datos: Usuario[] = [
  { id: 1, nombre: "Juan", correo: "juan@mail.com" },
  { id: 2, nombre: "Ana", correo: "ana@mail.com" },
];

<Table
  data={datos}
  columns={columnas}
  keyExtractor={(row) => row.id}
  onRowClick={(row) => alert(row.nombre)}
  striped
  hoverable
  bordered
  emptyMessage="Sin usuarios"
/>
```

## Props

- **data**: Array de objetos a mostrar.
- **columns**: Definición de columnas (ver tipo `TableColumn`).
- **keyExtractor**: Función para extraer la key única de cada fila.
- **onRowClick**: (opcional) Callback al hacer click en una fila.
- **className**: (opcional) Clases CSS adicionales para la tabla.
- **emptyMessage**: (opcional) Mensaje a mostrar si no hay datos.
- **striped**: (opcional) Filas alternadas con color.
- **hoverable**: (opcional) Resalta fila al pasar el mouse.
- **bordered**: (opcional) Muestra bordes entre filas.

## Personalización de Columnas

Cada columna puede tener:
- **key**: Propiedad del objeto a mostrar.
- **label**: Título de la columna.
- **sortable**: Si permite ordenamiento.
- **render**: Función para renderizar contenido personalizado.
- **align**: Alineación (`left`, `center`, `right`).
- **className**: Clases CSS adicionales para la celda.

## Ejemplo con render personalizado

```tsx
const columnas: TableColumn<Usuario>[] = [
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo", render: (row) => <a href={`mailto:${row.correo}`}>{row.correo}</a> },
];
```

---

> **Nota:** El componente utiliza estilos de Tailwind CSS y clases personalizadas del sistema de diseño.
