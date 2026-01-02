interface CuentaContable {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
}

interface Product {
  id: string;
  nombre: string;
  codigo: string;
  tipoNegocio: string;
  cuentasContables: CuentaContable[];
  fechaCreacion: string;
  [key: string]: unknown;
}

interface NuevoProductoFormData {
  nombre: string;
  codigo: string;
  tipoNegocio: string;
  cuentasContables: string[]; // Array de IDs de cuentas contables
}

export type { Product, CuentaContable, NuevoProductoFormData };