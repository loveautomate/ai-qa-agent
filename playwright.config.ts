import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const e2eBaseURL = process.env.E2E_BASE_URL ?? 'https://www.saucedemo.com/';
const apiBaseURL = process.env.API_BASE_URL ?? 'https://petstore.swagger.io/v2';

/**
 * See https://playwright.dev/docs/test-configuration.
 * UI (`e2e-chromium`) and API (`api`) are separate projects with distinct timeouts and base URLs.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'e2e-chromium',
      testMatch: '**/e2e/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: e2eBaseURL,
        // Saucedemo and many apps use `data-test` (not default `data-testid`)
        testIdAttribute: 'data-test',
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      timeout: 60_000,
      use: {
        baseURL: apiBaseURL,
      },
    },
  ],
});
