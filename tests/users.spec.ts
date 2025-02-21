import { test, expect, APIRequestContext, request as playwrightRequest } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';

test.describe('User API Tests', () => {
  let apiClient: ApiClient;
  let apiContext: APIRequestContext;

  let users: any[];
  let user: any;

  test.beforeAll(async () => {
    // Manually create a new APIRequestContext
    apiContext = await playwrightRequest.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com', // Define base URL here or use from config
    });

    apiClient = new ApiClient(apiContext);
  });

  test.afterAll(async () => {
    // Dispose of the APIRequestContext after all tests
    await apiContext.dispose();
  });

  test('should fetch a list of users', async () => {
    const users = await apiClient.get('/users');
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });

  test('should fetch a user by ID', async () => {
    const user = await apiClient.get('/users/1');
    expect(user.id).toBe(1);
    expect(user.name).toBeDefined();
  });

  test('should create a new user', async () => {
    const payload = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    };
    const newUser = await apiClient.post('/users', payload);
    expect(newUser.name).toBe(payload.name);
    expect(newUser.email).toBe(payload.email);
  });
});