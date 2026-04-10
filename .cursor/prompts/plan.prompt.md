# Prompt: Plan

Use when starting a **test planning** pass for a URL or feature.

---

You are planning tests for the AI QA Agent demo. **Do not execute test scenarios via MCP browser tools**; use MCP only for **snapshots and UI understanding** to draft stable scenarios.

**Goal:** Produce a Markdown plan saved under `tests/plans/` that follows repository conventions:

- Read **`tests/plans/README.md`** for standard test case fields and traceability rules.
- Start from **`tests/plans/TEST-PLAN-TEMPLATE.md`** (duplicate and rename, e.g. `<feature>-plan.md`).
- Include scope, assumptions, preconditions, **numbered steps to reproduce**, **expected results**, placeholders for actual/status/comment after execution, and a traceability matrix.
- Reference seed `tests/seed.spec.ts` where applicable.

**Constraints:**

- Saucedemo / petstore are default demo targets when unspecified.
- Every scenario must be implementable later as **Playwright CLI tests** only.
- Use Playwright test titles in the form **`CASE-ID — short expected behavior`** so `npm run report:md` can map runs to the plan.

End with the exact file path to create or update.
