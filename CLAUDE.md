# CLAUDE.md — Bonneval Fine Wines

## Project docs (monorepo)

Runtime and Prismic notes live under the repo root [`docs/`](../docs/). **Lessons learned** (pitfalls and fixes) are in [`docs/lessons-learned/`](../docs/lessons-learned/).

## Commands

```bash
npm run dev          # Start Next.js dev server + Slice Machine UI simultaneously
npm run next:dev     # Next.js dev server only
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run format       # Prettier
npm run slicemachine # Start Slice Machine content model editor
```

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **CMS**: Prismic via Slice Machine
- **Styling**: CSS Modules (Tailwind to be added later)
- **Hosting**: Vercel
- **Version Control**: GitHub

## Architecture

### Content Flow
1. Content is authored in Prismic and fetched via `@prismicio/client`
2. Pages are composed of Slices — reusable content blocks defined in `src/slices/`
3. `SliceZone` renders the appropriate slice component based on Prismic data
4. Design tokens come from `src/lib/master-theme.ts`
5. Company data (address, social links, etc.) comes from `company-config.json` via `src/lib/company.ts`

### Routing (i18n)
- `/{lang}/` → `src/app/[lang]/page.tsx` — homepage
- `/{lang}/:uid` → `src/app/[lang]/[uid]/page.tsx` — dynamic pages by Prismic UID
- `/api/preview` + `/api/exit-preview` — Prismic draft preview endpoints
- `/api/revalidate` — ISR cache invalidation webhook
- **Root `/`:** There is no root `page.tsx`; add a root `middleware.ts` that uses `src/proxy.ts` if you need `/` → `/{defaultLocale}/` redirects and `x-locale` request headers.

### Locales
- `en-us` (default), `fr-fr`
- Configured in `src/i18n.ts`
- **Language switcher:** `src/components/LanguageSwitcher.tsx` (client `Link` that swaps the locale segment in the URL; a static label div does not navigate—see `docs/lessons-learned/nextjs-locale-switcher-must-be-a-link.md`).
- **`src/proxy.ts`:** Locale detection and redirect logic for middleware; not executed until wired from a root `middleware.ts`.

### Key Files
- `company-config.json` — all client metadata (company info, branding, integration keys)
- `src/lib/master-theme.ts` — design tokens derived from company-config branding
- `src/lib/company.ts` — typed helper exporting company data
- `src/prismicio.ts` — Prismic client configuration (repository name, routes, caching)
- `src/i18n.ts` — locale configuration and detection helpers
- `src/proxy.ts` — locale redirect / `x-locale` header helpers for middleware (optional; add `middleware.ts` at project root to use)
- `src/components/LanguageSwitcher.tsx` — header locale toggle (`usePathname` + `Link`)
- `src/slices/index.ts` — auto-generated slice registry (do not edit manually)
- `customtypes/` — Prismic custom type schemas

### Data Fetching Pattern
All page components are async server components. The Prismic client uses `force-cache` with a `"prismic"` tag in production. Metadata is generated via `generateMetadata()` pulling from Prismic's `meta_title`, `meta_description`, `meta_image` fields.

### Global Chrome
The `layout` singleton custom type stores header nav links, footer links, and contact info. It is fetched once in `app/[lang]/layout.tsx` and passed to `<Header>` and `<Footer>` components.

### Slices
- New slices are created via Slice Machine (`npm run slicemachine`) or Prismic MCP tools
- Each slice lives in `src/slices/<SliceName>/index.tsx`
- Use Prismic components: `PrismicRichText`, `PrismicNextImage`, `PrismicNextLink`, `PrismicText`

### Environment Variables
See `.env.local` for required variables:
- `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` — Prismic repository name

### Deployment
- Push to GitHub → Vercel auto-deploys
- Always run `npm run build` locally before pushing
- Verify `company-config.json` has no empty required fields before deploying

### Path Alias
`@/*` resolves to `src/*`.
