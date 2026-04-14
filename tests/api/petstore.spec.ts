import { test, expect } from '@playwright/test';

/**
 * Plan: tests/plans/petstore-plan.md (SC-API-1 … SC-API-4)
 * Paths are relative to `baseURL` in playwright.config.ts (`…/v2/` must end with `/`).
 */
test.describe('@api Petstore', () => {
  test('@smoke Get pet by ID returns 200 or 404', async ({ request }) => {
    await test.step('Given GET /pet/{id}', async () => {
      const res = await request.get('pet/1');
      expect([200, 404]).toContain(res.status());
    });
  });

  test('Find pets by status available returns 200 and array', async ({ request }) => {
    await test.step('When GET /pet/findByStatus?status=available', async () => {
      const res = await request.get('pet/findByStatus?status=available');
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
    });
  });

  test('Store inventory returns 200 and JSON object', async ({ request }) => {
    await test.step('When GET /store/inventory', async () => {
      const res = await request.get('store/inventory');
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body).toBeTruthy();
      expect(typeof body).toBe('object');
      expect(Array.isArray(body)).toBe(false);
    });
  });

  test('Invalid pet ID returns 4xx', async ({ request }) => {
    await test.step('When GET /pet/{non-numeric id}', async () => {
      const res = await request.get('pet/abc');
      expect(res.status()).toBeGreaterThanOrEqual(400);
      expect(res.status()).toBeLessThan(500);
    });
  });
});
