import { test, expect } from '@playwright/test';

const BASE = 'https://www.saucedemo.com';

test.describe('Saucedemo — login', () => {
  test('successful login shows inventory', async ({ page }) => {
    await page.goto(BASE);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  test('failed login shows error', async ({ page }) => {
    await page.goto(BASE);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(/Epic sadface|do not match/i);
  });
});

test.describe('Saucedemo — cart and checkout', () => {
  test('add backpack and complete checkout', async ({ page }) => {
    await page.goto(BASE);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('[data-test="cart-contents-container"]')).toBeVisible();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('94043');
    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
