# Swagger Petstore — API test plan

**Base URL:** `https://petstore.swagger.io/v2`  
**Execution:** Playwright `request` fixture (`tests/api/petstore.spec.ts`).  
**Related report:** `REPORT_PLAN_PATH=tests/plans/petstore-api-plan.md` then `npm run report:md`  
**Repository conventions:** [`docs/test-plans.md`](../docs/test-plans.md)

---

## Scenarios

### 1. Pet CRUD smoke (`PET-CRUD`)

**Steps:** `POST /pet` → `GET /pet/{id}` → `PUT /pet` → `DELETE /pet/{id}`.

**Expected:** Success responses; names and ids align through the flow.

---

### 2. Negative — GET after delete (`PET-NEG-404`)

**Steps:** Create pet, `DELETE`, then `GET /pet/{id}`.

**Expected:** `GET` returns **404**.

---

### 3. Query — find by status (`PET-FIND-STATUS`)

**Steps:** `GET /pet/findByStatus?status=available`.

**Expected:** **200**; JSON **array** with at least one pet; entries include `id` and `name`.

---

### 4. Negative — missing pet (`PET-GET-MISSING`)

**Steps:** `GET /pet/{id}` for an id that was **never** created (random high id).

**Expected:** **404**.

---

### 5. Negative — double delete (`PET-DELETE-TWICE`)

**Steps:** Create pet, `DELETE /pet/{id}`, `DELETE /pet/{id}` again.

**Expected:** First delete succeeds; second returns **404**.

---

## Traceability

| Test case ID | Automated |
|--------------|-----------|
| PET-CRUD | Yes |
| PET-NEG-404 | Yes |
| PET-FIND-STATUS | Yes |
| PET-GET-MISSING | Yes |
| PET-DELETE-TWICE | Yes |

---

## Execution

```bash
npx playwright test --project=api
```
