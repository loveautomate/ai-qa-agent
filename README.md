# AI QA Agent - Agentic QA Workflow (Cursor + Playwright)

[![Playwright Tests](https://github.com/loveautomate/ai-qa-agent/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/loveautomate/ai-qa-agent/actions/workflows/playwright.yml)

This repository demonstrates **Agentic QA Workflow** using:

- [Playwright Test](https://playwright.dev/docs/intro) (`@playwright/test` **1.59.x**)
- Playwright AI Agents (Planner, Generator, Healer) via chatmode definitions
- [Playwright MCP](https://www.npmjs.com/package/@playwright/mcp) (`@playwright/mcp` — use `@latest` or pin a version for reproducibility)
- Cursor AI orchestration (`.cursor/rules/orchestrator.mdc`)

The workflow performs:

> PLAN → DEVELOP → TEST → HEAL → REPORT → **VALIDATE**

**playwright-cli:** [Coding agents](https://playwright.dev/docs/getting-started-cli) — default skills path: [`.claude/skills/playwright-cli/`](.claude/skills/playwright-cli/SKILL.md) (refresh: `npm run playwright-cli:skills`). Human-oriented notes: [`.agent/skills/playwright-cli.md`](.agent/skills/playwright-cli.md).

for two demo targets:

- UI E2E: https://www.saucedemo.com/
- API: https://petstore.swagger.io/

**Project brain:** [`AGENTS.md`](AGENTS.md) (orchestrator path, PRD, `.agent/` layout, **branching**: framework on `main`, demo plans/specs/reports may live on feature branches only).

---

## Playwright agent files (chatmodes)

Definitions are aligned with:

```bash
npx playwright init-agents --loop=vscode
```

| Option | When to use |
|--------|-------------|
| `--loop=vscode` | Current default for VS Code / Cursor-style loops |
| `--loop=vscode-legacy` | If your editor integration expects the older VS Code agent layout |

Files (stable names under `.github/chatmodes/`):

- `planner.chatmode.md`
- `generator.chatmode.md`
- `healer.chatmode.md`

The Cursor orchestrator rule treats these as authoritative. Regenerate with `init-agents` when upgrading Playwright if you want upstream’s latest wording — then re-apply any repo-specific tweaks you rely on.

---

## How to use in Cursor

Inside Cursor, run commands such as:

- **"Run the AI QA Agent loop for saucedemo"**
- **"Plan → Generate → Test → Heal → Report → Validate petstore API"**
- **"VALIDATE — example playwright-cli prompts and questions for UI + API"**

The AI QA Agent orchestrator will then:

1. **PLAN** — Create a test plan in `tests/plans/*.md`
2. **DEVELOP** — Generate Playwright tests into `tests/e2e/` or `tests/api/`
3. **TEST** — Run or request `npm test` / `npx playwright test`
4. **HEAL** — Suggest minimal fixes based on failures (per `healer.chatmode.md`)
5. **REPORT** — Produce a Markdown test report in `reports/*.md`
6. **VALIDATE** — The agent typically runs **`npm run test:report`** (full e2e **trace + video + screenshots**, opens HTML report) and may suggest **`npm run test:api`** / **`npm test`**. **playwright-cli** is **optional** for extra debugging (see `.claude/skills/playwright-cli/`). The agent gives **example prompts**, **asks if you have questions**, and **asks for feedback**. If tests change or you extend coverage, **update the test plan** and run **PLAN → … → VALIDATE** again until you are satisfied.

---

## Running tests manually

```bash
npm install
npm test                 # all projects (UI e2e + API)
npm run test:e2e         # Chromium UI tests under tests/e2e/
npm run test:api         # API tests under tests/api/
npm run test:smoke       # tests tagged @smoke
# CI parity: npm run test:ci
```

**Validation with full evidence (trace + video + screenshots + HTML report):**

```bash
npm run test:clean       # remove test-results/, playwright-report/, blob-report/
npm run test:report      # clean, then e2e with PW_REPORT_ALL=1, open report in browser
```

Re-open the last report anytime: `npx playwright show-report`.

**UI spec files** live under `tests/e2e/` and are named by target (e.g. `saucedemo.spec.ts`). Do not put style tags like `-bdd` in the filename — see [`.agent/docs/prd.md`](.agent/docs/prd.md).

**Base URLs** for the bundled demos live in **`playwright.config.ts`** (`DEMO_E2E_BASE_URL`, `DEMO_API_BASE_URL`) so they are easy to edit in source (including by an AI agent). Pointing at another site (e.g. staging or `example.com`) means changing those constants and **updating tests + `tests/plans/*.md`** — the current specs target Saucedemo and Petstore only.

Targeted runs: `npm run test:e2e`, `npm run test:api`, `npm run test:smoke` (see [`.agent/docs/prd.md`](.agent/docs/prd.md) for the full agentic QA roadmap).

---

## Configuring MCP in Cursor IDE

Cursor supports MCP (Model Context Protocol) servers at two levels.

### Project-level configuration

Place `.vscode/mcp.json` in your project (included in this repo):

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

> **Important:** The server name must be `playwright-test` so tool names match the chatmode files (for example `playwright-test/browser_click`).

For reproducible behavior across machines, pin a version instead of `@latest`, for example `"@playwright/mcp@0.0.70"`, and bump it deliberately when you upgrade.

### User-level (global) configuration

For MCP servers available across all projects, edit your global Cursor config:

| OS | Path |
|----|------|
| **Windows** | `C:\Users\<username>\.cursor\mcp.json` |
| **macOS** | `~/.cursor/mcp.json` |
| **Linux** | `~/.cursor/mcp.json` |

Example global `mcp.json`:

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "my-remote-server": {
      "url": "https://example.com/mcp",
      "headers": {}
    }
  }
}
```

### MCP server types

| Type | Config | Example |
|------|--------|---------|
| **stdio** (local) | `command` + `args` | `playwright-test` |
| **HTTP/SSE** (remote) | `url` + optional `headers` | Remote MCP servers |

### Verifying MCP status in Cursor

1. Open **Settings** (Ctrl+,)
2. Open the **MCP** section
3. Check server status (connected vs error; use Output → MCP logs if needed)

### Troubleshooting

```powershell
# Clear npx cache if MCP server fails to start
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\npm-cache\_npx"

# Restart Cursor to reload MCP configuration
```

---

## Upgrading Playwright

1. Bump `@playwright/test` in `package.json` (or `npm install @playwright/test@latest --save-dev`).
2. Run `npx playwright install` so browsers match the new version.
3. Optionally re-run `npx playwright init-agents --loop=vscode` and diff chatmodes against this repo.
4. Align `@playwright/mcp` (see above) with a version compatible with your Playwright release.

---

## Roadmap

Production-hardening ideas, implementation status, and next steps: **[`.agent/docs/prd.md`](.agent/docs/prd.md)** (section *What could be improved in this agentic QA workflow*).

---

## Repository layout (reference)

| Path | Role |
|------|------|
| `AGENTS.md` | Short pointers for tools / agents (orchestrator, PRD, `.agent/`) |
| `.cursor/rules/orchestrator.mdc` | **Orchestrator rule** (single copy; Cursor loads this) |
| `.agent/skills/qa-workflow.md` | Short workflow skill for agents |
| `.agent/skills/playwright-cli.md` | VALIDATE phase + pointers to **playwright-cli** |
| `.claude/skills/playwright-cli/` | Default [playwright-cli](https://playwright.dev/docs/getting-started-cli) skills (`npm run playwright-cli:skills` to refresh) |
| `.agent/docs/prd.md` | Product requirements and roadmap |
| `.github/chatmodes/*.chatmode.md` | Planner / Generator / Healer definitions |
| `.github/workflows/playwright.yml` | CI smoke run (Chromium) |
| `.vscode/mcp.json` | Project MCP server for Playwright |
| `playwright.config.ts` | `DEMO_E2E_BASE_URL` / `DEMO_API_BASE_URL` for bundled demos |
| `tests/` | Playwright tests (`e2e/` UI, `api/` REST) |
