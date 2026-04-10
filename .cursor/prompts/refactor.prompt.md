# Prompt: Refactor

Use when improving structure **without** breaking the demo or agent files.

---

Refactor incrementally toward the target layout (`src/core`, `src/skills`, `tests/e2e`, `tests/api`, `tests/plans`, `reports`). **Do not duplicate** the example-branch table — extend **[`BRANCHING.md`](../../BRANCHING.md)** instead.

**Rules:**
- Do **not** edit `.github/chatmodes/*.md` or `.vscode/mcp.json` unless there is no alternative.
- Preserve **CLI execution** as the only test execution path.
- After each logical change, ensure `npx playwright test` still runs.

State: (1) what you will move or extract, (2) why it is safe, (3) how you will verify.
