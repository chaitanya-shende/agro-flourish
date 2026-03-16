# AgroFlourish

**AgroFlourish** – fresh, pesticide-free hydroponic vegetables. This repo contains the **Vercel-ready Next.js website** (no backend, no database).

## Recommended: Next.js website (Vercel)

The main website lives in **`agroflourish-next/`**: a frontend-only Next.js app (TypeScript, Tailwind, App Router, ESLint) that you can deploy on Vercel in minutes.

```bash
cd agroflourish-next
npm install
npm run dev    # http://localhost:4000
```

- **Free hosting** on Vercel
- **SEO ready** (metadata, semantic HTML)
- **Custom domain** supported
- **Expandable** (you can add shop, blog, or dashboard later)

See **[agroflourish-next/README.md](./agroflourish-next/README.md)** for:

- Full tech stack and project structure
- Deploy steps (Vercel, custom domain)
- Optional images (`public/images/`)
- How to extend (shop, blog, etc.)

## Legacy monorepo (optional)

The folders **`AgroFlourish/`** and **`Tenant-Nexus/`** are the original monorepo (React frontend + Express API + PostgreSQL/Drizzle). They are **not required** for the Vercel website. If you still use them, see the old [DEPLOY.md](./DEPLOY.md) for Neon + Render.

## Summary

| Goal                        | Use this                           |
| --------------------------- | ---------------------------------- |
| Run/deploy the main website | `agroflourish-next/` + Vercel      |
| Old full-stack (API + DB)   | `AgroFlourish/` or `Tenant-Nexus/` |
