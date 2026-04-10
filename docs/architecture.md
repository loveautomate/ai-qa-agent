# Architecture diagrams

## 1. System layers (reasoning vs execution)

Separation of concerns: **understanding** (Playwright MCP in Cursor) vs **deterministic execution** (Playwright Test). Optional **`playwright-cli`** (terminal) is described in the README comparison table, not drawn here.

```mermaid
flowchart TB
  subgraph ide["Cursor"]
    LLM["LLM"]
    Rules["rules + skills"]
  end

  subgraph explore["Understand"]
    MCP["Playwright MCP"]
  end

  subgraph run["Run"]
    CLI["Playwright Test<br/>npm test"]
    Specs["e2e + api specs"]
  end

  subgraph out["Outputs"]
    HTML["HTML report"]
    MD["reports/*.md"]
    JSON["report.json"]
  end

  LLM --> Rules
  Rules --> MCP
  Rules --> CLI
  MCP -.->|"suggests locators"| Specs
  CLI --> Specs
  Specs --> HTML
  Specs --> JSON
  JSON --> MD
```

## 2. Tooling boundaries (what runs the suite)

```mermaid
flowchart LR
  subgraph notExec["Not suite execution"]
    A["MCP browser_* tools"]
    B["playwright-cli terminal"]
  end

  subgraph exec["Only execution path"]
    C["npx playwright test"]
  end

  A -.->|"planning / heal inspect"| D["Test source"]
  B -.->|"optional exploration"| D
  D --> C
  C --> E["Pass or fail + traces"]
```

## 3. Playwright Test projects

```mermaid
flowchart LR
  subgraph cfg["playwright.config.ts"]
    seed["project: seed<br/>seed.spec.ts"]
    e2e["project: e2e<br/>e2e/**/*.spec.ts"]
    api["project: api<br/>api/**/*.spec.ts"]
  end

  seed --> ch1["Chromium"]
  e2e --> ch2["Chromium"]
  api --> req["request fixture<br/>trace off"]
```

## 4. Repository branches (framework vs examples)

```mermaid
flowchart TD
  main["main<br/>framework template"]

  ex1["example/saucedemo-e2e<br/>UI + plan"]
  ex2["example/petstore-api<br/>API + plan"]
  full["examples/prd-scenarios<br/>combined PRD demo"]

  main --> ex1
  main --> ex2
  main --> full
```

See [`BRANCHING.md`](../BRANCHING.md) for workflow commands.
