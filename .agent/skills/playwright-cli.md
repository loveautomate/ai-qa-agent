# Skill reference: **playwright-cli** (Phase VALIDATE)

- **Official doc:** [Coding agents — playwright-cli](https://playwright.dev/docs/getting-started-cli)
- **Installed skill (default path):** [`.claude/skills/playwright-cli/SKILL.md`](../../.claude/skills/playwright-cli/SKILL.md) — command reference and `references/`
- **Refresh skills:** `npm run playwright-cli:skills` (runs `playwright-cli install --skills` into `.claude/skills/`)

Use this during **Phase 6 – VALIDATE** together with example prompts below. Validation is **human-in-the-loop**: you re-run and debug tests yourself (with help from the agent); the agent asks questions and collects feedback.

## Phase VALIDATE — what you do

1. **Manually** re-run **UI** (`npm run test:e2e`) and **API** (`npm run test:api`) tests as needed — or full `npm test`.
2. Use **`playwright-cli`** for exploratory steps (see SKILL.md): `open`, `snapshot`, `click`, etc., and use **`npx playwright test --debug`** / **`--ui`** when debugging specs.
3. **Ask the agent** if anything is unclear; **give feedback** on failures or report mismatches.
4. If you **change tests** (or the agent changes them): **update `tests/plans/*.md`** to match, then run the **full loop** from **PLAN** through **VALIDATE** again until everything passes.

## Example prompts (paste in Cursor)

- “Using **playwright-cli** (see `.claude/skills/playwright-cli/SKILL.md`), walk me through **headed** `open` + `snapshot` on [URL], then I’ll compare to my e2e spec.”
- “Help me **debug** `tests/e2e/foo.spec.ts` with `npx playwright test … --debug` and fix the locator.”
- “**VALIDATE** my last report: I’ll run `npm test` — what should I double-check for **API** vs **UI**?”
- “Tests changed — **update the test plan** for scenario X and tell me which phases to re-run.”

## Orchestrator

See `.cursor/rules/orchestrator.mdc` — **Phase 6 – VALIDATE**.
