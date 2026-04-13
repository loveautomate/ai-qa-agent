# AI QA Agent (repo hints)

- **Orchestrator rule:** `.cursor/rules/orchestrator.mdc` (6 phases; **VALIDATE** uses **`npm run test:report`** for full evidence; **playwright-cli** optional)
- **PRD / roadmap:** `.agent/docs/prd.md`
- **Workflow skill note:** `.agent/skills/qa-workflow.md`
- **VALIDATE — automated evidence:** `npm run test:clean` → `npm run test:report` (e2e: trace + video + screenshots, opens HTML report). See `package.json` and `playwright.config.ts` (`PW_REPORT_ALL`).
- **VALIDATE — optional debug:** `.agent/skills/playwright-cli.md` · **playwright-cli skills (default path):** `.claude/skills/playwright-cli/` (refresh: `npm run playwright-cli:skills`)

**`.agent/`** holds `skills/` and `docs/` only.

**Demo base URLs:** `playwright.config.ts` — `DEMO_E2E_BASE_URL`, `DEMO_API_BASE_URL` (edit in source when changing targets).

**Evidence:** After a run, open the Playwright report with `npx playwright show-report`, or open `playwright-report/index.html`. Markdown summaries live under `reports/` when generated.

**Extending or changing tests:** Update **`tests/plans/*.md`** and re-run **PLAN → DEVELOP → TEST → HEAL → REPORT → VALIDATE** until the user is satisfied (orchestrator).

---

## Branching (framework vs demo content)

- **`main`:** Test **framework** and agent docs — `playwright.config.ts`, `scripts/`, `package.json` test scripts, `.agent/`, `.cursor/rules/`, `README.md`, etc.
- **Feature branches (e.g. `ui-test`):** Demo **plans**, **specs**, and **Markdown reports** for a given exercise may land here without merging those artifacts to `main`, so `main` stays a clean harness. Cherry-pick or merge **framework-only** commits to `main` when promoting tooling updates.
