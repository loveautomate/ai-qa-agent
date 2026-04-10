# Sauce Demo — E2E test plan

**Application:** https://www.saucedemo.com/  
**Type:** UI / browser (Playwright `e2e` project)  
**Automation:** `tests/e2e/saucedemo.spec.ts`  
**Related report:** After `npm test`, set `REPORT_PLAN_PATH` to this file and run `npm run report:md` → `reports/summary.md` (machine **actual result** / **status** per test).  
**Repository conventions:** [`README.md`](README.md) (shared test case fields, title pattern `CASE-ID — …`).

---

## Document control

| Field | Value |
|-------|--------|
| **Scope** | Functional UI paths listed below; no performance benchmarks, no pixel-diff visual baselines unless added later. |
| **Assumptions** | English UI; desktop viewport (e.g. 1280×720); cold start from base URL unless noted. |

---

## How each test case is documented

Every scenario below uses the same fields so plans stay comparable and traceable to runs.

| Field | Purpose |
|-------|--------|
| **Test case ID** | Stable identifier (matches spec title prefix and traceability matrix). |
| **Priority** | P0 = critical path; P1 = important secondary. |
| **Preconditions** | Data, environment, or state **before** steps start. |
| **Steps to reproduce** | Numbered actions a tester (or automation) performs in order. |
| **Expected result** | Observable, checkable outcome if behavior is correct. |
| **Actual result** | What happened when executed — fill **manually** after exploratory runs, or use **`reports/summary.md`** for automated runs (generated from Playwright JSON). |
| **Status** | `Pass` / `Fail` / `Blocked` / `Skipped` / `Not executed` — align with run (manual or CI). |
| **Comment** | Evidence links, defect IDs, data quirks, or why **Blocked** / **Skipped**. |

**Convention:** For automated suites, treat **Expected result** as the acceptance criteria; **Actual result** and **Status** in this file may stay as `—` / `Not executed` and you rely on the generated Markdown report for the latest run.

---

## 1. Application overview

| Area | Notes |
|------|--------|
| Auth | Username/password; personas (standard, locked out, problem, etc.). |
| Catalog | Product list with sort (and filter when present). |
| Cart | Add/remove, badge count, line items and prices. |
| Checkout | Step 1: Your information; Step 2: Overview; Step 3: Complete. |

---

## 2. Preconditions and test data

| Persona | Username | Password | Notes |
|---------|-----------|----------|--------|
| Standard | `standard_user` | `secret_sauce` | Default for happy paths. |
| Locked out | `locked_out_user` | `secret_sauce` | Login must be rejected. |
| Problem user | `problem_user` | `secret_sauce` | Optional chaos / flake experiments. |

Use **standard_user** unless a case requires another persona.

---

## 3. Scenarios — Authentication

### 3.1 Successful login

| Field | Content |
|-------|---------|
| **Test case ID** | AUTH-OK |
| **Priority** | P0 |

**Preconditions**

- Application is reachable.
- Credentials for `standard_user` / `secret_sauce` are valid.

**Steps to reproduce**

1. Open the application base URL (`/`).
2. Enter username `standard_user` and password `secret_sauce`.
3. Submit the login form (Login).

**Expected result**

- URL and view show the inventory (logged-in) experience.
- Inventory container is visible; “Products” (or equivalent heading) is visible.
- At least one product row/card is visible with an add-to-cart control.

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

### 3.2 Failed login — wrong password

| Field | Content |
|-------|---------|
| **Test case ID** | AUTH-BAD-PWD |
| **Priority** | P0 |

**Preconditions**

- None beyond app reachable.

**Steps to reproduce**

1. Open the application base URL.
2. Enter username `standard_user` and an **incorrect** password (not `secret_sauce`).
3. Submit the login form.

**Expected result**

- An error message is shown (e.g. invalid credentials).
- Inventory / logged-in catalog is **not** shown.

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

### 3.3 Failed login — locked out user

| Field | Content |
|-------|---------|
| **Test case ID** | AUTH-LOCKED |
| **Priority** | P1 |

**Preconditions**

- None beyond app reachable.

**Steps to reproduce**

1. Open the application base URL.
2. Enter `locked_out_user` / `secret_sauce`.
3. Submit the login form.

**Expected result**

- Error indicates the account is locked (wording may vary).
- Inventory is not accessible.

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

### 3.4 Logout and session

| Field | Content |
|-------|---------|
| **Test case ID** | AUTH-LOGOUT |
| **Priority** | P1 |

**Preconditions**

- User can open the menu after login (burger menu present).

**Steps to reproduce**

1. Log in as `standard_user` / `secret_sauce`.
2. Open the navigation menu and choose Logout.
3. Optionally navigate directly to a protected inventory URL after logout.

**Expected result**

- Login screen / login controls are shown after logout.
- Inventory content is not shown without logging in again.

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

## 4. Scenarios — Catalog and sorting

### 4.1 Inventory visible after login

| Field | Content |
|-------|---------|
| **Test case ID** | CAT-INV |
| **Priority** | P0 |

**Preconditions**

- Logged in as `standard_user`.

**Steps to reproduce**

1. Complete login as in AUTH-OK.
2. Observe the inventory page.

**Expected result**

- At least one product is listed.
- Each row shows identifiable product information and an add-to-cart (or equivalent) action.

**Actual result**

—  

**Status**

Not executed  

**Comment**

Covered by automated flow inside AUTH-OK (same assertions).  

---

### 4.2 Sort products

| Field | Content |
|-------|---------|
| **Test case ID** | CAT-SORT |
| **Priority** | P1 |

**Preconditions**

- Logged in as `standard_user`.

