"use server";

import {
  getSocietiesList,
  getSocietyById,
  deleteSociety,
  editSociety,
  addSociety,
  SocietyType,
  DeleteInfo,
} from "@repo/api";

import { revalidatePath } from "next/cache";

export async function GetSocieties() {
  try {
    const societies = await getSocietiesList();
    return { success: true, data: societies };
  } catch (error) {
    console.error("Error obteniendo sociedades:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function GetSocietyById(id: string) {
  try {
    const society = await getSocietyById(id);
    return { success: true, data: society };
  } catch (error) {
    console.error("Error obteniendo sociedad:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function Create(formData: SocietyType) {
  try {
    const response = await addSociety(formData);
    revalidatePath("/sociedades");
    return response;
  } catch (error) {
    console.error("Error creando sociedad:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function Edit(data: SocietyType) {
  try {
    const response = await editSociety({
      id: data.rfc,
      razon_social: data.razon_social,
      num_sociedad_sap: data.num_sociedad_sap,
      ramo_id: data.ramo_id,
      rfc: data.rfc,
      topico_kafka: data.topico_kafka,
    });
    revalidatePath("/sociedades");
    return response;
  } catch (error) {
    console.error("Error editando sociedad:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function Delete(data: DeleteInfo) {
  try {
    const response = await deleteSociety(data);
    revalidatePath("/sociedades");
    return response;
  } catch (error) {
    console.error("Error eliminando sociedad:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
