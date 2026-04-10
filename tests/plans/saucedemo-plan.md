# Sauce Demo — test plan

**Target:** https://www.saucedemo.com/  
**Seed:** `tests/seed.spec.ts` (bootstrap only; scenarios below use full URLs.)

## Application overview

Demo e-commerce UI with login, product inventory, cart, and checkout.

## Scenarios

### 1. Login

#### 1.1 Successful login

**Steps:**

1. Open `/`.
2. Enter username `standard_user`, password `secret_sauce`.
3. Submit login.

**Expected:** Inventory page visible (`inventory_container`).

#### 1.2 Failed login

**Steps:**

1. Open `/`.
2. Enter valid username and wrong password.
3. Submit login.

**Expected:** Error message visible (e.g. “Epic sadface” / credentials mismatch).

### 2. Cart and checkout

#### 2.1 Add item and complete order

**Steps:**

1. Log in as standard user.
2. Add “Sauce Labs Backpack” to cart.
3. Open cart.
4. Start checkout; fill first name, last name, postal code; continue.
5. Finish checkout.

**Expected:** Order complete / thank-you screen.
