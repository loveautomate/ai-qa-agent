# Skill: Agentic QA workflow (Playwright + Cursor)

Use this project’s **AI QA Agent** when you need plan → code → test → heal → report → **validate** loops against web or API targets.

## When to apply

- New feature or regression coverage for a URL or API.
- Fixing flaky or broken Playwright tests.
- Producing a short Markdown test report under `reports/`.
- **Extending or improving tests:** always **update `tests/plans/*.md`** and run the **full six phases** again until the user is fully satisfied.

## How it runs

1. **Plan** — Follow `.github/chatmodes/planner.chatmode.md`; output under `tests/plans/`.
2. **Develop** — Follow `generator.chatmode.md`; UI in `tests/e2e/`, API in `tests/api/`.
3. **Test** — `npm test`, or `npm run test:e2e` / `test:api` / `test:smoke`. For **full screenshots + video + traces + HTML report**, use **`npm run test:report`** (after optional **`npm run test:clean`**).
4. **Heal** — Follow `healer.chatmode.md` on failures.
5. **Report** — Summarize in `reports/{name}-report.md` (ISTQB-style sections + link to Playwright HTML under `playwright-report/`).
6. **Validate** — For **UI e2e**, agent **always runs `npm run test:report` first** (clean + trace + video + screenshots + HTML report). Validation **starts** from analyzing that report and **traces**; then Q&A. **API-only:** `npm run test:api` / `npm test` as appropriate. **playwright-cli** is **optional** after report review (see `.agent/skills/playwright-cli.md`). If tests or scope change, **update the plan** and repeat **all phases** until green and the user confirms.

**Automation style:** Prefer `test.step` for Given/When/Then readability in HTML reports; map scenarios to plan § IDs.

## References

- Orchestrator: `.cursor/rules/orchestrator.mdc`
- Requirements: `.agent/docs/prd.md`
- MCP: `.vscode/mcp.json` (`playwright-test` server)
- **Evidence bundle:** `npm run test:report` / `test:clean` (`package.json`)
- **playwright-cli (optional VALIDATE):** [`.agent/skills/playwright-cli.md`](playwright-cli.md)
