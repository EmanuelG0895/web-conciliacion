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
  codigo: string;
  product_id: string;
  producto: string;
  rfc: string;
  tipo_negocio_id: number;
}

export interface CatalogType {
  ramo_id: string;
  ramo: string;
}

export interface DeleteInfo {
  id: string;
}
export interface EditInfo {
  id: string;
}
export interface AddInfo {
  product_id: string;
  rfc: string;
  tipo_negocio_id: number;
  codigo: string;
  producto: string;
  status: number;
}
