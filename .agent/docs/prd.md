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

---

## Demo scope

### UI (Saucedemo)

Demonstrate:

- Successful login
- Failed login
- Add to cart
- Checkout flow
- Example of healing a failing selector

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

Baseline documentation: this PRD, root `README.md`, `.cursor/rules/orchestrator.mdc`, plus the Playwright-generated chatmode definitions.

---

## What could be improved in this agentic QA workflow

These are practical next steps for a production-oriented setup (this repo stays intentionally minimal). Status notes reflect what this repository already implements.

| Area | Suggestion | Status in repo |
|------|------------|----------------|
| **Execution** | Add npm scripts for targeted runs (`test:e2e`, `test:api`, grep by tag) and document them in the orchestrator rule. | **Done:** `test`, `test:ci`, `test:e2e`, `test:api`, `test:smoke` (`@smoke`); orchestrator updated. |
| **Data & env** | Externalize base URLs and secrets via `.env` + `playwright.config.ts`; avoid hard-coded credentials in generated tests. | **Done:** `dotenv` loads `.env`; `E2E_BASE_URL` and `API_BASE_URL` with defaults; `.env.example` documents vars. Agents should still avoid secrets in generated tests. |
| **Traceability** | Link each spec to a plan section ID; store traces/screenshots as CI artifacts (workflow already uploads HTML report). | **Partial:** Comment template in `tests/e2e/seed.spec.ts` and `tests/api/petstore-smoke.spec.ts`. CI uploads `playwright-report/`, `test-results/` (traces/screenshots on failure), and `reports/` in one artifact (`playwright-ci-bundle`). |
| **Flakes** | Standardize on `expect` auto-waiting, `toPass` retries for known flaky UI, and avoid discouraged waits (see healer chatmode). | **Guidance:** Follow `.github/chatmodes/healer.chatmode.md`; add `expect.poll` / `toPass` in specs when needed. |
| **API testing** | Use `request` fixture for Petstore-style APIs; keep UI and API suites in separate projects with distinct timeouts. | **Done:** Projects `e2e-chromium` vs `api`; API timeout 60s; sample `tests/api/petstore-smoke.spec.ts`. |
| **Governance** | Pin MCP and Node LTS in docs; schedule periodic `npm audit` and Playwright minor upgrades. | **Partial:** `package.json` `engines.node` `>=20`; README MCP pinning note; run `npm audit` and bump `@playwright/test` on a schedule. |
| **Reporting** | Merge Markdown reports with CI `playwright-report` artifact for a single audit trail. | **Done:** Single artifact includes HTML report, `test-results/`, and `reports/` (when present). |

---

## Future enhancements (non-blocking)

- Richer tagging (`@e2e`, `@regression`) and project-specific grep scripts.
- Optional `expect.poll` / soft assertions patterns documented in a short `tests/README.md` if the team wants a single place for conventions.
- Pin `@playwright/mcp` in `.vscode/mcp.json` to a tested version in CI documentation.
