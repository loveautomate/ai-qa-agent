# Branching strategy

Authoritative list of **example branches** and how to use them. The root [`README.md`](README.md) defers here so branch tables are not duplicated.

## `main` (framework template)

Contains the AI QA Agent skeleton: Cursor rules, skills, Playwright config, seed test, CI, and docs. **Site-agnostic:** no production E2E or API scenarios are checked in.

Use `main` as the base when starting tests for a new site or API.

## Example branches (reference implementations)

| Branch | Purpose |
|--------|---------|
| **`example/saucedemo-e2e`** | Stable UI E2E against [Sauce Demo](https://www.saucedemo.com/) (login, cart, checkout). |
| **`example/petstore-api`** | HTTP API tests against [Swagger Petstore](https://petstore.swagger.io/). |
| **`examples/prd-scenarios`** | Combined PRD-style demo: multiple plans + tests. |

Demos focus on **reliable, passing** UI and API checks (no intentionally failing or “fragile playground” suites in-repo).

## Workflow

```bash
git checkout main
git pull
git checkout -b feature/my-target   # or merge an example branch as a starting point
```

Seed-only run on a clean template checkout:

```bash
npx playwright test tests/seed.spec.ts
```

On example branches, run the full suite:

```bash
npm test
```

## Publishing branches

```bash
git push -u origin main
git push -u origin example/saucedemo-e2e example/petstore-api examples/prd-scenarios
```
