import { deleteInfo, getInfo, postInfo, putInfo } from "../methods";
import { AddInfo, DeleteInfo, EditInfo, SocietyType } from "../types";

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

const editSociety = async ({
  id,
  ...societyData
}: EditInfo & Partial<SocietyType>) => {
  const response = await putInfo<SocietyType, Partial<SocietyType>>({
    endpoint: `/backoffice/sazconciliaciones/catalog/society/update/${id}`,
    body: societyData,
  });
  return response;
};

const addSociety = async (societyData: SocietyType) => {
  const response = await postInfo<SocietyType>({
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
