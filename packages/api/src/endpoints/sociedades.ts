import { deleteInfo, getInfo, postInfo, putInfo } from "../methods";
import { DeleteInfo, SocietyType } from "../types";

const getSocietiesList = async (): Promise<SocietyType[]> => {
  const response = await getInfo<SocietyType[]>({
    endpoint: "/backoffice/sazconciliaciones/catalog/society",
  });
  return response?.data ?? [];
};

const getSocietyById = async (id: string): Promise<SocietyType | null> => {
  const response = await getInfo<SocietyType>({
    endpoint: `/backoffice/sazconciliaciones/catalog/society/${id}`,
  });
  return response?.data ?? null;
};

const deleteSociety = async ({ id }: DeleteInfo) => {
  const response = await deleteInfo<any>({
    endpoint: `/backoffice/sazconciliaciones/catalog/society/delete/${id}`,
  });
  return response;
};

const editSociety = async (data: SocietyType) => {
  const response = await putInfo({
    endpoint: `/backoffice/sazconciliaciones/catalog/society/update/${data.rfc}`,
    body: data,
  });
  return response;
};

const addSociety = async (societyData: SocietyType) => {
  const response = await postInfo({
    endpoint: `/backoffice/sazconciliaciones/catalog/society/add`,
    body: societyData,
  });
  return response;
};

export {
  getSocietiesList,
  getSocietyById,
  deleteSociety,
  editSociety,
  addSociety,
};
