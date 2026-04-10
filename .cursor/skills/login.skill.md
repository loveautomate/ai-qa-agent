# Skill: Login (UI)

## Purpose
Reusable workflow for authenticating on a web app in **Playwright tests** (not via MCP execution).

## Inputs
- `baseURL` or full login page URL
- Credentials: `username`, `password`
- Optional: expected post-login URL or visible heading/role to assert

## Outputs
- Documented steps for a test plan (`tests/plans/`)
- Implemented as a **single helper** or **inline steps** in `tests/e2e/*.spec.ts`

## Logic (deterministic)
1. Navigate to login page.
2. Fill user and password fields using stable locators.
3. Submit (click or Enter).
4. Assert landing state (URL, role, or text).

## Notes
- MCP may be used only to **inspect** the page (snapshot) while **authoring** locators; execution belongs in the spec.
