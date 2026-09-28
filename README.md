# Portal Rally Paper

React + Supabase monorepo (pnpm workspaces + Turborepo).

```
apps/
  web/                 React 19 + Vite + TypeScript frontend
packages/
  supabase/            Shared typed Supabase client (@portal/supabase)
supabase/              Supabase CLI project: config, migrations, seed
```

## Prerequisites

- Node 22+ and pnpm 11
- Docker (only for running Supabase locally)

## Getting started

```bash
pnpm install
pnpm db:start                          # starts local Supabase in Docker, prints URL + keys
cp apps/web/.env.example apps/web/.env.local   # then paste the publishable key
pnpm dev                               # http://localhost:5173
```

To point at a hosted project instead, put its URL and publishable key in `apps/web/.env.local`.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build all apps |
| `pnpm typecheck` / `pnpm lint` | Type-check / lint the workspace |
| `pnpm db:start` / `db:stop` / `db:status` | Manage the local Supabase stack |
| `pnpm db:migration <name>` | Create a new SQL migration in `supabase/migrations` |
| `pnpm db:reset` | Recreate the local DB from migrations + `seed.sql` |
| `pnpm db:types` | Regenerate `packages/supabase/src/database.types.ts` from the local DB |
| `pnpm db:link` | Link the CLI to the hosted project (run `supabase login` first) |
| `pnpm db:push` | Apply local migrations to the linked hosted project |
| `pnpm db:types:remote` | Regenerate types from the linked hosted project |
