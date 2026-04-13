# Skill: Agentic QA workflow (Playwright + Cursor)

Use this project’s **AI QA Agent** when you need plan → code → test → heal → report loops against web or API targets.

## When to apply

- New feature or regression coverage for a URL or API.
- Fixing flaky or broken Playwright tests.
- Producing a short Markdown test report under `reports/`.

## How it runs

1. **Plan** — Follow `.github/chatmodes/planner.chatmode.md`; output under `tests/plans/`.
2. **Develop** — Follow `generator.chatmode.md`; UI in `tests/e2e/`, API in `tests/api/`.
3. **Test** — `npm test`, or `npm run test:e2e` / `test:api` / `test:smoke`.
4. **Heal** — Follow `healer.chatmode.md` on failures.
5. **Report** — Summarize in `reports/{name}-report.md`.

## References

- Orchestrator: `.cursor/rules/orchestrator.mdc`
- Requirements: `.agent/docs/prd.md`
- MCP: `.vscode/mcp.json` (`playwright-test` server)
