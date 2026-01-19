"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestDeleteParams } from "../types";

export async function deleteInfo<T>({
  endpoint,
}: RequestDeleteParams): Promise<APIResponse<T>> {
  return httpRequest<T>({
    endpoint,
    method: "DELETE",
  });
}
