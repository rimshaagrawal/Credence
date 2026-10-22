# Credence

Credence is a demonstration product for presenting skill claims, evidence context, and portable candidate profiles.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (uses `PORT`, default 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/credence/` — React/Vite landing page, candidate workspace, employer workspace, public profile, and credential screens
- `artifacts/api-server/src/routes/credence.ts` — Credence API routes
- `artifacts/api-server/src/lib/credence-demo.ts` — fictional demonstration seed data
- `lib/api-spec/openapi.yaml` — API contract and source for generated client/hooks
- `lib/db/src/schema/credence.ts` — PostgreSQL schema for profiles, claims, evidence, credentials, activity, and shortlists
- `artifacts/credence/src/index.css` — Credence visual tokens and styles

## Architecture decisions

- The web app and API use the existing pnpm monorepo, OpenAPI code generation, and Drizzle/PostgreSQL setup.
- Seeded profiles, claims, evidence descriptions, verification states, and credential records are fictional and carry explicit demo labels.
- Verification requests return an honest unavailable result until a live evidence provider is configured; no positive result is generated from demo evidence.
- QR codes link to public demo profiles; credential records are not represented as blockchain-anchored.

## Product

Users can inspect a candidate passport, submit claims that remain pending, browse fictional candidate profiles, compare candidates, run explainable role matching, inspect evidence and credential records, and share public profiles. The interface includes account-free candidate and employer demo workspaces.

## User preferences

No additional project-wide preferences have been recorded.

## Gotchas

- The demo has no authentication or per-user data access. Profile edits and submitted claims use a shared dataset; do not enter real, personal, or confidential information.
- Clerk authentication, live evidence discovery, private-document uploads, and blockchain issuance are not configured. Do not describe the current demo as production-ready or as performing real verification.
- Run `pnpm --filter @workspace/api-spec run codegen` after changing the OpenAPI contract, then typecheck the affected packages.
- `pnpm --filter @workspace/db run push` is for development schema changes; do not use it as a production migration.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
