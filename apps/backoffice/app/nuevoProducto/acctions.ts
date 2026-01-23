"use server"
import { DeleteInfo, deleteProduct } from "@repo/api";
import { revalidatePath } from "next/cache";

export const Delete = async ({ id }: DeleteInfo) => {
  try {
    const response = await deleteProduct({ id: id });
    revalidatePath("/nuevoProducto");
    return response;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};