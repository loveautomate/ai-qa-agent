# PRD – AI QA Agent

## Purpose

Demonstrate a simple, minimal Agentic QA Workflow using:

- Playwright AI agents (Planner, Generator, Healer) in `.github/chatmodes/`
- Cursor orchestrator rule (`.cursor/rules/orchestrator.mdc`)
- Public demo targets:
  - https://www.saucedemo.com/ (UI)
  - https://petstore.swagger.io/ (API)

The workflow must automatically generate:

- Test plans
- Playwright tests
- Healing suggestions
- Execution reports
- A **VALIDATE** step after reporting: human-in-the-loop manual re-runs (UI + API), **playwright-cli** + skills under `.claude/skills/` (default from `install --skills`), feedback and questions; if tests change, **update the test plan** and re-run all phases (see orchestrator).

**Test design / reporting (quality bar):**

- UI automation may use **BDD-style** structure (`test.step`, feature-oriented `describe`) and **traceability** from plan section IDs (§) to tests.
- **E2E spec file names:** Use the target or feature, e.g. `tests/e2e/saucedemo.spec.ts`. Do **not** encode style in the filename (avoid suffixes like `-bdd`); keep Given/When/Then in `test.step` and the plan doc instead.
- Markdown execution summaries in `reports/` should follow an **ISTQB-aligned** shape where practical: references, environment, metrics, results, incidents/limitations, conclusions, and links to **Playwright HTML** evidence (`playwright-report/index.html` or `npx playwright show-report`).

---

## Demo scope

### UI (Saucedemo)

Demonstrate:

- Successful login
- Failed login
- Add to cart
- Checkout flow
- Example of healing a failing selector
- **Advanced / mature paths** as the plan evolves (e.g. logout, sort, cart remove, validation), expressed in BDD-friendly automation

### API (Petstore)

Demonstrate:

- CRUD operations for `/pet`
- Smoke test
- One negative test
- API healing example (wrong field / incorrect assertion)

---

## Out of scope

- Full production CD (deploy gates, multi-environment promotions)
- Data seeding beyond what public demos allow
- Per-environment configuration matrices
- Authentication tied to real user accounts
- Complex reporting dashboards

**Note:** A lightweight GitHub Actions workflow runs Playwright on Chromium as a **reference CI smoke check** for the repo. That does not imply full CD or environment management in scope.

---

## Success criteria

During the live demo, AI QA Agent should:

1. Automatically generate a test plan (`tests/plans/*.md`)
2. Automatically generate Playwright tests
3. Execute tests via Playwright
4. Heal at least one failing test
5. Produce a clean Markdown report in `reports/*.md`
6. **VALIDATE** — Agent runs **`npm run test:report`** (or `test:clean` + e2e with full **trace, video, screenshot** via `PW_REPORT_ALL=1`) when appropriate so the user gets an HTML report with embedded viewers; user may also run `npm run test:e2e`, `npm run test:api`, or `npm test`. **[playwright-cli](https://playwright.dev/docs/getting-started-cli)** is **optional** for deeper debugging (`.claude/skills/playwright-cli/`). Agent asks questions and collects feedback. **Any test change or scope extension** implies **updating `tests/plans/*.md`** and re-running **PLAN → … → VALIDATE** until the user is **fully satisfied**.

Baseline documentation: this PRD, root `README.md`, `.cursor/rules/orchestrator.mdc`, Playwright chatmodes, `.agent/skills/playwright-cli.md`, `.claude/skills/playwright-cli/`.

---

## What could be improved in this agentic QA workflow

These are practical next steps for a production-oriented setup (this repo stays intentionally minimal). Status notes reflect what this repository already implements.

| Area | Suggestion | Status in repo |
|------|------------|----------------|
| **Execution** | Add npm scripts for targeted runs (`test:e2e`, `test:api`, grep by tag) and document them in the orchestrator rule. | **Done:** `test`, `test:ci`, `test:e2e`, `test:api`, `test:smoke` (`@smoke`); orchestrator updated. |
| **Data & env** | Demo base URLs live in `playwright.config.ts` (`DEMO_E2E_BASE_URL`, `DEMO_API_BASE_URL`) for easy edits; avoid real credentials in generated tests. | **Done:** constants in config; no `dotenv` for targets. |
| **Traceability** | Link each spec to a plan section ID; store traces/screenshots as CI artifacts (workflow already uploads HTML report). | **Partial:** Comment template in UI/API specs; CI uploads `playwright-report/`, `test-results/` (traces/screenshots on failure), and `reports/` in one artifact (`playwright-ci-bundle`). |
| **Flakes** | Standardize on `expect` auto-waiting, `toPass` retries for known flaky UI, and avoid discouraged waits (see healer chatmode). | **Guidance:** Follow `.github/chatmodes/healer.chatmode.md`; add `expect.poll` / `toPass` in specs when needed. |
| **API testing** | Use `request` fixture for Petstore-style APIs; keep UI and API suites in separate projects with distinct timeouts. | **Done:** Projects `e2e-chromium` vs `api`; API timeout 60s; sample `tests/api/petstore-smoke.spec.ts`. |
| **Governance** | Pin MCP and Node LTS in docs; schedule periodic `npm audit` and Playwright minor upgrades. | **Partial:** `package.json` `engines.node` `>=20`; README MCP pinning note; run `npm audit` and bump `@playwright/test` on a schedule. |
| **Reporting** | Merge Markdown reports with CI `playwright-report` artifact for a single audit trail. | **Done:** Single artifact includes HTML report, `test-results/`, and `reports/` (when present). |
| **VALIDATE + evidence** | Phase 6: run **`npm run test:report`** for e2e with trace + video + screenshots + HTML report; **`npm run test:clean`** clears old artifacts. playwright-cli optional for debugging. | **Done:** `package.json` scripts, `PW_REPORT_ALL` in `playwright.config.ts`, `scripts/playwright-*.cjs`. |
| **VALIDATE + playwright-cli** | Optional: [Coding agents](https://playwright.dev/docs/getting-started-cli) skills under `.claude/skills/`; `npm run playwright-cli:skills`. | **Done:** orchestrator, `.agent/skills/playwright-cli.md`, tracked skill bundle. |

---

## Future enhancements (non-blocking)

- Richer tagging (`@e2e`, `@regression`) and project-specific grep scripts.
- Optional `expect.poll` / soft assertions patterns documented in a short `tests/README.md` if the team wants a single place for conventions.
- Pin `@playwright/mcp` in `.vscode/mcp.json` to a tested version in CI documentation.
