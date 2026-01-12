"use client";

import Iva from "./contentDetailAcelE/iva/Iva";
import DetalleOperativo from "./contentDetailAcelE/detalleOperativo/DetalleOperativo";
import Vida from "./vida/Vida";
import { DynamicTabs } from "@repo/ui";
import DescargarInforme from "./descargarInforme/DescargarInforme";

export default function Conciliador() {
  const detailsContent = (
    <DynamicTabs
      options={[
        { label: "Detalle por tazas", content: <Iva /> },
        { label: "Detalle por productos", content: <DetalleOperativo /> },
      ]}
    />
  );

  return (
    <div className="w-full space-y-3 p-2 sm:p-4">
      <DynamicTabs
        options={[
          {
            label: "Vida",
            content: (
              <div className="flex">
                <Vida />
                <DescargarInforme />
              </div>
            ),
          },
          { label: "Daños", content: "Daños" },
        ]}
      />
    </div>
  );
}
