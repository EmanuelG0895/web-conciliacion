// Emulación de llamada a una API que retorna un arreglo de objetos

export interface Poliza {
  id: number;
  title: string;
  sourceA: string;
  sourceB: string;
  amountA: number;
  amountB: number;
  variation: number;
  currency: string;
  status: string;
}

export async function obtenerPolizas(): Promise<Poliza[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: 1,
      title: "ACSEL-E vs SAP FI",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "SAP FI (Contable)",
      amountA: 819204736518.2198,
      amountB: 55215000.0,
      variation: 15000.5,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 2,
      title: "ACSEL-E vs Facturación",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "Facturación",
      amountA: 74851290376482195638472910475862,
      amountB: 55230001.05,
      variation: -0.55,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 3,
      title: "SAP FI vs Facturación",
      sourceA: "SAP FI (Contable)",
      sourceB: "Facturación",
      amountA: 55215000.0,
      amountB: 55230001.05,
      variation: -15001.05,
      currency: "MXN",
      status: "EN_PROCESO",
    },
    {
      id: 4,
      title: "Facturación vs SAT Meta Data",
      sourceA: "Facturación",
      sourceB: "SAT (Fiscal)",
      amountA: 55230001.05,
      amountB: 55230001.05,
      variation: 0.0,
      currency: "MXN",
      status: "SIN_INFO",
    },
    {
      id: 5,
      title: "ACSEL-E vs SAP FI",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "SAP FI (Contable)",
      amountA: 55230000.5,
      amountB: 55215000.0,
      variation: 15000.5,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 6,
      title: "ACSEL-E vs Facturación",
      sourceA: "ACSEL-E (Operativo)",
      sourceB: "Facturación",
      amountA: 55230000.5,
      amountB: 55230001.05,
      variation: -0.55,
      currency: "MXN",
      status: "DISPONIBLE",
    },
    {
      id: 7,
      title: "SAP FI vs Facturación",
      sourceA: "SAP FI (Contable)",
      sourceB: "Facturación",
      amountA: 55215000.0,
      amountB: 55230001.05,
      variation: -15001.05,
      currency: "MXN",
      status: "EN_PROCESO",
    },
  ];
  return data;
}
