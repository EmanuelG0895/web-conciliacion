"use server";
import { getBusinessList } from "@repo/api";
import Negocios from "./Negocios";

const page = async () => {
  const BusinessList = await getBusinessList();
  return <Negocios BusinessList={BusinessList} />;
};
export default page;
