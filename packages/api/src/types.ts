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
  [key: string]: any;
}

export interface ProductType {
  codigo: string;
  product_id: string;
  producto: string;
  rfc: string;
  tipo_negocio_id: number;
}

export interface RamosType {
  id: string;
  ramo: string;
  [key: string]: any;
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

export interface SocietyType {
  ramo_id: string;
  razon_social: string;
  rfc: string;
  num_sociedad_sap: number;
  topico_kafka: string;
  [key: string]: any;
}

export interface ResponseSociety {
  status: number;
  type: string;
  date: string;
  message: string;
  data: "";
}
