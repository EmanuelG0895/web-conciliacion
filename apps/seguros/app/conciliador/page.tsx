import Conciliador from "./Conciliador";
import { getInfo, BusinessType, ProductType, CatalogType } from "@repo/api";

export default async function Page() {
  const [resBusiness, resProduct, resCatalog] = await Promise.all([
    getInfo<BusinessType[]>({
      endpoint: "/backoffice/sazconciliaciones/catalog/typeBusiness/",
    }),
    getInfo<ProductType[]>({
      endpoint: "/backoffice/sazconciliaciones/catalog/product",
    }),
    getInfo<CatalogType[]>({
      endpoint: "/backoffice/sazconciliaciones/catalog/branch",
    }),
  ]);

  const businessData = resBusiness.data ?? [];
  const productData = resProduct.data ?? [];
  const catalogList = resCatalog.data ?? [];

  return (
    <Conciliador
      catalog={catalogList}
      businessItem={businessData}
      productType={productData}
    />
  );
}
