import { test, expect, APIRequestContext, request as playwrightRequest } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import dotenv from 'dotenv';

dotenv.config();


test.describe('Post API Tests', () => {
  let apiClient: ApiClient;
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {

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

    console.log("MISSION_ID:", process.env.MISSION_ID);
    console.log("INCLUSIONS:", process.env.INCLUSIONS);
    console.log("EXCLUSIONS:", process.env.EXCLUSIONS);
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