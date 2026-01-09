interface TypesDetalleOperativo {
  id: number;
  certificado: string;
  producto: string;
  sociedad: string;
  fechaEmision: string;
  movimiento: "Emisión" | "Cancelación";
  prima: number;
  iva: number;
  total: number;
  [key: string]: unknown;
}

export type { TypesDetalleOperativo };
