interface ResumenTasa {
  id: number;
  tasa: string;
  certificados: number;
  prima: number;
  derechos: number;
  recargos: number;
  subTotal: number;
  iva: number;
  total: number;
  [key: string]: unknown;
}

export type { ResumenTasa };
