---
name: playwright-cli
description: >-
  Official Playwright CLI skill (token-efficient browser control via terminal).
  Bundled under .agents/skills/playwright-cli/. Refresh with npm run playwright:skills.
---

# Playwright CLI skill (upstream)

The **full** skill (commands, references) lives here:

- `.agents/skills/playwright-cli/SKILL.md`
- `.agents/skills/playwright-cli/references/*.md`

Install or refresh from the Playwright CLI (pinned in `package.json`):

```bash
npm run playwright:skills
```

## How this repo uses it

| Tool | Use |
|------|-----|
| **Playwright Test** (`npm test`) | **Only** layer for committed UI/API automation and CI. |
| **Playwright MCP** (`.vscode/mcp.json`) | Default in Cursor: UI understanding / snapshots for planning and healing. |
| **`playwright-cli`** | **Optional** terminal automation; often **lower token use** than repeated full MCP snapshots (compact/disk output). Not required if you only use MCP—this skill file is a **reference** after `npm run playwright:skills`. |

Do not replace `npx playwright test` with ad-hoc `playwright-cli` scripts for scenarios that belong in the suite. **Flakiness** is addressed in **test code** and config, not by choosing MCP over CLI.
