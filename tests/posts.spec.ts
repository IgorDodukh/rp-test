import { test, expect, APIRequestContext, request as playwrightRequest } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import { program } from 'commander';

test.describe('Post API Tests', () => {
  let apiClient: ApiClient;
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    program.option('--baseUrl');
    program.option('--apiKey');
    program.option('--env');
    program.parse(process.argv);

    // Manually create a new APIRequestContext
    apiContext = await playwrightRequest.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com', // Define base URL here or use from config
    });

    apiClient = new ApiClient(apiContext);
  });

  test('should fetch all posts', async () => {
    const posts = await apiClient.get('/posts');
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);

    const options = program.opts();

    console.log("Base URL:", options.baseUrl);
    console.log("API Key:", options.apiKey);
    console.log("Environment:", options.env);
  });

  test('should fetch all posts again', async () => {
    const posts = await apiClient.get('/posts');
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);
  });

  test('should create a new post', async () => {
    const payload = {
      title: 'Test Post',
      body: 'This is a test post body.',
      userId: 1,
    };
    const newPost = await apiClient.post('/posts', payload);
    expect(newPost.title).toBe(payload.title);
    expect(newPost.body).toBe(payload.body);
  });

  test('should update a post', async () => {
    const updatedPost = await apiClient.put('/posts/1', {
      title: 'Updated Title',
    });
    expect(updatedPost.title).toBe('Updated Title');
  });

  test('should delete a post', async () => {
    const response = await apiClient.delete('/posts/1');
    expect(response).toEqual({});
  });
});