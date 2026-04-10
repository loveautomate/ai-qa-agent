# Flow diagrams

## 1. Five-phase QA loop

Orchestrator phases from `.cursor/rules/00-orchestrator.mdc`.

```mermaid
flowchart LR
  P["1 PLAN<br/>tests/plans/*.md"] --> D["2 DEVELOP<br/>tests/e2e, tests/api"]
  D --> T["3 TEST<br/>npm test"]
  T --> H["4 HEAL<br/>fix specs"]
  H --> R["5 REPORT<br/>reports/"]
  T -->|"fail"| H
  H -->|"re-run"| T
  R -->|"next feature"| P
```

## 2. Typical interaction (sequence)

Default loop: **MCP** (understanding) → **specs** → **`npm test`** (execution). For **MCP vs `playwright-cli` vs Playwright Test**, token tradeoffs, and when to use each, see the README section *MCP vs `playwright-cli` vs Playwright Test*.

```mermaid
sequenceDiagram
  participant U as User
  participant A as AI QA Agent
  participant M as Playwright MCP
  participant S as Test specs
  participant C as npm test

  U->>A: Goal e.g. cover checkout
  A->>M: snapshot / analyze UI
  M-->>A: page structure for locators
  A->>S: write or edit Playwright tests
  U->>C: run suite
  C-->>U: results + HTML report
  U->>A: paste failures or ask heal
  A->>M: inspect UI context
  M-->>A: structure + roles for heal
  A->>S: minimal fixes
  U->>C: re-run until green
  A->>U: Markdown summary reports/
```

## 3. Reporting pipeline

```mermaid
flowchart LR
  T["playwright test"] --> J["JSON reporter<br/>test-results/report.json"]
  T --> H["HTML reporter<br/>playwright-report/"]
  J --> G["node src/reporting/generate-report.mjs"]
  G --> M["reports/summary.md<br/>plan ref + expected/actual/status"]
```

## 4. Chatmodes vs this repository

Upstream planner / generator / healer live under `.github/chatmodes/` (regenerate with `init-agents`). **Execution** of the suite is always **`npm test`**.

```mermaid
flowchart TB
  subgraph cm["Chatmode agents"]
    P["planner"]
    G["generator"]
    H["healer"]
  end

  MCP["Playwright MCP"]

  subgraph out["Deliverables"]
    TS["tests/**/*.spec.ts"]
  end

  CLI["Playwright Test CLI"]

  P --> MCP
  G --> MCP
  H --> MCP
  G --> TS
  H --> TS
  TS --> CLI
```
