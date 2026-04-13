# AI QA Agent (repo hints)

- **Orchestrator rule:** `.cursor/rules/orchestrator.mdc` (6 phases; **VALIDATE** = human-in-the-loop with **playwright-cli**)
- **PRD / roadmap:** `.agent/docs/prd.md`
- **Workflow skill note:** `.agent/skills/qa-workflow.md`
- **VALIDATE reference:** `.agent/skills/playwright-cli.md` · **playwright-cli skills (default path):** `.claude/skills/playwright-cli/` (refresh: `npm run playwright-cli:skills`)

**`.agent/`** holds `skills/` and `docs/` only.

**Demo base URLs:** `playwright.config.ts` — `DEMO_E2E_BASE_URL`, `DEMO_API_BASE_URL` (edit in source when changing targets).

**Evidence:** After a test run, open the Playwright report with `npx playwright show-report`, or open `playwright-report/index.html`. Markdown summaries live under `reports/` (e.g. `reports/saucedemo-report.md`).
