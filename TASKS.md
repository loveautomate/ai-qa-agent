# TASKS

## Done

- `.cursor/` rules, skills, prompts; `AGENTS.md`, `PRD.md`, `BRANCHING.md`.
- Folder scaffold; `npm test` → Playwright CLI.
- **`main` = framework-only:** generic `tests/seed.spec.ts`, no site-specific suites on default branch.
- **Branches:** `example/saucedemo-e2e`, `example/petstore-api`, `examples/prd-scenarios` — reference tests + plans (see `BRANCHING.md`).

## Next

- Optional: `src/reporting/` helper to template `reports/*.md` from CLI output.
- Optional: separate Playwright `projects` for `e2e` vs `api` in `playwright.config.ts` as suites grow.

## Later

- Healer workflow notes aligned with CLI-only reruns (without rewriting stock chatmodes).
