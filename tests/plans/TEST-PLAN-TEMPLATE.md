# Feature / application name — test plan

**Target:** URL or API base  
**Type:** UI | API | mixed  
**Automation:** path to specs (e.g. `tests/e2e/*.spec.ts`)

---

## Document control

| Field | Value |
|-------|--------|
| **Scope** | What is in / out of scope |
| **Assumptions** | Locale, environment, data |

---

## How each test case is documented

Every scenario below uses the same fields: **Test case ID**, **Priority**, **Preconditions**, **Steps to reproduce**, **Expected result**, **Actual result**, **Status**, **Comment** (see [`README.md`](README.md) in this folder).

---

## 1. Overview

| Area | Notes |
|------|--------|
| Area A | Short description |

---

## 2. Preconditions and test data

| Role / data | Value | Notes |
|-------------|--------|--------|
| User or token | … | … |

---

## 3. Scenarios — group name

### 3.1 Short title

| Field | Content |
|-------|---------|
| **Test case ID** | PREFIX-001 |
| **Priority** | P0 |

**Preconditions**

- …

**Steps to reproduce**

1. …
2. …

**Expected result**

- …

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

## 4. Traceability matrix

| Test case ID | Section | Automated | Priority |
|--------------|---------|-----------|----------|
| PREFIX-001 | §3.1 | No | P0 |

---

## 5. Execution

```bash
npx playwright test --project=e2e   # or api / seed as appropriate
npm run report:md                     # after setting REPORT_PLAN_PATH to this file if needed
```
