# Petstore API — Test execution report

**Date:** 2026-04-14  
**Plan:** `tests/plans/petstore-plan.md`  
**Spec:** `tests/api/petstore.spec.ts`  
**Environment:** `DEMO_API_BASE_URL` = `https://petstore.swagger.io/v2/` (`playwright.config.ts`)

---

## Executive summary

Petstore API smoke tests **passed**. Project `api`: **4 passed**, **0 failed**.

---

## Scope and out of scope

**In scope:** Read-only checks — get pet by ID, find by status, store inventory, invalid pet id (SC-API-1 … SC-API-4).

**Out of scope:** Mutating Petstore calls, auth-heavy flows, load testing.

---

## Execution metrics

| Metric | Value |
|--------|--------|
| Project | api |
| Tests run | 4 |
| Passed | 4 |
| Failed | 0 |

Full repo run (`npm test`, e2e + api): expect **5 passed** (1 e2e placeholder `seed` + 4 api) when only `tests/e2e/seed.spec.ts` ships for UI.

---

## Traceability (plan to tests)

| Plan scenario | Test title |
|---------------|------------|
| SC-API-1 | `@smoke Get pet by ID returns 200 or 404` |
| SC-API-2 | `Find pets by status available returns 200 and array` |
| SC-API-3 | `Store inventory returns 200 and JSON object` |
| SC-API-4 | `Invalid pet ID returns 4xx` |

---

## Incidents, deviations, healing

**Healing:** Initial failures (404 on `findByStatus` / `inventory`) were caused by **base URL merge**: `DEMO_API_BASE_URL` lacked a **trailing slash**, so relative paths like `pet/1` resolved to `https://petstore.swagger.io/pet/1` instead of `…/v2/pet/1`. **Fix:** set `https://petstore.swagger.io/v2/` in `playwright.config.ts` and document in the plan.

---

## Limitations and recommendations

- Public demo API availability and data may change; keep assertions tolerant where appropriate (e.g. pet `1` may be 200 or 404).

---

## Appendix

- **HTML report:** `playwright-report/index.html` after `npm run test:api` or `npm test` — `npx playwright show-report`
- **API-only validation command:** `npm run test:api`
