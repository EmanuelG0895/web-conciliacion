"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestPutParams } from "../types";

export async function putInfo<T, TBody = unknown>({
  endpoint,
  body,
}: RequestPutParams<TBody>): Promise<APIResponse<T>> {
  return httpRequest<T, TBody>({
    endpoint,
    method: "PUT",
    body,
  });
}
