import { ProductType } from "@repo/api";

interface Product extends Record<string, unknown> {
  product_id: string;
  rfc: string;
  codigo: string;
  producto: string;
  tipo_negocio_id: number;
}

interface NuevoProductoFormData {
  nombre: string;
  codigo: string;
  tipoNegocio: string;
  cuentasContables: string[];
}

interface ProductParams {
  data: ProductType[];
  tableHeader: string[];
  [key: string]: unknown;
}

export type { Product, NuevoProductoFormData, ProductParams };