**Steps to reproduce**

1. On the inventory page, locate the product sort control (e.g. dropdown).
2. Note the first product name (or price) in the list.
3. Change sort order (e.g. Name Z–A or Price low to high).
4. Observe the first product in the list again.

**Expected result**

- Sort control applies: first visible product changes in a way consistent with the selected option (assert on first item title or price as appropriate).

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

### 4.3 Add multiple distinct products (cart badge)

| Field | Content |
|-------|---------|
| **Test case ID** | CAT-MULTI / CART-BADGE |
| **Priority** | P1 |

**Preconditions**

- Logged in as `standard_user`.

**Steps to reproduce**

1. Add one product to the cart from inventory; note the cart badge.
2. Add a **second different** product to the cart.
3. Open the cart page.

**Expected result**

- Cart badge shows **2** after two adds.
- Cart lists two distinct line items with correct titles (and prices if shown).

**Actual result**

—  

**Status**

Not executed  

**Comment**

Single automated test covers both IDs.  

---

## 5. Scenarios — Cart

### 5.1 Single item add and remove

| Field | Content |
|-------|---------|
| **Test case ID** | CART-ADD-REMOVE |
| **Priority** | P1 |

**Preconditions**

- Logged in as `standard_user`.

**Steps to reproduce**

1. Add one item to the cart from inventory.
2. Open the cart.
3. Remove that line item using the Remove control.

**Expected result**

- Cart is empty or badge shows **0**; removed item no longer listed.

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

### 5.2 Continue shopping

| Field | Content |
|-------|---------|
| **Test case ID** | CART-CONTINUE |
| **Priority** | P1 |

**Preconditions**

- Logged in as `standard_user`.

**Steps to reproduce**

1. Add one product; open cart.
2. Use **Continue shopping** (if shown) to return to inventory.
3. Add a second product; return to cart.

**Expected result**

- Cart shows **2** items (badge and line items consistent).

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

## 6. Scenarios — Checkout

### 6.1 Happy path — full checkout

| Field | Content |
|-------|---------|
| **Test case ID** | CHK-HAPPY |
| **Priority** | P0 |

**Preconditions**

- Logged in; at least one item in cart.

**Steps to reproduce**

1. Open cart and start checkout.
2. On step 1, enter valid first name, last name, and postal code.
3. Continue to overview, then complete/finish the order.

**Expected result**

- Order completes with a thank-you / confirmation header (no blocking error banners).

**Actual result**

—  

**Status**

Not executed  

**Comment**

—  

---

### 6.2 Validation — empty mandatory fields

| Field | Content |
|-------|---------|
| **Test case ID** | CHK-VAL-EMPTY |
| **Priority** | P1 |

**Preconditions**

- On checkout step 1 (your information).

**Steps to reproduce**

1. Leave first name, last name, and postal code empty (or as required empty).
2. Attempt to continue to the next step.

**Expected result**

- User cannot proceed; inline or summary errors are shown for missing required fields.

**Actual result**

—  

**Status**

Not executed  

**Comment**

Automation asserts error banner + URL remains on step one.  

---

### 6.3 Validation — postal code format

| Field | Content |
|-------|---------|
| **Test case ID** | CHK-VAL-ZIP |
| **Priority** | P2 |

**Preconditions**

- On checkout step 1.

**Steps to reproduce**

1. Enter valid-looking names.
2. Enter an invalid postal pattern if the UI validates format (e.g. letters-only).
3. Attempt to continue.

**Expected result**

- If client validation exists: error state or message. If not: document as N/A.

**Actual result**

—  

**Status**

Not executed  

**Comment**

Not automated — no stable client-side rule documented for Sauce Demo.  

---

## 7. Non-functional checks (lightweight)

| Check | How |
|-------|-----|
| Stability | Prefer `getByRole`, `data-test`; rely on Playwright auto-wait, not fixed sleeps. |
| Evidence | On failure, use trace/screenshots from Playwright config. |
| Flakes | Isolate optional “problem user” cases in separately named tests. |

---

## 8. Traceability matrix

| Test case ID | Section | Automated in `saucedemo.spec.ts` | Priority |
|--------------|---------|-----------------------------------|----------|
| AUTH-OK | §3.1 | Yes | P0 |
| AUTH-BAD-PWD | §3.2 | Yes | P0 |
| AUTH-LOCKED | §3.3 | Yes | P1 |
| AUTH-LOGOUT | §3.4 | Yes | P1 |
| CAT-INV | §4.1 | Yes (within AUTH-OK) | P0 |
| CAT-SORT | §4.2 | Yes | P1 |
| CAT-MULTI / CART-BADGE | §4.3 | Yes (one test) | P1 |
| CART-ADD-REMOVE | §5.1 | Yes | P1 |
| CART-CONTINUE | §5.2 | Yes | P1 |
| CHK-HAPPY | §6.1 | Yes | P0 |
| CHK-VAL-EMPTY | §6.2 | Yes | P1 |
| CHK-VAL-ZIP | §6.3 | No | P2 |

---

## 9. Execution

```bash
npx playwright test --project=e2e
```

Generate standardized Markdown report from JSON. Point the report at this plan so **Steps** in `reports/summary.md` match these test case IDs:

```bash
# PowerShell
$env:REPORT_PLAN_PATH = "tests/plans/saucedemo-plan.md"; npm run report:md

# Unix
REPORT_PLAN_PATH=tests/plans/saucedemo-plan.md npm run report:md
```

If `REPORT_PLAN_PATH` is unset, the generator defaults to `tests/plans/README.md` (see repository-wide conventions).

MCP may be used during **authoring** only; execution is **Playwright Test CLI** as above.
