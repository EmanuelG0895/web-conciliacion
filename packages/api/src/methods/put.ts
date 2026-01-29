"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestPutParams } from "../types";

export async function putInfo<TResponse, TBody>({
  endpoint,
  body,
}: RequestPutParams<TBody>): Promise<APIResponse<TResponse>> {
  return httpRequest<TResponse, TBody>({
    endpoint,
    method: "PUT",
    body,
  });
}
