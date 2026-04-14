import { test, expect } from '@playwright/test';

/**
 * Plan: tests/plans/saucedemo-plan.md (SC-1.x, SC-2.1)
 */
test.describe('@e2e Sauce Demo', () => {
  test.describe('Authentication', () => {
    test('@smoke Successful login reaches inventory', async ({ page }) => {
      await test.step('Given the login page', async () => {
        await page.goto('/');
        await expect(page.getByTestId('username')).toBeVisible();
      });

      await test.step('When valid credentials are submitted', async () => {
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
      });

      await test.step('Then inventory loads', async () => {
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByTestId('title')).toHaveText('Products');
      });
    });

    test('Invalid credentials show error', async ({ page }) => {
      await test.step('Given the login page', async () => {
        await page.goto('/');
      });

      await test.step('When password is wrong', async () => {
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('wrong_password');
        await page.getByTestId('login-button').click();
      });

      await test.step('Then error is shown and user stays on login', async () => {
        await expect(page.getByTestId('error')).toContainText(
          'Username and password do not match',
        );
        await expect(page).not.toHaveURL(/inventory/);
      });
    });

    test('Locked out user cannot log in', async ({ page }) => {
      await test.step('Given the login page', async () => {
        await page.goto('/');
      });

      await test.step('When locked_out_user signs in', async () => {
        await page.getByTestId('username').fill('locked_out_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
      });

      await test.step('Then locked-out message appears', async () => {
        await expect(page.getByTestId('error')).toContainText('locked out');
        await expect(page).not.toHaveURL(/inventory/);
      });
    });
  });

  test.describe('Inventory', () => {
    test('Add first item to cart updates badge', async ({ page }) => {
      await test.step('Given a logged-in session', async () => {
        await page.goto('/');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        await expect(page).toHaveURL(/inventory/);
      });

      await test.step('When first product is added to cart', async () => {
        await page.locator('[data-test="inventory-item"]').first().getByText('Add to cart').click();
      });

      await test.step('Then cart badge shows 1', async () => {
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
      });
    });
  });
});
