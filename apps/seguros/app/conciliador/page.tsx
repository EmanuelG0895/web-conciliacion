import Conciliador from "./Conciliador";
import { getInfo, BusinessType, ProductType } from "@repo/api";

export default async function Page() {
  const [resBusiness, resProduct] = await Promise.all([
    getInfo<BusinessType[]>({ endpoint: "/backoffice/sazconciliaciones/catalog/typeBusiness/" }),
    getInfo<ProductType[]>({ endpoint: "/backoffice/sazconciliaciones/catalog/product" }),
  ]);

  const businessData = resBusiness.data ?? [];
  const productData = resProduct.data ?? [];

  return <Conciliador businessItem={businessData} productType={productData} />;
}
