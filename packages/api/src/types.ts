export interface APIResponse<T> {
  status: number;
  type: string;
  date: string;
  message: string;
  data: T;
}

export interface RequestGetParams {
  endpoint: string;
}

export interface RequestPostParams<T = unknown> {
  endpoint: string;
  body: T;
}

export interface RequestPutParams<T = unknown> {
  endpoint: string;
  body: T;
}

export interface RequestDeleteParams {
  endpoint: string;
}

export interface BusinessType {
  tipo_negocio_id: number;
  tipo_negocio: string;
}

export interface ProductType {
  product_id: string;
  sociedad_id: string;
  tipo_negocio_id: number;
  codigo: string;
  producto: string;
}
export interface CatalogType {
  ramo_id: string;
  ramo: string;
}
