# Petstore API (Swagger demo) — Test Plan

## Application overview

The public [Swagger Petstore](https://petstore.swagger.io/) demo API (`v2`) exposes REST resources for **pets**, **store**, and **users**. This plan targets read-only smoke coverage suitable for CI against `https://petstore.swagger.io/v2`.

**Environment:** `DEMO_API_BASE_URL` in `playwright.config.ts` (default `https://petstore.swagger.io/v2/` — trailing slash required so relative paths like `pet/1` resolve under `/v2/`).

---

## Test scenarios

### SC-API-1 — Get pet by ID

**Goal:** Retrieving a pet by numeric ID returns a valid HTTP response.

**Steps:**

1. `GET /pet/{petId}` with a known ID (e.g. `1`).

**Expected results:**

- Status code is `200` (pet found) or `404` (not found), both acceptable for a shared demo dataset.

**Traceability:** `tests/api/petstore.spec.ts` — “Get pet by ID returns 200 or 404”.

---

### SC-API-2 — Find pets by status

**Goal:** Listing pets by status returns JSON array.

**Steps:**

1. `GET /pet/findByStatus?status=available`.

**Expected results:**

- Status code `200`.
- Response body parses as JSON array (may be empty).

**Traceability:** `tests/api/petstore.spec.ts` — “Find pets by status available returns 200 and array”.

---

### SC-API-3 — Store inventory

**Goal:** Store inventory endpoint responds.

**Steps:**

1. `GET /store/inventory`.

**Expected results:**

- Status code `200`.
- Response body parses as JSON object (status counts).

**Traceability:** `tests/api/petstore.spec.ts` — “Store inventory returns 200 and JSON object”.

---

### SC-API-4 — Invalid pet ID (negative)

**Goal:** Malformed path is rejected or handled consistently.

**Steps:**

1. `GET /pet/not-a-number` (or similar invalid ID).

**Expected results:**

- Status code is `400` or `404` (demo API behavior).

**Traceability:** `tests/api/petstore.spec.ts` — “Invalid pet ID returns 4xx”.

---

## Out of scope

- Mutating operations (`POST`/`PUT`/`DELETE`) requiring API key consistency
- Load and security testing
