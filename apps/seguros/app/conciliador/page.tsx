"use server"
import Conciliador from "./Conciliador";
import {
  getInfo,
  BusinessType,
  CatalogType,
  getProductsList
} from "@repo/api";

export default async function Page() {
  const [resBusiness, resCatalog, resProduct] = await Promise.all([
    getInfo<BusinessType[]>({
      endpoint: "/backoffice/sazconciliaciones/catalog/typeBusiness/",
    }),

    getInfo<CatalogType[]>({
      endpoint: "/backoffice/sazconciliaciones/catalog/branch",
    }),
    getProductsList(),
  ]);

  const businessData = resBusiness.data ?? [];
  const productData = resProduct ?? [];
  const catalogList = resCatalog.data ?? [];

  return (
    <Conciliador
      catalog={catalogList}
      businessItem={businessData}
      productType={productData}
    />
  );
}
