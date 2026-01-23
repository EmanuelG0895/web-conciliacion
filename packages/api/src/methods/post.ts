"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestPostParams } from "../types";

export async function postInfo<T>({
  endpoint,
  body,
}: RequestPostParams<T>): Promise<APIResponse<T>> {
  return httpRequest<T>({
    endpoint,
    method: "POST",
    body,
  });
}
