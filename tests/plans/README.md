# Test plans (repository convention)

All feature and regression plans live under `tests/plans/` as Markdown. Use the same structure for **every** suite (E2E, API, or mixed) so plans stay comparable and line up with **`reports/summary.md`** from `npm run report:md`.

---

## Standard test case fields

Use these fields in every scenario (copy from [`TEST-PLAN-TEMPLATE.md`](TEST-PLAN-TEMPLATE.md)):

| Field | Purpose |
|-------|--------|
| **Test case ID** | Stable identifier (traceability matrix, spec titles). |
| **Priority** | e.g. P0 / P1 / P2. |
| **Preconditions** | Data, environment, or state before steps. |
| **Steps to reproduce** | Numbered actions in order. |
| **Expected result** | Observable pass/fail criteria. |
| **Actual result** | Filled after a manual run, or taken from the generated Markdown report for automation. |
| **Status** | Pass / Fail / Blocked / Skipped / Not executed. |
| **Comment** | Defect IDs, data quirks, automation notes. |

---

## Playwright titles and reports

Name tests so the ID is easy to parse and trace:

- Pattern: **`CASE-ID — short expected behavior`** (em dash `—` between ID and summary).
- Example: `AUTH-OK — successful login shows inventory`.

The JSON → Markdown step (`node src/reporting/generate-report.mjs`) reads the part **before** `—` as **Test case ID** and the part after as a short **Expected result** hint. Full criteria stay in your plan file.

**Steps to reproduce** in `reports/summary.md` point at a plan file. By default the generator uses **`tests/plans/README.md`** (this file). For a feature-specific plan, set:

```bash
# Windows PowerShell
$env:REPORT_PLAN_PATH = "tests/plans/your-feature-plan.md"; npm run report:md

# Unix
REPORT_PLAN_PATH=tests/plans/your-feature-plan.md npm run report:md
```

Then the report’s “Steps” column references `your-feature-plan.md § **CASE-ID**` so readers open the right document and search for that ID.

Optional: `REPORT_MD_INCLUDE_RAW=1` appends a debug table of full Playwright titles.

---

## File naming

| Pattern | Use |
|---------|-----|
| `tests/plans/<feature>-plan.md` | Human-readable plan for a URL, service, or epic. |
| [`TEST-PLAN-TEMPLATE.md`](TEST-PLAN-TEMPLATE.md) | Empty shell; duplicate per feature. |

Example branches may add plans such as `saucedemo-plan.md` or `petstore-api-plan.md`; **main** keeps only shared conventions and this index.
