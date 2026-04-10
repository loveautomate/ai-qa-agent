import { test, expect } from '@playwright/test';

/**
 * Seed test: keep minimal so Planner/Generator agents have a template.
 * Replace with your app’s real setup (auth, base URL, fixtures) per target.
 * Framework-only `main` uses a no-op navigation so CI stays deterministic.
 */
test.describe('seed', () => {
  test('bootstrap', async ({ page }) => {
    await page.goto('about:blank');
    await expect(page).toHaveURL(/^about:blank$/);
  });
});
