# Step-by-step: Publish AgroFlourish for free

This guide gets the **AgroFlourish** app (frontend + API + database) running on free tiers so everything works in one place.

**Strategy:** One combined app (API serves the React frontend + `/api`). Free PostgreSQL (Neon). Free hosting (Render).

For local install and run, see the [README](./README.md).

---

## What you’ll use (all free)

| Service   | Purpose              | Free tier        |
|----------|----------------------|------------------|
| **Neon** | PostgreSQL database  | 0.5 GB, no credit card |
| **Render** | Run Node app (API + frontend) | 750 hrs/month, sleeps after 15 min idle |

---

## Part 1: Database (Neon)

1. **Sign up**
   - Go to [neon.tech](https://neon.tech) and sign up (GitHub is fine).

2. **Create a project**
   - New Project → pick name (e.g. `agroflourish`) and region.
   - Create.

3. **Copy connection string**
   - On the project dashboard you’ll see a connection string like:
     ```text
     postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
     ```
   - Copy it and keep it for **Part 3** as `DATABASE_URL`.

---

## Part 2: Code on GitHub (for Render)

1. **Create a repo** (if you don’t have one):
   - [github.com/new](https://github.com/new) → name e.g. `ArgoFlourish` or `AgroFlourish`.

2. **Push your code**
   - From your machine, in the project root (parent of `AgroFlourish/`):
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```
   - Or only push the `AgroFlourish` folder and use that as the “root” in Render (see below).

---

## Part 3: Deploy on Render

1. **Sign up**
   - Go to [render.com](https://render.com) and sign up (GitHub is fine).

2. **New Web Service**
   - Dashboard → **New +** → **Web Service**.
   - Connect the GitHub repo that contains the app (e.g. the repo where `AgroFlourish` lives).

3. **Configure the service**
   - **Name:** e.g. `agroflourish`.
   - **Region:** pick one close to you.
  - **Root directory (important):**  
    - If you pushed the **whole repo** (so the repo has an `AgroFlourish` folder inside it), set to `AgroFlourish`.  
    - If you pushed **only the app** (so `package.json` is at the repo root), **leave this blank**.
   - **Runtime:** Node.
   - **Build command:**
     ```bash
     corepack enable && corepack prepare pnpm@latest --activate && pnpm install && pnpm run build:deploy
     ```
   - **Start command:**
     ```bash
     pnpm run start
     ```

4. **Environment variables** (in Render: Environment tab)
   Add:

   | Key            | Value                                                                 |
   |----------------|-----------------------------------------------------------------------|
   | `DATABASE_URL` | The Neon connection string from Part 1 (e.g. `postgresql://...?sslmode=require`) |
   | `PORT`         | Leave empty; Render sets this automatically.                         |
   | `PUBLIC_DIR`   | `artifacts/agroflourish/dist/public`                                  |
   | `NODE_ENV`     | `production`                                                          |
   | `NODE_VERSION` | `24` (optional; set if your build fails on an older Node)            |

   Do **not** commit `.env` or put real secrets in the repo. Set them only in Render.

5. **Create service**
   - Click **Create Web Service**.
   - Render will install deps, run the build, then start the server. First deploy can take a few minutes.

6. **Apply database schema (first time only)**
   - After the first successful deploy, run the schema push from your **local** machine (with the same `DATABASE_URL`), or use Render’s **Shell**:
     - Open your service → **Shell** tab.
     - In the shell (which is in the app root, e.g. `AgroFlourish/`):
       ```bash
       pnpm run db:push
       ```
   - If you prefer local: in `AgroFlourish/` copy `.env.example` to `.env`, set `DATABASE_URL` (same as Render), then run:
     ```bash
     pnpm run db:push
     ```

7. **Open the app**
   - Render gives a URL like `https://agroflourish.onrender.com`. Open it: you should see the AgroFlourish site, and `/api/healthz` should return JSON.

---

## Part 4: Make sure everything works

1. **Homepage**
   - Visit `https://your-app.onrender.com` → you should see the AgroFlourish frontend.

2. **API**
   - Visit `https://your-app.onrender.com/api/healthz` → you should see something like `{"status":"ok"}` (or whatever your health response is).

3. **Database**
   - If you have features that use the DB, test one (e.g. a page that reads/writes data). If you only ran `push` once, the schema is applied and the app should be able to talk to Neon.

---

## Optional: Run the same stack locally

From the [README](./README.md): use the app’s scripts so you don’t have to remember paths:

1. **Node & pnpm**
   - Node 20+ or 24 (e.g. `nvm install 24 && nvm use 24`).
   - `corepack enable && corepack prepare pnpm@latest --activate`.

2. **Env**
   - In `AgroFlourish/` copy `.env.example` to `.env` and set `DATABASE_URL` (and optionally `PORT`, `PUBLIC_DIR`, `NODE_ENV`).

3. **Install, schema, build, run**
   ```bash
   cd AgroFlourish
   pnpm install
   pnpm run db:push
   pnpm run build:deploy
   pnpm run start
   ```
   Open [http://localhost:3000](http://localhost:3000) (or your `PORT`).

---

## Troubleshooting

- **`ERR_PNPM_NO_PKG_MANIFEST` / No package.json found in .../AgroFlourish**  
  Your repo root is already the monorepo (package.json at root). In Render → Service → Settings → **Root directory**, clear the value and leave it **blank**, then redeploy.

- **Build fails on “Use pnpm instead”**  
  Build command must use `pnpm` (see above). Ensure `corepack enable` and `pnpm` install/run are in the same build command.

- **Build fails: PORT or BASE_PATH**  
  The `build:deploy` script sets these for the frontend build. If you run the frontend build manually, use `PORT=5173 BASE_PATH=/`.

- **Blank page or 404**
  - Check that `PUBLIC_DIR=artifacts/agroflourish/dist/public` is set in Render.
  - Ensure start command is `pnpm run start` and root directory is `AgroFlourish` (or your app root).

- **Database connection errors**
  - In Neon, ensure “Pooled” or the correct connection string is used and `?sslmode=require` is present.
  - In Render, ensure `DATABASE_URL` is set and has no extra spaces.

- **App sleeps (Render free)**  
  After ~15 min with no traffic, the service sleeps. The first request after that can take 30–60 seconds to respond; that’s normal on the free tier.

---

## Tenant-Nexus

To deploy **Tenant-Nexus** the same way:

- **Root directory:** `Tenant-Nexus`.
- **Build command:** `corepack enable && corepack prepare pnpm@latest --activate && pnpm install && pnpm run build:deploy`
- **Start command:** `pnpm run start`
- **Environment:** Same as above; set `PUBLIC_DIR=artifacts/mockup-sandbox/dist` (Tenant-Nexus frontend outputs to `dist`, not `dist/public`).
- Use a separate Neon project (or database) and set `DATABASE_URL` for Tenant-Nexus to that.

Otherwise repeat the same steps in this guide for the Tenant-Nexus app.
