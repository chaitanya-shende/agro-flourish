# Step-by-step: Publish AgroFlourish for free

This guide gets the **AgroFlourish** website (Next.js, frontend-only) live on **Vercel** with a free tier. No backend or database.

For local install and run, see the [README](./README.md).

---

## What you’ll use (all free)

| Service    | Purpose          | Free tier                                |
| ---------- | ---------------- | ---------------------------------------- |
| **Vercel** | Host Next.js app | Hobby tier: unlimited static, serverless |

---

## Part 1: Code on GitHub

1. **Create a repo** (if you don’t have one):
   - [github.com/new](https://github.com/new) → name e.g. `AgroFlourish`.

2. **Push your code**
   - From your machine, in the project root:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```
   - If the Next.js app is in a subfolder (`agroflourish-next/`), you’ll set that as the **Root Directory** in Vercel (Part 2).

---

## Part 2: Deploy on Vercel

1. **Sign up**
   - Go to [vercel.com](https://vercel.com) and sign up (GitHub is fine).

2. **Import project**
   - Dashboard → **Add New** → **Project**.
   - Import the GitHub repo that contains your code.

3. **Configure the project**
   - **Project Name:** e.g. `agroflourish`.
   - **Root Directory:**
     - If the repo root is the Next.js app (only `agroflourish-next` contents at root), leave **blank**.
     - If the Next.js app is in a subfolder, set to `agroflourish-next`.
   - **Framework Preset:** Next.js (auto-detected).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** leave default (Vercel uses it for Next.js).
   - **Install Command:** `npm install` (default).

4. **Environment variables**
   - For the **contact form** to send email to hello.agroflourish@gmail.com, add **RESEND_API_KEY** (get a free key at [resend.com](https://resend.com)). Without it, form submit will show an error.
   - Add any other env vars (e.g. analytics) under **Environment Variables** in the project settings.

5. **Deploy**
   - Click **Deploy**.
   - Vercel will run `npm install` and `npm run build`. The first deploy usually finishes in 1–2 minutes.

6. **Open the app**
   - Vercel gives a URL like `https://agroflourish.vercel.app`. Open it to see the AgroFlourish site.

---

## Part 3: Custom domain (optional)

1. In the Vercel project → **Settings** → **Domains**.
2. Add your domain (e.g. `agroflourish.com` or `www.agroflourish.com`).
3. Follow the DNS instructions (add the records Vercel shows at your registrar).
4. After DNS propagates, Vercel will issue SSL and the site will be served on your domain.

---

## Part 4: Make sure everything works

1. **Homepage**
   - Visit your Vercel URL (or custom domain) → you should see the AgroFlourish frontend (Hero, About, Products, Contact, etc.).

2. **404**
   - Visit a non-existent path (e.g. `/not-a-page`) → you should see the custom 404 page and a “Back to Home” link.

3. **Future changes**
   - Push to the connected branch (e.g. `main`); Vercel will run a new build and update the deployment automatically.

---

## Optional: Run the same stack locally

From the [README](./README.md):

```bash
cd agroflourish-next
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).

---

## Troubleshooting

- **Build fails: “Cannot find module” or similar**  
  Ensure **Root Directory** is set to `agroflourish-next` if your repo has the app in that subfolder. The build must run in the directory that contains `package.json` and `next.config.mjs`.

- **Build fails: Node / npm**  
  Vercel uses a recent Node LTS by default. If you need a specific version, set `ENGINE` in `agroflourish-next/package.json` or the **Node.js Version** in Vercel project settings.

- **Blank or broken page**  
  Check the **Deployments** tab for the build log. Fix any TypeScript or ESLint errors locally with `npm run build` and `npm run lint` in `agroflourish-next/` before pushing.

- **Images missing (hero, about, products)**  
  Optional images go in `agroflourish-next/public/images/` (e.g. `hero-bg.png`, `about-farm.png`, `texture-leaf.png`). The site works without them; those sections use gradient/placeholder styling.
