#!/usr/bin/env node
/**
 * Builds reports/summary.md from Playwright JSON reporter output.
 * Run after: npx playwright test (with json reporter enabled in playwright.config.ts)
 *
 * Env:
 *   PLAYWRIGHT_JSON_REPORT — default test-results/report.json
 *   REPORT_MD_OUT          — default reports/summary.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');

const jsonPath = process.env.PLAYWRIGHT_JSON_REPORT || path.join(root, 'test-results', 'report.json');
const outPath = process.env.REPORT_MD_OUT || path.join(root, 'reports', 'summary.md');

function visitSuite(suite, inheritedFile, breadcrumbs) {
  const filePath = suite.file || inheritedFile;
  const crumbs = [...breadcrumbs];
  if (suite.title) crumbs.push(suite.title);

  const rows = [];
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const last = test.results?.length ? test.results[test.results.length - 1] : null;
      const title = [...crumbs, spec.title].filter(Boolean).join(' › ');
      rows.push({
        file: filePath || '',
        title,
        project: test.projectName || '',
        status: last?.status || 'unknown',
        duration: typeof last?.duration === 'number' ? last.duration : 0,
      });
    }
  }
  for (const child of suite.suites || []) {
    rows.push(...visitSuite(child, filePath, crumbs));
  }
  return rows;
}

function aggregate(rows) {
  const counts = {};
  for (const r of rows) {
    const s = r.status || 'unknown';
    counts[s] = (counts[s] || 0) + 1;
  }
  return counts;
}

function main() {
  if (!fs.existsSync(jsonPath)) {
    console.error(`[report] JSON not found: ${jsonPath}`);
    console.error('Run tests first so test-results/report.json exists (see playwright.config reporters).');
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  let report;
  try {
    report = JSON.parse(raw);
  } catch (e) {
    console.error('[report] Invalid JSON:', e.message);
    process.exit(1);
  }

  const rows = [];
  for (const suite of report.suites || []) {
    rows.push(...visitSuite(suite, suite.file, []));
  }

  const counts = aggregate(rows);
  const total = rows.length;
  const stamp = new Date().toISOString();
  const pw = report.config?.version;

  const lines = [
    '# Test run summary',
    '',
    `**Generated:** ${stamp}`,
    `**Source:** \`${path.relative(root, jsonPath).replace(/\\/g, '/')}\`${pw ? ` · Playwright ${pw}` : ''}`,
    '',
    '## Counts',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    `| Total | ${total} |`,
    ...Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `| ${k} | ${v} |`),
    '',
    '## Results',
    '',
    '| Project | Status | ms | Test |',
    '|---------|--------|----|------|',
  ];

  for (const r of rows) {
    const file = r.file ? path.basename(r.file) : '';
    const safe = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
    lines.push(`| ${safe(r.project || '—')} | ${safe(r.status)} | ${r.duration} | ${safe(r.title)} (${safe(file)}) |`);
  }

  lines.push('');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`[report] Wrote ${path.relative(root, outPath)} (${total} tests)`);
}

main();
