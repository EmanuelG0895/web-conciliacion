"use server";
import Conciliador from "./Conciliador";
import { getProductsList, getBranchList, getBusinessList } from "@repo/api";

export default async function Page() {
  const [resBusiness, resBranch, resProduct] = await Promise.all([
    getBusinessList(),
    getBranchList(),
    getProductsList(),
  ]);
  
  const businessData = resBusiness ?? [];
  const productData = resProduct ?? [];
  const catalogList = resBranch ?? [];

  return (
    <Conciliador
      catalog={catalogList}
      businessItem={businessData}
      productType={productData}
    />
  );
}
