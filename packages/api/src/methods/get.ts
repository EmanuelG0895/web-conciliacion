"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestGetParams } from "../types";

export async function getInfo<TResponse>({
  endpoint,
}: RequestGetParams): Promise<APIResponse<TResponse>> {
  return httpRequest<TResponse>({
    endpoint,
    method: "GET",
  });
}
