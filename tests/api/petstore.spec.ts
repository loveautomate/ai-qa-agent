import { test, expect } from '@playwright/test';

const BASE = 'https://petstore.swagger.io/v2';

test.describe('Petstore — /pet', () => {
  test('CRUD smoke', async ({ request }) => {
    const createRes = await request.post(`${BASE}/pet`, {
      data: {
        id: 0,
        name: 'ai-qa-agent-dog',
        photoUrls: ['https://example.com/pet.png'],
        status: 'available',
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const created = await createRes.json();
    const id = created.id as number;
    expect(id).toBeGreaterThan(0);

    const getRes = await request.get(`${BASE}/pet/${id}`);
    expect(getRes.ok()).toBeTruthy();
    const fetched = await getRes.json();
    expect(fetched.name).toBe('ai-qa-agent-dog');

    const updateRes = await request.put(`${BASE}/pet`, {
      data: {
        ...fetched,
        name: 'ai-qa-agent-dog-renamed',
      },
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.name).toBe('ai-qa-agent-dog-renamed');

    const delRes = await request.delete(`${BASE}/pet/${id}`);
    expect(delRes.ok()).toBeTruthy();
  });

  test('negative: missing pet returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/pet/9223372036854775807`);
    expect(res.status()).toBe(404);
  });
});
