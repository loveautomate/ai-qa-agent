/**
 * Clean artifacts → run e2e with full trace + video → open HTML report (browser).
 * Set PW_REPORT_ALL=1 for playwright.config.ts artifact mode.
 */
require('./playwright-clean.cjs');

const { spawnSync } = require('child_process');

process.env.PW_REPORT_ALL = '1';
process.env.PLAYWRIGHT_HTML_OPEN = 'always';

const args = ['playwright', 'test', '--project=e2e-chromium'];
const result = spawnSync('npx', args, {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env,
  shell: true,
});

process.exit(result.status === null ? 1 : result.status);
