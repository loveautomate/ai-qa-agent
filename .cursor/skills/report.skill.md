# Skill: Report

## Purpose
Produce a **consistent Markdown test report** after CLI runs, suitable for demos and stakeholders.

## Inputs
- Playwright CLI exit status and summary (pass/fail counts)
- Optional: link to `playwright-report/` (HTML)
- Scope: URLs under test, suite name, git ref if relevant

## Outputs
- `reports/summary.md` — generated via `npm run report:md` (reads `test-results/report.json` from the JSON reporter).
- Hand-written `reports/{project-name}-report.md` for stakeholder narratives when needed.

## Logic
1. Run tests: `npm test` or `npm run test:report` (tests + `summary.md`).
2. Summarize results from **JSON reporter / CLI** (not from MCP).
3. For custom reports: scope, git ref, link to `playwright-report/` HTML.

## Notes
- HTML reporter remains the detailed artifact; `summary.md` is a quick, diff-friendly table.
