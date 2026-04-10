# Branching strategy

Authoritative list of **example branches** and how to use them. The root [`README.md`](README.md) defers here so branch tables are not duplicated.

## `main` (framework template)

Contains the AI QA Agent skeleton: Cursor rules, skills, Playwright config, seed test, CI, and docs. **Site-agnostic:** no production E2E or API scenarios are checked in.

Use `main` as the base when starting tests for a new site or API.

## Example branches (reference implementations)

| Branch | Purpose |
|--------|---------|
| **`example/saucedemo-e2e`** | Stable UI E2E against [Sauce Demo](https://www.saucedemo.com/) (login, cart, checkout). |
| **`example/the-internet-e2e`** | UI E2E against [The Internet](https://the-internet.herokuapp.com/) — **mixes stable checks with optional fragile / anti-pattern blocks** (`RUN_FRAGILE_E2E=1`) for **heal** practice on buggy or awkward UIs. |
| **`example/petstore-api`** | HTTP API tests against [Swagger Petstore](https://petstore.swagger.io/). |
| **`examples/prd-scenarios`** | Combined PRD-style demo: multiple plans + tests. |

### Fragile / “buggy SUT” workflow (`example/the-internet-e2e`)

[The Internet](https://the-internet.herokuapp.com/) is a **deliberately varied** playground (dynamic content, auth, etc.). On this branch:

- **Default `npm test`:** runs **deterministic** specs that should pass on a healthy network.
- **Optional:** set `RUN_FRAGILE_E2E=1` to run extra tests that use **brittle locators, tight timeouts, or missing waits** — useful to practice **Phase 4 – HEAL** (expect failures or flakes until you fix selectors and assertions).

```bash
# Unix / macOS / Git Bash
RUN_FRAGILE_E2E=1 npx playwright test --project=e2e

# Windows PowerShell
$env:RUN_FRAGILE_E2E = "1"; npx playwright test --project=e2e
```

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
git push -u origin example/saucedemo-e2e example/the-internet-e2e example/petstore-api examples/prd-scenarios
```
