"use server";
import {
  AddInfo,
  DeleteInfo,
  ProductType,
  addProduct,
  deleteProduct,
  editProduct,
} from "@repo/api";
import { revalidatePath } from "next/cache";

export const Delete = async ({ id }: DeleteInfo) => {
  try {
    const response = await deleteProduct({ id: id });
    revalidatePath("/nuevoProducto");
    return {
      ...response,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      type: "error",
      date: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Error desconocido",
      data: null,
    };
  }
};

export const Edit = async ({
  id,
  ...productData
}: { id: string } & Partial<ProductType>) => {
  try {
    const response = await editProduct({ id, ...productData });
    revalidatePath("/nuevoProducto");
    return {
      ...response,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      type: "error",
      date: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Error desconocido",
      data: null,
    };
  }
};

export const Create = async (productData: AddInfo) => {
  try {
    const response = await addProduct(productData);
    revalidatePath("/nuevoProducto");
    return {
      ...response,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      type: "error",
      date: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Error desconocido",
      data: null,
    };
  }
};
