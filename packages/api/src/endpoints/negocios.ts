import { deleteInfo, getInfo, postInfo, putInfo } from "../methods";
import { DeleteInfo, EditInfo, BusinessType } from "../types";

const getBusinessList = async (): Promise<BusinessType[]> => {
  const response = await getInfo<BusinessType[]>({
    endpoint: "/backoffice/sazconciliaciones/catalog/typeBusiness/",
  });
  return response?.data ?? [];
};

const getBusinessById = async (id: string): Promise<BusinessType | null> => {
  const response = await getInfo<BusinessType>({
    endpoint: `/backoffice/sazconciliaciones/catalog/typeBusiness/${id}`,
  });
  return response?.data ?? null;
};

const deleteBusiness = async ({ id }: DeleteInfo) => {
  const response = await deleteInfo<any>({
    endpoint: `/backoffice/sazconciliaciones/catalog/typeBusiness/delete/${id}`,
  });
  return response;
};

const editBusiness = async ({
  id,
  ...societyData
}: EditInfo & Partial<BusinessType>) => {
  const response = await putInfo<BusinessType, Partial<BusinessType>>({
    endpoint: `/backoffice/sazconciliaciones/catalog/typeBusiness/update/${id}`,
    body: societyData,
  });
  return response;
};

const addBusiness = async (societyData: BusinessType) => {
  const response = await postInfo<BusinessType>({
    endpoint: `/backoffice/sazconciliaciones/catalog/typeBusiness/add`,
    body: societyData,
  });
  return response;
};

export {
  getBusinessList,
  getBusinessById,
  deleteBusiness,
  editBusiness,
  addBusiness,
};
