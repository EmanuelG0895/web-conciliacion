"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestDeleteParams } from "../types";

export async function deleteInfo<TResponse>({
  endpoint,
}: RequestDeleteParams): Promise<APIResponse<TResponse>> {
  return httpRequest<TResponse>({
    endpoint,
    method: "DELETE",
  });
}
