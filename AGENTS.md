# AI QA Agent (repo hints)

- **Orchestrator rule:** `.cursor/rules/orchestrator.mdc` (6 phases; **VALIDATE** **always starts** with **`npm run test:report`** for UI e2e so you review HTML report + **traces** first; **playwright-cli** optional after that)
- **PRD / roadmap:** `.agent/docs/prd.md`
- **Workflow skill note:** `.agent/skills/qa-workflow.md`
- **VALIDATE — mandatory evidence (UI e2e):** Agent runs **`npm run test:report`** (`test:clean` + full artifacts + opens HTML report) **before** validate discussion; you start from the report and **trace** viewers. See `package.json` and `playwright.config.ts` (`PW_REPORT_ALL`).
- **VALIDATE — optional debug:** `.agent/skills/playwright-cli.md` · **playwright-cli skills (default path):** `.claude/skills/playwright-cli/` (refresh: `npm run playwright-cli:skills`)

**`.agent/`** holds `skills/` and `docs/` only.

**Demo base URLs:** `playwright.config.ts` — `DEMO_E2E_BASE_URL`, `DEMO_API_BASE_URL` (edit in source when changing targets).

**E2E spec naming:** `tests/e2e/{target}.spec.ts` (e.g. `saucedemo.spec.ts`). Avoid redundant filename tags such as `-bdd`; express style in `test.step` / plans, not in the file name.

**Evidence:** After a run, open the Playwright report with `npx playwright show-report`, or open `playwright-report/index.html`. Markdown summaries live under `reports/` when generated.

**Extending or changing tests:** Update **`tests/plans/*.md`** and re-run **PLAN → DEVELOP → TEST → HEAL → REPORT → VALIDATE** until the user is satisfied (orchestrator).

---

## Branching (framework vs demo content)

- **`main`:** Test **framework** and agent docs — `playwright.config.ts`, `scripts/`, `package.json` test scripts, `.agent/`, `.cursor/rules/`, `README.md`, etc.
- **Feature branches (e.g. `ui-test`):** Demo **plans**, **specs**, and **Markdown reports** for a given exercise may land here without merging those artifacts to `main`, so `main` stays a clean harness. Cherry-pick or merge **framework-only** commits to `main` when promoting tooling updates.
