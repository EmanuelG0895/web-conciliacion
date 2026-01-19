import type { BusinessType, ProductType } from "@repo/api";

export interface Inputs {
  dateStart: string;
  dateEnd: string;
  tipoNegocio: string;
  tipoProducto: string;
}

export interface SearchProps {
  businessType: BusinessType[];
  productType: ProductType[];
}
