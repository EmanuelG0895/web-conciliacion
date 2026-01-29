import { getInfo } from "../methods";
import { RamosType } from "../types";

const getBranchList = async (): Promise<RamosType[]> => {
  const response = await getInfo<RamosType[]>({
    endpoint: "/backoffice/sazconciliaciones/catalog/branch",
  });
  return response?.data ?? [];
};

export { getBranchList };
