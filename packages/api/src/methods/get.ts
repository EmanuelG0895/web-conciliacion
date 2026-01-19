"use server";

import { httpRequest } from "../http-client";
import { APIResponse, RequestGetParams } from "../types";

export async function getInfo<T>({
  endpoint,
}: RequestGetParams): Promise<APIResponse<T>> {
  return httpRequest<T>({
    endpoint,
    method: "GET",
  });
}

