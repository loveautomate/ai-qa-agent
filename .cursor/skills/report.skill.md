# Skill: Report

## Purpose
Produce a **consistent Markdown test report** after CLI runs, suitable for demos and stakeholders.

## Inputs
- Playwright CLI exit status and summary (pass/fail counts)
- Optional: link to `playwright-report/` (HTML)
- Scope: URLs under test, suite name, git ref if relevant

## Outputs
- `reports/{project-name}-report.md`
- Short executive summary + bullet results + failures + next steps

## Logic
1. Record scope and environment (browser project, date).
2. Summarize results from **CLI output** (not from MCP).
3. List failures with file/line and suspected cause.
4. Note any healing or follow-ups.

## Notes
- HTML reporter output remains the source of detailed artifacts; Markdown report is the narrative layer.
