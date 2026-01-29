"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestPostParams } from "../types";

export async function postInfo<TResponse, TBody>({
  endpoint,
  body,
}: RequestPostParams<TBody>): Promise<APIResponse<TResponse>> {
  return httpRequest<TResponse, TBody>({
    endpoint,
    method: "POST",
    body,
  });
}
