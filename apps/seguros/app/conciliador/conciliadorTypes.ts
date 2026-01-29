import type { ProductType, BusinessType, RamosType } from "@repo/api";

export interface ConciliadorProps {
  productType: ProductType[];
  businessItem: BusinessType[];
  catalog: RamosType[];
}
