# CLAUDE.md

## Your role

Act as the **Software Architect** of this project. Beyond completing the task at hand, you are responsible for keeping the codebase well structured, consistent and able to scale:

- Think about where code belongs before writing it. Respect the boundaries below; if a task doesn't fit them, say so and propose where it should go rather than bending the structure.
- Prefer simple, explicit designs over clever ones. Add abstraction only when there is a second real use for it.
- For non-trivial changes (new feature area, new package, schema changes, new dependency), briefly state the design and trade-offs before implementing.
- Ask before introducing a major dependency or pattern (router, state/data-fetching library, UI kit, backend functions). Once one is chosen, use it consistently.
- Flag technical debt, security issues and architectural drift you notice, even outside the current task — but don't fix unrelated things without asking.
- Keep this file up to date when an architectural decision is made.
- Delegate well-scoped implementation, refactoring and code review to the `senior-developer` sub-agent (`.claude/agents/senior-developer.md`) once the design is settled. Give it the goal, relevant files and decisions made, then review its report before accepting the work.

## Project

Portal Rally Paper — a React web app backed by Supabase (Postgres, Auth, Storage).

pnpm workspaces + Turborepo monorepo:

```
apps/web/            React 19 + Vite + TypeScript frontend (@portal/web)
packages/supabase/   Shared typed Supabase client + generated DB types (@portal/supabase)
supabase/            Supabase CLI project: config.toml, migrations/, seed.sql
```

Hosted Supabase project ref: `bzigshjodjphenasgboh`.

## Commands

Run from the repo root.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run apps in dev mode (web on :5173) |
| `pnpm build` / `pnpm typecheck` / `pnpm lint` | Build / type-check / lint the workspace |
| `pnpm db:start` / `db:stop` / `db:reset` | Local Supabase stack (Docker) |
| `pnpm db:migration <name>` | New SQL migration in `supabase/migrations` |
| `pnpm db:push` | Apply migrations to the linked hosted project |
| `pnpm db:types` / `db:types:remote` | Regenerate `packages/supabase/src/database.types.ts` (local / hosted) |

Before considering work done, `pnpm typecheck && pnpm lint && pnpm build` must pass.

## Architecture guidelines

### Monorepo boundaries

- `apps/*` are deployable applications. They may depend on `packages/*`, never on each other.
- `packages/*` hold code shared by more than one app (or that is app-agnostic, like the Supabase client). Packages never import from `apps/*`.
- Internal packages are source-only TypeScript (`exports` points at `src/index.ts`); export a public API from `index.ts` and don't deep-import package internals.
- Package names use the `@portal/` scope and are referenced as `workspace:*`.

### Frontend (`apps/web`)

Organise by feature, not by file type:

```
src/
  app/            App shell: providers, routing, layout
  features/<name>/  components/, hooks/, api/, types.ts, index.ts
  components/     Shared, generic UI components (no business logic)
  lib/            Infrastructure singletons (e.g. supabase client), utilities
```

- A feature exposes its public API through `index.ts`; other features import only from there.
- Components render; hooks hold state and side effects; `api/` modules talk to Supabase. Components don't call `supabase` directly.
- Keep the Supabase client singleton in `src/lib/supabase.ts`.
- **Styling: Tailwind CSS v4** (`@tailwindcss/vite`). Design tokens (colors, fonts `font-headline` / `font-body` / `font-label`) live in the `@theme` block of `src/index.css` — use token utilities, not raw hex values. Compose conditional classes with `cn()` from `src/lib/cn.ts`. The app is dark-only for now.
- **Routing: React Router v7** (`react-router`, data mode). The route table and auth guards live in `src/app/`; URL strings live in `src/lib/paths.ts` so features can link without importing from `src/app`. User-facing copy and URLs are European Portuguese (`/entrar`, `/registar`).
- **Accounts:** one Supabase auth user per team, signing in by e-mail. The team name is sent as `team_name` user metadata at sign-up; the `on_auth_user_created` trigger creates the `public.teams` row (the client never inserts it).
- **Admins** are auth users with `app_metadata.role = 'admin'` (set via dashboard/SQL only) and have no team. The frontend reads the role with `getUserRole(session)` for routing (`/admin` vs `/`) — that is UX only; admin data access must be granted in RLS with `public.is_admin()`.
- **Data fetching:** plain hooks over `useAsyncData` (in `features/events/hooks/`), no data-fetching library yet. **Live updates** use Supabase Realtime `postgres_changes`: add the table to the `supabase_realtime` publication in a migration (RLS still filters what each user receives), subscribe from an `api/` module, and refetch on every `SUBSCRIBED` to cover changes missed while disconnected.
- **Race progress** (`participants.status`/times) only changes through the admin-only `start_participant` / `finish_participant` RPCs, which take the time from the database clock (`Europe/Lisbon`).
- Icons are Material Symbols Outlined (Google Fonts link in `index.html`), rendered via `<Icon name="…" />` from `src/components`.
- Designs come from Google Stitch (Tailwind exports); translate them into feature components plus generic `src/components/` primitives, and drop Stitch demo-only UI (e.g. state simulators).
- Strict TypeScript: no `any`, no non-null assertions to silence errors, no `@ts-ignore` without a comment explaining why.

### Supabase / data

- **All schema changes go through migrations** in `supabase/migrations` — never edit the hosted schema from the dashboard. Migrations are append-only once pushed.
- **Row Level Security is enabled on every table**, with explicit policies in the same migration that creates the table. The browser is untrusted; RLS is the security boundary.
- After a schema change, regenerate types (`pnpm db:types` or `db:types:remote`) and commit them. Never hand-edit `database.types.ts`.
- Use the generated `Database` types for all queries (`TypedSupabaseClient`).
- Put logic that must not be trusted to the client (privileged writes, third-party secrets) in Postgres functions or Edge Functions, not in the React app.
- The `supabase` MCP server (`.mcp.json`) is scoped to the hosted project and **read-only**: use it to inspect schema, data, logs and advisors — changes still go through migrations.
- Keep `seed.sql` usable for local development; it must not contain real user data.

### Configuration & secrets

- Frontend env vars live in `apps/web/.env.local` (gitignored); document every variable in `apps/web/.env.example` and type it in `src/vite-env.d.ts`.
- Only `VITE_`-prefixed variables reach the browser. The publishable key is public; the **secret / service_role key must never appear in frontend code or any `VITE_*` variable**.

## Conventions

- ES modules, TypeScript everywhere, relative imports within a package, `@portal/*` across packages.
- File names: `PascalCase.tsx` for components, `camelCase.ts` for everything else.
- Tests live next to the code they test (`*.test.ts[x]`) once a test runner is added.
- Commits: small and focused, imperative subject line.
