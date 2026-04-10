import { test, expect } from '@playwright/test';

const BASE = 'https://petstore.swagger.io/v2';

test.describe('Petstore — /pet', () => {
  test('CRUD smoke', async ({ request }) => {
    const createRes = await request.post(`${BASE}/pet`, {
      data: {
        name: `ai-qa-agent-dog-${Date.now()}`,
        photoUrls: ['https://example.com/pet.png'],
        status: 'available',
      },
    });
    expect(createRes.ok(), await createRes.text()).toBeTruthy();
    const created = await createRes.json();
    const id = Number(created.id);
    expect(id).toBeGreaterThan(0);

    const getRes = await request.get(`${BASE}/pet/${id}`);
    expect(getRes.ok()).toBeTruthy();
    const fetched = await getRes.json();
    expect(fetched.name).toBe(created.name);

    const updateRes = await request.put(`${BASE}/pet`, {
      data: {
        ...fetched,
        name: `${fetched.name}-renamed`,
      },
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.name).toBe(`${created.name}-renamed`);

    const delRes = await request.delete(`${BASE}/pet/${id}`);
    expect(delRes.ok()).toBeTruthy();
  });

  test('negative: GET after DELETE returns 404', async ({ request }) => {
    const createRes = await request.post(`${BASE}/pet`, {
      data: {
        name: `ai-qa-agent-negative-${Date.now()}`,
        photoUrls: [],
        status: 'available',
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const { id } = await createRes.json();
    await request.delete(`${BASE}/pet/${id}`);
    const res = await request.get(`${BASE}/pet/${id}`);
    expect(res.status()).toBe(404);
  });
});
