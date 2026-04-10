# Skill: API (HTTP)

## Purpose
Reusable workflow for **API testing** via Playwright’s request fixture or `fetch` in tests—**never** as MCP browser actions.

## Inputs
- Base URL (e.g. OpenAPI `servers` URL)
- Method, path, headers, body schema
- Expected status and JSON shape (or error case)

## Outputs
- Scenarios in `tests/plans/*-api-plan.md` when needed
- Tests in `tests/api/*.spec.ts`

## Logic (deterministic)
1. Arrange: create request context / auth if required.
2. Act: single HTTP call per scenario step (or explicit sequence).
3. Assert: status + body fields; use stable partial matchers for dynamic ids.

## Notes
- Prefer Playwright `request` fixture for traceability and CI parity.
