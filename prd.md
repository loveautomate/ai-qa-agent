# PRD – AI QA Agent (framework + examples)

## Purpose

This repository provides a **reusable AI QA Agent framework** (Cursor rules, skills, Playwright Test CLI, reporting layout) suitable for **any** website or API.

Reference demos for validation live on **git branches** (see `BRANCHING.md`):

- UI: [Sauce Demo](https://www.saucedemo.com/) — branch `example/saucedemo-e2e`
- API: [Swagger Petstore](https://petstore.swagger.io/) — branch `example/petstore-api`
- Combined: `examples/prd-scenarios`

## Deliverables (framework)

- Test plans (`tests/plans/*.md`) — produced per project/branch
- Playwright tests (`tests/e2e/`, `tests/api/`)
- Markdown reports (`reports/*.md`)
- Execution **only** via Playwright CLI (`npm test`)

## Example scope (on scenario branches)

### UI (Saucedemo)

- Successful login, failed login
- Add to cart, checkout flow

### API (Petstore)

- CRUD smoke for `/pet`
- One negative test

## Success criteria

1. `main` runs a minimal deterministic suite (seed).
2. Example branches run full scenario suites against public targets.
3. No MCP execution inside tests; CLI-only automation.

See `TASKS.md` and `BRANCHING.md` for status and branch layout.
