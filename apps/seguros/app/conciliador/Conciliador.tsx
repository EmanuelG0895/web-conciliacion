"use client";
import { DynamicTabs } from "@repo/ui";
import Buscar from "./vida/buscarConciliacion/Buscar";
import DescargarInforme from "./descargarInforme/DescargarInforme";
import Detalles from "./vida/detallesConciliacion/Detalles";
import { ConciliadorProps } from "./conciliadorTypes";

export default function Conciliador({
  businessItem,
  productType,
}: Readonly<ConciliadorProps>) {
  return (
    <DynamicTabs
      options={[
        {
          label: "Vida",
          content: (
            <div className="space-y-4 p-4">
              <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <Buscar businessType={businessItem} productType={productType} />
                <DescargarInforme />
              </div>
              <Detalles />
            </div>
          ),
        },
        {
          label: "Daños",
          content: <></>,
        },
      ]}
    />
  );
}
