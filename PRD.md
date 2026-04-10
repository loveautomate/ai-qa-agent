# PRD – AI QA Agent (framework + examples)

## Purpose

This repository provides a **reusable AI QA Agent framework** (Cursor rules, skills, Playwright Test CLI, reporting layout) suitable for **any** website or API.

Reference demos live on **git branches** — see **[`BRANCHING.md`](BRANCHING.md)** (Sauce Demo UI, Petstore API, combined PRD scenarios).

## Deliverables (framework)

- Test plans (`tests/plans/*.md`) — produced per project/branch
- Playwright tests (`tests/e2e/`, `tests/api/`)
- Markdown reports (`reports/*.md`)
- Execution **only** via Playwright CLI (`npm test`)

## Example scope (on scenario branches)

### UI — Sauce Demo (`example/saucedemo-e2e`)

- Successful login, failed login, cart, checkout

### API — Petstore (`example/petstore-api`)

- CRUD smoke for `/pet`
- One negative test

## Success criteria

1. `main` runs a minimal deterministic suite (seed).
2. Example branches run **passing** UI/API scenario suites against public targets (stable demos).
3. No MCP execution inside tests; CLI-only automation.

See [`TASKS.md`](TASKS.md) and [`BRANCHING.md`](BRANCHING.md) for status and layout.
