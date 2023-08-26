import { defineConfig, devices } from '@playwright/test';

const playwrightConfig = defineConfig({
  testDir: './tests',
  testMatch: /.spec.ts/,
  fullyParallel: true,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ]
});

export default playwrightConfig;
