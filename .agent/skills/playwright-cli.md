# Skill reference: **playwright-cli** (optional — Phase VALIDATE)

- **Official doc:** [Coding agents — playwright-cli](https://playwright.dev/docs/getting-started-cli)
- **Installed skill (default path):** [`.claude/skills/playwright-cli/SKILL.md`](../../.claude/skills/playwright-cli/SKILL.md) — command reference and `references/`
- **Refresh skills:** `npm run playwright-cli:skills` (runs `playwright-cli install --skills` into `.claude/skills/`)

**Validation always begins with the Playwright report + traces, not playwright-cli.** The agent runs **`npm run test:report`** first for UI e2e (trace + video + screenshots + HTML report). Use **playwright-cli** only **after** that when you need interactive exploration (`open`, `snapshot`, `attach` with `npx playwright test --debug=cli`).

## Phase VALIDATE — what you do

1. **First:** Ensure **`npm run test:report`** has run; open the HTML report and review **traces** (and videos) per test. Run **`npm run test:api`** / **`npm test`** when API or full suite matters instead of or in addition to UI report.
2. **Then optionally** use **`playwright-cli`** for exploratory steps (see SKILL.md): `open`, `snapshot`, `click`, etc., and **`npx playwright test --debug`** / **`--ui`** when debugging specs.
3. **Ask the agent** if anything is unclear; **give feedback** on failures or report mismatches.
4. If you **change tests** or extend scope: **update `tests/plans/*.md`**, then run the **full loop** from **PLAN** through **VALIDATE** again until satisfied.

## Example prompts (paste in Cursor)

- “Run **`npm run test:report`** and walk me through failures in the HTML report.”
- “Using **playwright-cli** (see `.claude/skills/playwright-cli/SKILL.md`), walk me through **headed** `open` + `snapshot` on [URL].”
- “Help me **debug** `tests/e2e/foo.spec.ts` with `npx playwright test … --debug` and fix the locator.”
- “**Extend** scenario X — **update the test plan** and **re-run all phases**.”

## Orchestrator

See `.cursor/rules/orchestrator.mdc` — **Phase 6 – VALIDATE**.
