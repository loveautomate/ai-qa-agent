# TASKS

## Done

- `.cursor/` rules, skills, prompts; `AGENTS.md`, `PRD.md`, `BRANCHING.md`.
- Folder scaffold; `npm test` → Playwright CLI.
- **`main` = framework-only:** generic `tests/seed.spec.ts`, no site-specific suites on default branch.
- **Branches (create locally / push):**
  - `example/saucedemo-e2e` — `tests/plans/saucedemo-plan.md`, `tests/e2e/saucedemo.spec.ts`
  - `example/petstore-api` — `tests/plans/petstore-api-plan.md`, `tests/api/petstore.spec.ts`
  - `examples/prd-scenarios` — merge of both (full PRD demo)

## Next

- Optional: `src/reporting/` helper to template `reports/*.md` from CLI output.
- Optional: separate Playwright `projects` for `e2e` vs `api` in `playwright.config.ts` as suites grow.

## Later

- Healer workflow notes aligned with CLI-only reruns (without rewriting stock chatmodes).
