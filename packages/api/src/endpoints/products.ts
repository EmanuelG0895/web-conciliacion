import { deleteInfo } from "../methods";
import { getInfo } from "../methods/get";
import { DeleteInfo, ProductType } from "../types";

const getProductsList = async (): Promise<ProductType[]> => {
  const response = await getInfo<ProductType[]>({
    endpoint: "/backoffice/sazconciliaciones/catalog/product",
  });
  return response?.data ?? [];
};

const deleteProduct = async ({ id }: DeleteInfo) => {
  const response = await deleteInfo({
    endpoint: `/backoffice/sazconciliaciones/catalog/product/delete/${id}`,
  });
  console.log(response);
  return response;
};

export { getProductsList, deleteProduct };
