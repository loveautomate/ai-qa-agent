import { test, expect } from '@playwright/test';

/**
 * Plan: tests/plans/saucedemo-plan.md
 * IDs: AUTH-*, CAT-*, CART-*, CHK-*
 */
const BASE = 'https://www.saucedemo.com';

async function loginAs(page: import('@playwright/test').Page, username: string, password: string) {
  await page.goto(BASE);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test.describe('Saucedemo — AUTH', () => {
  test('AUTH-OK — successful login shows inventory and product cards', async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce');
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]').first()).toBeVisible();
    await expect(
      page.locator('[data-test="inventory-item"]').first().locator('[data-test^="add-to-cart"]'),
    ).toBeVisible();
  });

  test('AUTH-BAD-PWD — wrong password shows error', async ({ page }) => {
    await loginAs(page, 'standard_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]')).toContainText(/Epic sadface|do not match/i);
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
  });

  test('AUTH-LOCKED — locked out user cannot access inventory', async ({ page }) => {
    await loginAs(page, 'locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText(/locked/i);
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
  });
});

test.describe('Saucedemo — CAT catalog', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce');
  });

  test('CAT-SORT — changing sort order changes first product', async ({ page }) => {
    const sort = page.locator('select.product_sort_container');
    await expect(sort).toBeVisible();
    const firstBefore = await page
      .locator('[data-test="inventory-item"]')
      .first()
      .locator('.inventory_item_name')
      .textContent();
    await sort.selectOption('za');
    const firstAfter = await page
      .locator('[data-test="inventory-item"]')
      .first()
      .locator('.inventory_item_name')
      .textContent();
    expect(firstAfter).not.toBe(firstBefore);
  });

  test('CAT-MULTI / CART-BADGE — two items, cart badge shows 2', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });
});

test.describe('Saucedemo — CART', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce');
  });

  test('CART-ADD-REMOVE — remove item empties cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

  test('CART-CONTINUE — continue shopping then second item', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });
});

test.describe('Saucedemo — CHK checkout', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('CHK-VAL-EMPTY — cannot continue checkout with empty fields', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="checkout-info-container"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('CHK-HAPPY — complete checkout after valid info', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('94043');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});

test.describe('Saucedemo — AUTH-LOGOUT', () => {
  test('AUTH-LOGOUT — logout returns to login', async ({ page }) => {
    await loginAs(page, 'standard_user', 'secret_sauce');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await page.goto(`${BASE}/inventory.html`);
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
  });
});
