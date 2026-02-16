import {
  test,
  request,
  APIResponse,
  APIRequestContext,
} from "@playwright/test";
import * as allure from "allure-js-commons";

export abstract class BaseApiClient {
  constructor(protected baseURL: string | undefined) {
    if (!baseURL) {
      throw new Error('URL not found')
    } else {
      this.baseURL = baseURL
    }
  }

  protected async request(
    method: string,
    endpoint: string,
    options: Parameters<APIRequestContext["fetch"]>[1] = {},
  ): Promise<APIResponse> {
    return await test.step(`API request: ${method}: ${endpoint}`, async () => {
      const context = await request.newContext({
        baseURL: this.baseURL,
      });

      const url = `${this.baseURL}${endpoint}`;

      const response = await context.fetch(url, { method, ...options });

      allure.attachment(
        "API request",
        JSON.stringify({
          method,
          url,
          options,
          status: response.status(),
          statusText: response.statusText(),
        }, null, 2),
        allure.ContentType.JSON,
      );

      return response;
    });
  }

  protected async get(
    endpoint: string,
    headers?: Record<string, string>,
  ) {
    return this.request("GET", endpoint, { headers });
  }

  protected async post(
    endpoint: string,
    data?: Record<string, unknown>,
    headers?: Record<string, string>,
  ) {
    console.log(headers);
    return this.request("POST", endpoint, {
      headers: { "Content-Type": "application/json", ...headers },
      data
    });
  }

  protected async put(
    endpoint: string,
    data?: Record<string, string>,
    headers?: Record<string, string>,
  ) {
    return this.request("PUT", endpoint, {
      headers: { "Content-Type": "application/json", ...headers },
      data
    });
  }

  protected async delete(
    endpoint: string,
    headers?: Record<string, string>,
  ) {
    return this.request("DELETE", endpoint, { headers });
  }
}

export type Response<T> = {
  response: APIResponse;
  validated: T;
};
