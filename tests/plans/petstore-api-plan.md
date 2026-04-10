# Swagger Petstore — API test plan

**Base URL:** `https://petstore.swagger.io/v2`  
**Execution:** Playwright `request` fixture (`tests/api/*.spec.ts`).

## Scenarios

### 1. Pet CRUD smoke

**Steps:**

1. `POST /pet` with JSON body (name, photoUrls, status).
2. `GET /pet/{id}` from response id.
3. `PUT /pet` with updated name.
4. `DELETE /pet/{id}`.

**Expected:** 200 responses; body reflects created/updated pet.

### 2. Negative

**Steps:**

1. Create a pet, `DELETE /pet/{id}`, then `GET /pet/{id}`.

**Expected:** `GET` returns **404** (pet no longer exists).
