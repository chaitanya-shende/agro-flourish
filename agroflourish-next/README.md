# AgroFlourish Website

A modern, SEO-ready marketing site for AgroFlourish – fresh, pesticide-free hydroponic vegetables. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **App Router**. Contact form sends email to **hello.agroflourish@gmail.com** via [Resend](https://resend.com); ready to deploy on **Vercel**.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Hook Form** + **Zod** (contact form validation)

## Quick start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).

### Contact form (email)

Submissions are sent to **hello.agroflourish@gmail.com**. To enable sending:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day).
2. Create an API key and add it locally:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and set RESEND_API_KEY=re_xxxx...
   ```
3. On Vercel, add **RESEND_API_KEY** in the project’s **Environment Variables**.

Without `RESEND_API_KEY`, the form will show an error when submitting.

## Build & start

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this project to GitHub (or use the `agroflourish-next` folder as the root of a new repo).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
3. Import the repo; set **Root Directory** to `agroflourish-next` if the app lives in a subfolder.
4. Leave **Build Command** as `npm run build` and **Output Directory** as default.
5. Deploy. Vercel will assign a URL (e.g. `agroflourish.vercel.app`).

### Custom domain

In the Vercel project: **Settings** → **Domains** → add your domain and follow the DNS instructions.

## Project structure

```
agroflourish-next/
├── src/
│   ├── app/              # App Router: layout, page, api/contact, globals.css
│   ├── components/       # UI and sections (Hero, About, Contact, etc.)
│   ├── contexts/         # LanguageContext (EN / HI / MR)
│   ├── data/             # content.ts, translations.ts
│   └── lib/              # utils (cn)
├── public/               # favicon, optional /images (hero-bg.png, etc.)
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Optional: add images

Place images in `public/images/` for:

- `hero-bg.png` – hero section background
- `about-farm.png` – about section image
- `texture-leaf.png` – products section texture

If these are missing, the site still works; hero and about use gradient/placeholder styling.

## Expandable later

This codebase is a single-page marketing site. You can later add:

- **Shop** – product pages or e‑commerce (e.g. Stripe, Snipcart)
- **Blog** – `app/blog/` with MDX or CMS
- **Dashboard** – separate app or protected routes with auth
