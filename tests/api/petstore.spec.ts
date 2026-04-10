import { test, expect } from '@playwright/test';

const BASE = 'https://petstore.swagger.io/v2';

/** Petstore often returns ids outside JS safe integer range; use a client id for stable GET/DELETE URLs. */
function uniquePetId(): number {
  return 1_000_000_000 + Math.floor(Math.random() * 1_000_000_000);
}

test.describe('Petstore — /pet', () => {
  test('CRUD smoke', async ({ request }) => {
    const petId = uniquePetId();
    const name = `ai-qa-agent-dog-${Date.now()}`;
    const createRes = await request.post(`${BASE}/pet`, {
      data: {
        id: petId,
        name,
        photoUrls: ['https://example.com/pet.png'],
        status: 'available',
      },
    });
    expect(createRes.ok(), await createRes.text()).toBeTruthy();
    const created = await createRes.json();
    expect(created.id).toBe(petId);

    const getRes = await request.get(`${BASE}/pet/${petId}`);
    expect(getRes.ok()).toBeTruthy();
    const fetched = await getRes.json();
    expect(fetched.name).toBe(name);

    const updateRes = await request.put(`${BASE}/pet`, {
      data: {
        ...fetched,
        name: `${name}-renamed`,
      },
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.name).toBe(`${name}-renamed`);

    const delRes = await request.delete(`${BASE}/pet/${petId}`);
    expect(delRes.ok()).toBeTruthy();
  });

  test('negative: GET after DELETE returns 404', async ({ request }) => {
    const petId = uniquePetId();
    const createRes = await request.post(`${BASE}/pet`, {
      data: {
        id: petId,
        name: `ai-qa-agent-negative-${Date.now()}`,
        photoUrls: [],
        status: 'available',
      },
    });
    expect(createRes.ok()).toBeTruthy();
    await request.delete(`${BASE}/pet/${petId}`);
    const res = await request.get(`${BASE}/pet/${petId}`);
    expect(res.status()).toBe(404);
  });
});
