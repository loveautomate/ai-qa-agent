# Sauce Demo — Test execution report

**Date:** 2026-04-14  
**Plan:** `tests/plans/saucedemo-plan.md`  
**Spec:** `tests/e2e/saucedemo.spec.ts`  
**Environment:** `DEMO_E2E_BASE_URL` = `https://www.saucedemo.com/` (`playwright.config.ts`)

---

## Executive summary

All targeted Sauce Demo scenarios **passed**. The e2e project `e2e-chromium` completed with **5 passed** (4 Sauce Demo cases + 1 seed placeholder), **0 failed**.

---

## Scope and out of scope

**In scope:** Login (happy path, invalid credentials, locked user), inventory add-to-cart badge (SC-2.1 in plan).

**Out of scope:** Full checkout, Petstore API (separate project), performance/visual testing.

---

## Execution metrics

| Metric        | Value |
|---------------|-------|
| Project       | e2e-chromium |
| Tests run     | 5 |
| Passed        | 5 |
| Failed        | 0 |
| Flaky         | Not observed (single run) |

---

## Traceability (plan → tests)

| Plan scenario | Test (Playwright title) |
|---------------|-------------------------|
| SC-1.1 | `@smoke Successful login reaches inventory` |
| SC-1.2 | `Invalid credentials show error` |
| SC-1.3 | `Locked out user cannot log in` |
| SC-2.1 | `Add first item to cart updates badge` |

---

## Incidents, deviations, healing

None. No code changes were required after the first e2e run.

---

## Limitations and recommendations

- Assertions depend on live `saucedemo.com` content and layout; regressions on the demo site could break tests unrelated to local code changes.
- For CI stability, consider pinning runs to a known-good window or mirroring the demo if the vendor changes UI copy or `data-test` hooks.

---

## Appendix — Playwright HTML report

- **Local file:** `playwright-report/index.html` (repository root)
- **CLI:** `npx playwright show-report`

A full-artifact run was executed with `npm run test:report` (trace, video, screenshots enabled via `PW_REPORT_ALL=1`). Use the HTML report UI to open per-test **traces** and **videos** for spot-checks.
