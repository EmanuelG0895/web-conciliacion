"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestPostParams } from "../types";

export async function postInfo<T, TBody = unknown>({
  endpoint,
  body,
}: RequestPostParams<TBody>): Promise<APIResponse<T>> {
  return httpRequest<T, TBody>({
    endpoint,
    method: "POST",
    body,
  });
}
