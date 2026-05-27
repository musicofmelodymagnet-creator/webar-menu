# WebAR Menu

B2B SaaS platform for restaurants. Guests scan a QR code and see dishes in 3D/AR directly in the browser — no app required.

**Live:** https://ar-menu.verunsky.pp.ua

---

## How it works

1. Restaurant admin uploads a GLB model and names the dish
2. A unique QR code is generated per dish
3. Guest scans the QR → dish appears floating on the table in AR

Works on iOS Safari (AR Quick Look / USDZ) and Android Chrome (WebXR). No app install, no plugin.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Database | Prisma + SQLite |
| AR/3D | `<model-viewer>` by Google |
| Fonts | Syne + DM Sans via `next/font` |
| Auth | NextAuth.js (credentials) |
| Uploads | formidable → `/public/uploads/` |

---

## Local development

```bash
npm install
npx prisma migrate dev
npx ts-node prisma/seed.ts   # seed admin user
npm run dev                  # http://localhost:3000
```

Copy `.env.example` to `.env` and fill in the values.

---

## URL structure

```
/                                      → landing page
/r/[slug]                              → redirects to first active dish
/r/[slug]/[dish_slug]                  → AR viewer (guest-facing)
/admin                                 → login
/admin/dashboard                       → restaurant list
/admin/restaurants/[id]                → edit restaurant + dishes
```

---

## Production deploy (VPS / Docker)

```bash
cd /home/admin/docker/webar-menu && git pull && docker build -t webar-menu . && docker stop webar-menu && docker rm webar-menu && docker run -d --name webar-menu --restart unless-stopped -p 3006:3006 --env-file /home/admin/docker/webar-menu/.env.production -v /home/admin/docker/webar-menu/data:/data -v /home/admin/docker/webar-menu/uploads:/app/public/uploads webar-menu
```

See `CLAUDE.md` for full deployment notes, nginx template, and known gotchas.

---

## Environment variables

```env
DATABASE_URL=file:/data/prod.db
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=...   # bcrypt hash
NODE_ENV=production
```
