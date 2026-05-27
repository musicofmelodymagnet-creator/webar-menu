# WebAR Menu — Project Reference

## Concept
B2B SaaS platform: interactive WebAR menus for restaurants, no app download required.
Guest scans QR → browser opens → 3D dish appears on table via AR.

**Critical constraint**: strict tenant isolation. Guest of restaurant A cannot navigate to restaurant B or see the platform catalog.

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | SSR, routing, API routes in one |
| Database | Prisma + SQLite (prototype) | Zero-config, easy migrate to Postgres |
| AR/3D renderer | `<model-viewer>` (Google) | Handles GLB (Android) + USDZ (iOS QuickLook) natively, no 8th Wall license needed |
| Styling | Tailwind CSS + inline styles (landing) | Fast, responsive |
| Admin Auth | NextAuth.js (credentials) | Simple single-owner login |
| File uploads | Built-in Next.js API + formidable | 3D models + logos saved to /public/uploads |
| Fonts | Syne (display) + DM Sans (body) via next/font | CSS vars `--font-display`, `--font-body` |

### AR Anti-shake
WebXR hit-test results fed through an **exponential moving average (EMA)** low-pass filter before being applied to model position/rotation. Alpha ≈ 0.12 (tune in `src/lib/ar-smoother.ts`). Fallback to 3D mode after 5 s if no plane detected.

---

## URL Structure

```
/                          → 404 stub (no catalog, no brand)
/r/[restaurant_slug]       → redirects to first active dish
/r/[restaurant_slug]/[dish_slug]  → WebAR viewer (guest page)
/admin                     → login
/admin/dashboard           → restaurant list
/admin/restaurants/new     → create restaurant
/admin/restaurants/[id]    → edit restaurant + dish list
/admin/restaurants/[id]/dishes/new     → add dish
/admin/restaurants/[id]/dishes/[dId]   → edit dish
```

---

## Database Schema (Prisma)

```prisma
model Restaurant {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  logoUrl   String?
  active    Boolean  @default(true)
  dishes    Dish[]
  createdAt DateTime @default(now())
}

model Dish {
  id           String     @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  name         String
  slug         String
  modelUrl     String     // path to .glb file
  usdzUrl      String?    // path to .usdz file (iOS)
  order        Int        @default(0)
  visible      Boolean    @default(true)
  createdAt    DateTime   @default(now())

  @@unique([restaurantId, slug])
}
```

