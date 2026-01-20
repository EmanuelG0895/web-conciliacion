import type { ProductType, BusinessType, CatalogType } from "@repo/api";

export interface ConciliadorProps {
  productType: ProductType[];
  businessItem: BusinessType[];
  catalog: CatalogType[];
}
