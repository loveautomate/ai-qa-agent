# Agents and roles

This repository uses **Cursor rules**, **MCP**, **skills**, and **Playwright Test** together. Responsibilities must stay separated.

## Playwright MCP (`playwright-test`)

- **Role:** Reasoning and UI understanding—snapshots, accessibility tree, optional screenshots, network/console signals for diagnosis.
- **Not for:** Substituting `npx playwright test` to execute full scenarios click-by-click.

## Cursor rules (`.cursor/rules/*.mdc`)

- **Role:** Orchestration, architecture boundaries, coding and testing conventions.
- **Entry:** `00-orchestrator.mdc` defines the PLAN → DEVELOP → TEST → HEAL → REPORT loop and the MCP vs CLI split.

## Skills (`.cursor/skills/*.skill.md`)

- **Role:** Reusable workflow contracts (login, API, reporting)—inputs, outputs, deterministic steps for **tests and plans**.
- **Not:** Runtime code unless mirrored under `src/skills/` when you add implementations.

## Playwright Test (CLI)

- **Role:** **Only** execution layer for UI and API automation.
- **Command:** `npm test` or `npx playwright test` (see `package.json`).

## Generated chatmodes (`.github/chatmodes/`)

- **Role:** Upstream Playwright agent definitions; treat as reference text.
- **Project override:** This repo’s rules require **CLI execution** for all test runs even if a chatmode mentions MCP-driven execution.

## Reports

- **Role:** Human-readable summaries in `reports/`; Playwright HTML report remains under `playwright-report/` after runs.

## Branches

- **`main`:** Framework template only (see `BRANCHING.md`).
- **Example branches:** Contain real `tests/plans/`, `tests/e2e/`, and/or `tests/api/` for Sauce Demo and Petstore.
