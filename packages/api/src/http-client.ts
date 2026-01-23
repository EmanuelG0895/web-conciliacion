"use server";

import { APIResponse } from "./types";
const BASE_URL = process.env.BASE_URL;

interface HttpRequestParams<TBody = unknown> {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
}

export async function httpRequest<T, TBody = unknown>({
  endpoint,
  method,
  body,
}: HttpRequestParams<TBody>): Promise<APIResponse<T>> {
  try {
    const config: RequestInit = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (body && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(body);
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error Response Body:`, errorText);
      throw new Error(`Error HTTP: ${res.status} - ${errorText}`);
    }

    const response: APIResponse<T> =
      (await res.json()) as APIResponse<T>;

    return { ...response };
  } catch (error) {
    console.error(`Error ${method} ${endpoint}:`, error);

    return {
      status: 500,
      type: "error",
      date: new Date().toISOString(),
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido en el servidor",
      data: [] as unknown as T,
    };
  }
}
