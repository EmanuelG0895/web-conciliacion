"use server";
import React from "react";
import Productos from "./Prodcucts";
import { getProductsList } from "@repo/api";

export default async function Page() {
  const productData = await getProductsList();
  console.log(productData)
  const headers =
    productData.length > 0 ? Object.keys(productData[0] as object) : [];
  const LLAVES_IGNORADAS = new Set([
    "product_id",
    "tipo_negocio_id",
    "id",
    "fechaCreacion",
    "updatedAt",
  ]);

  const PRIORIDAD_COLUMNAS = ["producto", "rfc", "codigo"];
  const tableHeader = headers
    .filter((key) => !LLAVES_IGNORADAS.has(key))
    .sort((a, b) => {
      const indexA = PRIORIDAD_COLUMNAS.indexOf(a);
      const indexB = PRIORIDAD_COLUMNAS.indexOf(b);

      const posA = indexA === -1 ? 99 : indexA;
      const posB = indexB === -1 ? 99 : indexB;

      return posA - posB;
    });
  return <Productos data={productData} tableHeader={tableHeader} />;
}
