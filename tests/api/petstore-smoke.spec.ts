import { test, expect } from '@playwright/test';

/**
 * Plan ref: link generated API specs to `tests/plans/*-plan.md` section IDs when applicable.
 */
test.describe('@smoke @api', () => {
  test('Petstore API responds', async ({ request }) => {
    const res = await request.get('/pet/1');
    expect([200, 404]).toContain(res.status());
  });
});
