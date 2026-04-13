/**
 * Remove prior Playwright outputs (traces, videos, HTML report, blobs).
 * Safe to run anytime; missing dirs are ignored.
 */
const { rmSync } = require('fs');
const { join } = require('path');

const root = process.cwd();
for (const dir of ['test-results', 'playwright-report', 'blob-report']) {
  try {
    rmSync(join(root, dir), { recursive: true, force: true });
    console.log(`[playwright-clean] removed ${dir}/`);
  } catch {
    // ignore
  }
}
