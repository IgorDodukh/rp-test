import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) { }

  async get(endpoint: string) {
    const response = await this.request.get(endpoint);
    await this.validateResponse(response);
    return response.json();
  }

  async post(endpoint: string, payload: Record<string, any>) {
    const response = await this.request.post(endpoint, {
      data: payload,
    });
    await this.validateResponse(response);
    return response.json();
  }

  async put(endpoint: string, payload: Record<string, any>) {
    const response = await this.request.put(endpoint, {
      data: payload,
    });
    await this.validateResponse(response);
    return response.json();
  }

  async delete(endpoint: string) {
    const response = await this.request.delete(endpoint);
    await this.validateResponse(response);
    return response.json();
  }

  private async validateResponse(response: APIResponse) {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBeLessThan(400);
  }
}