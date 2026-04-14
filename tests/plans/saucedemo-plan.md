# Sauce Demo — Test Plan

## Application overview

[Sauce Demo](https://www.saucedemo.com/) is a sample e-commerce UI used for automation practice. It provides a login screen, product inventory, cart, and checkout flows. Credentials are documented on the login page; password for standard users is `secret_sauce`.

**Environment:** `DEMO_E2E_BASE_URL` in `playwright.config.ts` (default `https://www.saucedemo.com/`).

---

## Test scenarios

### SC-1.1 — Successful login (happy path)

**Goal:** A valid user can sign in and reach the inventory page.

**Steps:**

1. Open the base URL (login page).
2. Enter username `standard_user` and password `secret_sauce`.
3. Submit login.

**Expected results:**

- URL contains `inventory`.
- Page shows the products listing (e.g. title “Products”).
- User session is active (e.g. inventory items or header visible).

**Traceability:** `tests/e2e/saucedemo.spec.ts` — “Successful login reaches inventory”.

---

### SC-1.2 — Invalid credentials

**Goal:** Wrong password is rejected with a clear error.

**Steps:**

1. Open the login page.
2. Enter `standard_user` and an incorrect password (e.g. `wrong_password`).
3. Submit login.

**Expected results:**

- User remains on the login page (URL does not navigate to inventory).
- An error message indicates authentication failure.

**Traceability:** `tests/e2e/saucedemo.spec.ts` — “Invalid credentials show error”.

---

### SC-1.3 — Locked-out user

**Goal:** A locked account cannot sign in.

**Steps:**

1. Open the login page.
2. Enter username `locked_out_user` and password `secret_sauce`.
3. Submit login.

**Expected results:**

- User does not reach the inventory page.
- Error message indicates the account is locked out.

**Traceability:** `tests/e2e/saucedemo.spec.ts` — “Locked out user cannot log in”.

---

### SC-2.1 — Add to cart from inventory

**Goal:** User can add a product and see the cart badge update.

**Steps:**

1. Log in as `standard_user`.
2. Add the first product to the cart (e.g. “Add to cart” for the first item).
3. Observe the shopping cart link/badge.

**Expected results:**

- Cart badge shows at least one item (or cart reflects added product).

**Traceability:** `tests/e2e/saucedemo.spec.ts` — “Add first item to cart updates badge”.

---

## Out of scope (this plan)

- Full checkout and payment
- Performance or visual regression
- API testing (covered separately under Petstore in this repo)
