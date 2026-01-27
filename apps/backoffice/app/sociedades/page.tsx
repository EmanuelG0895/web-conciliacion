"use server";
import Sociedades from "./Sociedades";
import { GetSocieties } from "./accions";

export default async function Page() {
  const societiesResponse = await GetSocieties();
  
  const sociedades = societiesResponse.success 
    ? societiesResponse.data || []
    : [];

  const tableHeader = sociedades.length > 0 && sociedades[0]
    ? Object.keys(sociedades[0]).map(key => ({ key: key, label: key }))
    : ["ramo_id", "razon_social", "rfc", "num_sociedad_sap", "topico_kafka"].map(key => ({ key: key, label: key }));

  return <Sociedades data={sociedades} tableHeader={tableHeader} />;
}