---

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/r/[slug]` | public | Restaurant + active dishes |
| GET | `/api/r/[slug]/[dish_slug]` | public | Single dish data |
| GET | `/api/admin/restaurants` | admin | List all restaurants |
| POST | `/api/admin/restaurants` | admin | Create restaurant |
| PUT | `/api/admin/restaurants/[id]` | admin | Update (name, slug, logo, active) |
| DELETE | `/api/admin/restaurants/[id]` | admin | Delete restaurant |
| GET | `/api/admin/restaurants/[id]/dishes` | admin | List dishes |
| POST | `/api/admin/restaurants/[id]/dishes` | admin | Add dish + upload model |
| PUT | `/api/admin/dishes/[id]` | admin | Update dish (name, slug, order, visible) |
| DELETE | `/api/admin/dishes/[id]` | admin | Delete dish |
| POST | `/api/admin/upload` | admin | Upload file → returns URL |

---

## Guest WebAR Page Layout (top → bottom)

1. **Header** — restaurant logo + name (fixed, minimal)
2. **AR Viewport** — `<model-viewer>` fills screen; AR mode active by default
3. **AR/3D toggle button** — switches between `ar` and `orbit` mode
4. **Dish name** — large text below viewport
5. **Dish slider (footer)** — horizontal swipe carousel of all active dishes for this restaurant

---

## Key Implementation Notes

- **Isolation**: root `/` returns 404. No nav links on guest pages. Router enforces `/r/[slug]/...` prefix.
- **model-viewer AR**: use `ar ar-modes="webxr scene-viewer quick-look"` attribute order — WebXR first for Android Chrome, Quick Look for iOS Safari.
- **model-viewer lighting**: always set `environment-image="neutral" exposure="1.8" shadow-intensity="0"` — without these, mobile Chrome renders models very dark.
- **Anti-shake**: wrap WebXR `XRHitTestResult` pose with EMA before calling `object.position.set()`. See `src/lib/ar-smoother.ts`.
- **Stop-list**: `visible: false` on a dish excludes it from public API but keeps model file intact.
- **Uploads**: store in `public/uploads/models/` and `public/uploads/logos/`. In production, replace with S3/R2.
- **Admin password**: stored as `ADMIN_PASSWORD_HASH` (bcrypt) in `.env`. Default seed in `prisma/seed.ts`.
- **Landing page theme**: dark/light toggle via `html.light` class. All colors in CSS variables (`--c-bg`, `--c-accent`, etc.) defined in `page.tsx` `<style>` tag. Anti-FOUC inline script in `layout.tsx` reads `localStorage('theme')` before hydration. Phone screen internals in hero are hardcoded dark (they simulate a camera view and must not change with theme).
- **Scroll animations**: CSS-only scroll-driven parallax on phone mockup (`animation-timeline: scroll()`) — disabled on mobile via `@media (min-width: 921px)` to prevent premature fade. Entrance animations via CSS keyframes with stagger delays. Scroll-reveal via `IntersectionObserver` in `ScrollReveal` component.
- **Inline style + media query gotcha**: never use `display: flex/block` as an inline style on elements that need to be hidden by a media query — inline styles win over class selectors. Move layout `display` into the CSS class instead.

---

## Project Structure

```
ar-menu/
├── CLAUDE.md
├── .env
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── uploads/
│       ├── models/
│       └── logos/
└── src/
    ├── app/
    │   ├── layout.tsx                (Syne + DM Sans fonts; anti-FOUC theme script)
    │   ├── page.tsx                  (landing page — dark/light, CSS vars, scroll animations)
    │   ├── r/[slug]/
    │   │   ├── page.tsx              (redirect to first dish)
    │   │   └── [dish_slug]/page.tsx  (WebAR viewer)
    │   ├── admin/
    │   │   ├── layout.tsx            (auth guard)
    │   │   ├── page.tsx              (login)
    │   │   └── dashboard/...
    │   └── api/
    │       ├── auth/[...nextauth]/route.ts
    │       ├── r/[slug]/route.ts
    │       ├── r/[slug]/[dish_slug]/route.ts
    │       ├── admin/restaurants/...
    │       ├── admin/dishes/...
    │       └── admin/upload/route.ts
    ├── components/
    │   ├── ar-viewer.tsx             (model-viewer wrapper + AR/3D toggle)
    │   ├── dish-slider.tsx           (swipeable footer carousel)
    │   ├── landing-model.tsx         (model-viewer for landing hero; neutral lighting)
    │   ├── scroll-reveal.tsx         (IntersectionObserver entrance animation)
    │   ├── theme-toggle.tsx          (sun/moon toggle; writes html.light class + localStorage)
    │   └── admin/                    (admin UI components)
    ├── lib/
    │   ├── prisma.ts                 (Prisma client singleton)
    │   ├── auth.ts                   (NextAuth config)
    │   └── ar-smoother.ts            (EMA low-pass filter for WebXR)
    └── types/
        └── index.ts
```

---

## Environment Variables (.env)

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="change-me-in-production"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@webarmenu.com"
ADMIN_PASSWORD_HASH="$2b$10$..."   # bcrypt hash of admin password
```

---

## Commands

```bash
npm run dev          # dev server on :3000
npx prisma migrate dev   # apply schema changes
npx prisma studio    # visual DB editor
npx ts-node prisma/seed.ts  # seed admin user
```
