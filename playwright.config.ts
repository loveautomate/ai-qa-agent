import { defineConfig, devices } from '@playwright/test';

/**
 * Demo targets for this repo. Change these when pointing tests at another app or environment,
 * then update specs and `tests/plans/*.md` to match (selectors, flows, API paths).
 */
/** Placeholder when this branch has no bundled UI demo (`api-test` focuses on Petstore API). */
const DEMO_E2E_BASE_URL = 'https://example.com/';
/** Trailing `/` so `request.get('pet/1')` resolves under `/v2/` (Playwright URL merge). */
const DEMO_API_BASE_URL = 'https://petstore.swagger.io/v2/';

/** `npm run test:report` sets this: full trace + video + screenshots for HTML report viewers. */
const reportAll = process.env.PW_REPORT_ALL === '1';

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
  reporter: reportAll
    ? [
        ['list'],
        ['html', { open: 'always', title: 'AI QA Agent — traces & video' }],
      ]
    : 'html',
  use: {
    trace: reportAll ? 'on' : 'retain-on-failure',
    screenshot: reportAll ? 'on' : 'only-on-failure',
    video: reportAll ? 'on' : 'off',
  },

  projects: [
    {
      name: 'e2e-chromium',
      testMatch: '**/e2e/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: DEMO_E2E_BASE_URL,
        // Many apps use `data-test` (not default `data-testid`); adjust when targeting a real UI.
        testIdAttribute: 'data-test',
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      timeout: 60_000,
      use: {
        baseURL: DEMO_API_BASE_URL,
      },
    },
  ],
});
