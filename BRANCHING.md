# Branching strategy

## `main` (framework template)

Contains **only** the AI QA Agent skeleton: Cursor rules, skills, Playwright config, seed test, CI, and docs. It is **site-agnostic**: no production E2E or API scenarios are checked in.

Use `main` as the base when starting tests for a **new** site or API.

## Example branches (reference implementations)

| Branch | Purpose |
|--------|---------|
| `example/saucedemo-e2e` | UI E2E against [Sauce Demo](https://www.saucedemo.com/) (login, cart, checkout). Proves the framework with a real browser app. |
| `example/petstore-api` | HTTP API tests against [Swagger Petstore](https://petstore.swagger.io/). Proves `request` / API-style tests. |
| `examples/prd-scenarios` | **Combined** PRD-style demo: both plans and tests above. Use for end-to-end “plan → test → report” demos. |

## Workflow

```bash
git checkout main
git pull
git checkout -b feature/my-target   # or merge an example branch as a starting point
```

To run only the seed on a clean template checkout:

```bash
npx playwright test tests/seed.spec.ts
```

On example branches, run the full suite:

```bash
npm test
```

## Publishing branches

After local validation:

```bash
git push -u origin main
git push -u origin example/saucedemo-e2e example/petstore-api examples/prd-scenarios
```
