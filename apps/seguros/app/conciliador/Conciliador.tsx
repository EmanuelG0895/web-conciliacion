"use client";
import { DynamicTabs } from "@repo/ui";
import Buscar from "./vida/buscarConciliacion/Buscar";
import DescargarInforme from "./descargarInforme/DescargarInforme";
import Detalles from "./vida/detallesConciliacion/Detalles";
import { ConciliadorProps } from "./conciliadorTypes";

export default function Conciliador({
  businessItem,
  productType,
  catalog,
}: Readonly<ConciliadorProps>) {
  const tabOptions = catalog.map((cat) => ({
    label: cat.ramo,
    content: (
      <div className="space-y-4 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row lg:flex-row lg:items-center">
          <Buscar businessType={businessItem} productType={productType} />
          <DescargarInforme />
        </div>
        <Detalles />
      </div>
    ),
  }));

  return <DynamicTabs options={tabOptions} />;
}
