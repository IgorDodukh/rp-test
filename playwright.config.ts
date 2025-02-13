import { PlaywrightTestConfig } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
//   timeout: 30000,
//   retries: 1,
//   use: {
//     baseURL: 'https://jsonplaceholder.typicode.com',
//   },
// });

// const RPconfig = {
//     apiKey: 'playwright__5iMyhS2TcGmvL7TL3pdxrR127B02tlKf3VRVAaDVh0QFxmfJrexdPbWMcQaz4PY',
//     endpoint: 'http://localhost:8080/api/v1',
//     project: 'default_personal',
//     launch: 'local-28-01-2025-1',
//     attributes: [
//       {
//         key: 'agent',
//         value: 'playwright',
//         },
//       {
//         value: 'demo',
//       },
//     ],
//     description: 'This is an example launch with playwright tests',
//     includeTestSteps: true,
//     skippedIssue: false,  
//   };

  const config: PlaywrightTestConfig = {
    reporter: [["json", { outputFile: 'test-results/results.json' }]],
    // reporter: [["line"], ["allure-playwright"]],

    testDir: './tests',
    timeout: 30000,
    retries: 1,
    use: {
      baseURL: 'https://jsonplaceholder.typicode.com',
    },
  };

  export default config;
