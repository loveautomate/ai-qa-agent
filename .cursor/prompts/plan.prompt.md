# Prompt: Plan

Use when starting a **test planning** pass for a URL or feature.

---

You are planning tests for the AI QA Agent demo. **Do not execute test scenarios via MCP browser tools**; use MCP only for **snapshots and UI understanding** to draft stable scenarios.

**Goal:** Produce a Markdown plan saved under `tests/plans/` with:
- Scope and assumptions
- UI and/or API scenarios (numbered steps, expected results)
- Reference to seed `tests/seed.spec.ts` where applicable

**Constraints:**
- Saucedemo / petstore are default demo targets when unspecified.
- Every scenario must be implementable later as **Playwright CLI tests** only.

End with the exact file path to create or update.
