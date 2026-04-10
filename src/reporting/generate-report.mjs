#!/usr/bin/env node
/**
 * Builds reports/summary.md from Playwright JSON reporter output.
 * Run after: npx playwright test (with json reporter enabled in playwright.config.ts)
 *
 * Conventions: docs/test-plans.md (test case + report format). Set REPORT_PLAN_PATH to a
 * feature plan (e.g. tests/plans/saucedemo-plan.md) so "Steps" links to the right file.
 *
 * Env:
 *   PLAYWRIGHT_JSON_REPORT — default test-results/report.json
 *   REPORT_MD_OUT          — default reports/summary.md
 *   REPORT_PLAN_PATH       — path for "Steps to reproduce" column (default docs/test-plans.md)
 *   REPORT_MD_INCLUDE_RAW  — set to "1" to append a debug table of full Playwright titles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');

const jsonPath = process.env.PLAYWRIGHT_JSON_REPORT || path.join(root, 'test-results', 'report.json');
const outPath = process.env.REPORT_MD_OUT || path.join(root, 'reports', 'summary.md');
const planPath =
  process.env.REPORT_PLAN_PATH || path.join('docs', 'test-plans.md');

/** Split Playwright test title like "AUTH-OK — description" → plan ref + short expected hint. */
function parseTitle(specTitle) {
  const separators = /\s+[—–]\s+/;
  const parts = specTitle.split(separators);
  if (parts.length >= 2) {
    return {
      planRef: parts[0].trim(),
      expectedHint: parts.slice(1).join(' — ').trim(),
    };
  }
  return { planRef: '—', expectedHint: specTitle.trim() };
}

function sanitizeCell(s, maxLen = 500) {
  let t = String(s ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
  if (t.length > maxLen) t = `${t.slice(0, maxLen - 1)}…`;
  return t || '—';
}

function firstErrorMessage(last) {
  if (!last) return '';
  if (last.error?.message) return last.error.message;
  const errs = last.errors;
  if (Array.isArray(errs) && errs.length) {
    const m = errs[0]?.message || errs[0];
    if (typeof m === 'string') return m;
  }
  return '';
}

function actualResultForStatus(status, last) {
  const err = firstErrorMessage(last);
  switch (status) {
    case 'passed':
      return 'As expected (assertions passed).';
    case 'skipped':
      return 'Not executed (skipped).';
    case 'timedOut':
      return err ? sanitizeCell(err, 400) : 'Timed out.';
    case 'interrupted':
      return 'Interrupted.';
    case 'failed':
      return err ? sanitizeCell(err, 400) : 'Failed (see HTML report or trace).';
    default:
      return err ? sanitizeCell(err, 400) : '—';
  }
}

function buildComment(last, status) {
  const bits = [];
  if (last && typeof last.retry === 'number' && last.retry > 0) {
    bits.push(`Retries: ${last.retry}`);
  }
  if (status === 'failed' || status === 'timedOut') {
    bits.push('Check playwright-report/ for screenshots/trace.');
  }
  return bits.length ? bits.join(' ') : '—';
}

function visitSuite(suite, inheritedFile, breadcrumbs) {
  const filePath = suite.file || inheritedFile;
  const crumbs = [...breadcrumbs];
  if (suite.title) crumbs.push(suite.title);

  const rows = [];
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const results = test.results || [];
      const last = results.length ? results[results.length - 1] : null;
      const status = last?.status || 'unknown';
      const title = [...crumbs, spec.title].filter(Boolean).join(' › ');
      const { planRef, expectedHint } = parseTitle(spec.title);

      rows.push({
        file: filePath || '',
        title,
        specTitle: spec.title || '',
        planRef,
        expectedHint,
        project: test.projectName || '',
        status,
        duration: typeof last?.duration === 'number' ? last.duration : 0,
        last,
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
  const planRel = planPath.replace(/\\/g, '/');

  const lines = [
    '# Test execution report',
    '',
    'Structured like a manual test report: **steps** point at the Markdown plan (see `docs/test-plans.md`); **expected** comes from the test title; **actual** and **status** come from this Playwright run.',
    '',
    '| Field | Source |',
    '|-------|--------|',
    '| Steps to reproduce | `REPORT_PLAN_PATH` (default: `docs/test-plans.md`) + **Test case ID** |',
    '| Expected result | Short hint parsed from spec title (after `—`); full detail in the feature plan |',
    '| Actual result | Outcome of this run (pass message or error text) |',
    '| Status | Playwright result status |',
    '| Comment | Retries, pointer to HTML report on failure |',
    '',
    '---',
    '',
    `**Generated:** ${stamp}`,
    `**JSON source:** \`${path.relative(root, jsonPath).replace(/\\/g, '/')}\`${pw ? ` · Playwright ${pw}` : ''}`,
    '',
    '## Summary',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    `| Total tests | ${total} |`,
    ...Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `| ${k} | ${v} |`),
    '',
    '## Detailed results',
    '',
    '| # | Test case ID | Steps to reproduce (plan ref) | Expected result | Actual result | Status | ms | Comment |',
    '|---|--------------|--------------------------------|-----------------|---------------|--------|----|---------|',
  ];

  rows.forEach((r, i) => {
    const stepsRef =
      r.planRef === '—'
        ? `${planRel} *(no Case ID in title: name tests like "PREFIX-001 — …")*`
        : `${planRel} § **${sanitizeCell(r.planRef)}**`;
    const expected = sanitizeCell(r.expectedHint);
    const actual = sanitizeCell(actualResultForStatus(r.status, r.last));
    const comment = sanitizeCell(buildComment(r.last, r.status));
    const safeStatus = sanitizeCell(r.status);
    const idx = i + 1;
    lines.push(
      `| ${idx} | ${sanitizeCell(r.planRef)} | ${stepsRef} | ${expected} | ${actual} | ${safeStatus} | ${r.duration} | ${comment} |`,
    );
  });

  if (process.env.REPORT_MD_INCLUDE_RAW === '1') {
    lines.push('');
    lines.push('## Raw titles (debug)');
    lines.push('');
    lines.push('| Project | File | Full title |');
    lines.push('|---------|------|------------|');
    for (const r of rows) {
      const file = r.file ? path.basename(r.file) : '';
      lines.push(`| ${sanitizeCell(r.project || '—')} | ${sanitizeCell(file)} | ${sanitizeCell(r.title)} |`);
    }
    lines.push('');
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`[report] Wrote ${path.relative(root, outPath)} (${total} tests)`);
}

main();
