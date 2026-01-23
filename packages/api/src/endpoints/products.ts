import { deleteInfo, getInfo, postInfo, putInfo } from "../methods";
import { AddInfo, DeleteInfo, EditInfo, ProductType } from "../types";

const getProductsList = async (): Promise<ProductType[]> => {
  const response = await getInfo<ProductType[]>({
    endpoint: "/backoffice/sazconciliaciones/catalog/product",
  });
  return response?.data ?? [];
};

const getProductById = async (id: string): Promise<ProductType | null> => {
  const response = await getInfo<ProductType>({
    endpoint: `/backoffice/sazconciliaciones/catalog/product/${id}`,
  });
  return response?.data ?? null;
};

const deleteProduct = async ({ id }: DeleteInfo) => {
  const response = await deleteInfo<any>({
    endpoint: `/backoffice/sazconciliaciones/catalog/product/delete/${id}`,
  });
  return response;
};

const editProduct = async ({ id, ...productData }: EditInfo & Partial<ProductType>) => {
  const response = await putInfo<ProductType, Partial<ProductType>>({
    endpoint: `/backoffice/sazconciliaciones/catalog/product/update/${id}`,
    body: productData,
  });
  return response;
};
const addProduct = async (productData: AddInfo) => {
  const response = await postInfo<ProductType>({
    endpoint: `/backoffice/sazconciliaciones/catalog/product/add`,
    body: productData,
  });
  return response;
};

export { getProductsList, getProductById, deleteProduct, editProduct, addProduct };
