import { test, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

/**
 * Plan: tests/plans/petstore-api-plan.md
 * IDs: PET-*
 */
const BASE = 'https://petstore.swagger.io/v2';

/** Petstore often returns ids outside JS safe integer range; use a client id for stable GET/DELETE URLs. */
function uniquePetId(): number {
  return 1_000_000_000 + Math.floor(Math.random() * 1_000_000_000);
}

async function createMinimalPet(
  request: APIRequestContext,
  overrides: { id: number; name: string; status?: string } & Record<string, unknown>,
) {
  const res = await request.post(`${BASE}/pet`, {
    data: {
      photoUrls: [],
      status: 'available',
      ...overrides,
    },
  });
  return res;
}

test.describe('Petstore — /pet', () => {
  test('PET-CRUD — create read update delete smoke', async ({ request }) => {
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

  test('PET-NEG-404 — GET after DELETE returns 404', async ({ request }) => {
    const petId = uniquePetId();
    const createRes = await createMinimalPet(request, {
      id: petId,
      name: `ai-qa-agent-negative-${Date.now()}`,
    });
    expect(createRes.ok()).toBeTruthy();
    await request.delete(`${BASE}/pet/${petId}`);
    const res = await request.get(`${BASE}/pet/${petId}`);
    expect(res.status()).toBe(404);
  });

  test('PET-FIND-STATUS — findByStatus returns array of pets with core fields', async ({ request }) => {
    const res = await request.get(`${BASE}/pet/findByStatus?status=available`);
    expect(res.ok(), await res.text()).toBeTruthy();
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    const first = body[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
  });

  test('PET-GET-MISSING — GET never-created id returns 404', async ({ request }) => {
    const neverCreatedId = uniquePetId();
    const res = await request.get(`${BASE}/pet/${neverCreatedId}`);
    expect(res.status()).toBe(404);
  });

  test('PET-DELETE-TWICE — second DELETE returns 404', async ({ request }) => {
    const petId = uniquePetId();
    const createRes = await createMinimalPet(request, {
      id: petId,
      name: `ai-qa-agent-twice-${Date.now()}`,
    });
    expect(createRes.ok()).toBeTruthy();
    const first = await request.delete(`${BASE}/pet/${petId}`);
    expect(first.ok()).toBeTruthy();
    const second = await request.delete(`${BASE}/pet/${petId}`);
    expect(second.status()).toBe(404);
  });
});
