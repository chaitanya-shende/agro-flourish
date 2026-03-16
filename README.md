# AgroFlourish

Monorepo with two deployable apps: **AgroFlourish** (main product) and **Tenant-Nexus** (tenant/sandbox). Each app is a pnpm workspace with shared libs, a frontend, and an API server.

## Repository structure

```
AgroFlourish/           # Repo root (you are here)
├── README.md           # This file
├── DEPLOY.md           # Step-by-step deploy guide (Neon + Render)
├── package.json        # Root scripts to run either app
├── AgroFlourish/       # App 1: main product
│   ├── package.json    # Workspace root
│   ├── pnpm-workspace.yaml
│   ├── .env.example
│   ├── lib/            # Shared packages (@workspace/db, api-spec, api-zod, api-client-react)
│   ├── artifacts/
│   │   ├── agroflourish/   # React frontend
│   │   └── api-server/    # Express API + serves frontend in production
│   └── scripts/
└── Tenant-Nexus/       # App 2: tenant/sandbox
    ├── package.json
    ├── pnpm-workspace.yaml
    ├── .env.example
    ├── lib/
    ├── artifacts/
    │   ├── mockup-sandbox/ # Frontend
    │   └── api-server/
    └── scripts/
```

## Quick start (install & run locally)

**Requirements:** Node 20+ (or 24), [pnpm](https://pnpm.io) (e.g. `corepack enable && corepack prepare pnpm@latest --activate`).

### Option A: From repo root (convenience)

```bash
# Install both apps
pnpm run install:all

# Work on one app (example: AgroFlourish)
cd AgroFlourish
cp .env.example .env   # Edit .env and set DATABASE_URL (see below)
pnpm install           # If you didn't run install:all
pnpm run db:push       # Apply DB schema (first time)
pnpm run build:deploy  # Build frontend + API
pnpm run start         # Run API server (serves frontend from build)
# Open http://localhost:3000 (or your PORT)
```

### Option B: From app directory

```bash
cd AgroFlourish   # or Tenant-Nexus
cp .env.example .env
# Edit .env: set DATABASE_URL (and optionally PORT, PUBLIC_DIR, NODE_ENV)
pnpm install
pnpm run db:push       # First time: push schema to DB
pnpm run build:deploy  # Production build
pnpm run start         # Start server
```

**Development (frontend + API in dev mode):**

```bash
cd AgroFlourish
pnpm run db:push
# Terminal 1: pnpm --filter @workspace/agroflourish run dev
# Terminal 2: pnpm --filter @workspace/api-server run dev
```

## Environment variables

Copy `.env.example` to `.env` in the app folder and set:

| Variable       | Description |
|----------------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (e.g. [Neon](https://neon.tech)); required for API and `db:push`. |
| `PORT`         | Server port (default in example: 3000). |
| `PUBLIC_DIR`   | Path to built frontend for production (set in example). |
| `NODE_ENV`     | `development` or `production`. |

Do not commit `.env`; it is gitignored.

## Deploy & publish

See **[DEPLOY.md](./DEPLOY.md)** for:

- Free PostgreSQL (Neon) and hosting (Render)
- Build and start commands (use `pnpm run build:deploy` and `pnpm run start` in Render)
- Environment variables for production
- Applying the database schema after first deploy

Each app is deployed separately (different Render service, optional different Neon DB). In Render, set **Root directory** to `AgroFlourish` or `Tenant-Nexus` and use that app’s build/start commands.

## Updating the project

After pulling changes:

```bash
# If you use root scripts:
pnpm run install:all

# Or per app:
cd AgroFlourish   # or Tenant-Nexus
pnpm install
pnpm run db:push  # If there were schema changes
pnpm run build:deploy
pnpm run start
```

For production (e.g. Render), push to your main branch; Render will reinstall, rebuild, and restart using the same `build:deploy` and `start` scripts.

## Scripts reference

**Root (this directory):**

| Script            | Description                    |
|-------------------|--------------------------------|
| `pnpm run install:all` | `pnpm install` in both apps |

**Per app (inside AgroFlourish/ or Tenant-Nexus/):**

| Script           | Description                                  |
|------------------|----------------------------------------------|
| `pnpm run build` | Typecheck and build all workspace packages   |
| `pnpm run build:deploy` | Build frontend + API for production   |
| `pnpm run start` | Run production API server (serves built SPA) |
| `pnpm run db:push` | Apply Drizzle schema to DATABASE_URL      |

Frontend and API each have their own `dev` and `build` scripts; use `pnpm --filter @workspace/<package>` to run them.
