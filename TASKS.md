# TASKS

## Done

- `.cursor/` rules, skills, prompts; `AGENTS.md`, `PRD.md`, **[`BRANCHING.md`](BRANCHING.md)** (single source for example branches).
- Folder scaffold; `npm test` → Playwright CLI.
- **`main` = framework-only:** generic `tests/seed.spec.ts`, no site-specific suites on default branch.
- **Branches:** `example/saucedemo-e2e`, **`example/the-internet-e2e`**, `example/petstore-api`, `examples/prd-scenarios` — see **`BRANCHING.md`**.
- **Playwright projects:** `seed`, `e2e`, `api` in `playwright.config.ts` (JSON + HTML reporters; `test-results/report.json` drives Markdown).
- **`src/reporting/generate-report.mjs`:** `reports/summary.md` from JSON (`npm run report:md`, or `npm run test:report`).
- **Official `@playwright/cli` skills:** `npm run playwright:skills` → `.agents/skills/playwright-cli/`; Cursor pointer `.cursor/skills/playwright-cli.skill.md`.
- **Mermaid diagrams:** [`docs/architecture.md`](docs/architecture.md), [`docs/flows.md`](docs/flows.md); overview embedded in [`README.md`](README.md).

## Next

- Optional: richer narrative in `reports/*.md` (scope, git SHA, links to HTML report).
- When bumping `@playwright/cli`, re-run `npm run playwright:skills` and commit `.agents/skills/playwright-cli/` if files change.

## Later

- Healer workflow notes aligned with CLI-only reruns (without rewriting stock chatmodes).
