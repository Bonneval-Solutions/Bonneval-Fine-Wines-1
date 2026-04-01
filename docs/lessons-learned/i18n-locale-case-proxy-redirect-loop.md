# Infinite locale prefix in the URL (`/fr-FR/fr-FR/…`)

**Context:** Next.js App Router with `src/proxy.ts` (Next 16 “proxy”, formerly middleware), dynamic `[lang]` segments, and Prismic locales stored as lowercase tags (`fr-fr`, `en-us`). Production on Vercel showed the address bar stuck in a redirect loop with `/fr-FR/` repeated many times.

## What went wrong

### 1. Case-sensitive path checks vs BCP-47 casing

Supported locales in code were **lowercase** (`fr-fr`). The proxy treated a path as “already localized” only if it started with an **exact** match (`/fr-fr/` or `/fr-fr`).

Browsers and standards often surface tags as **`fr-FR`** (region uppercase). A request to `/fr-FR` did **not** count as having a locale prefix, so the proxy ran the “no locale” branch and **prepended** the negotiated locale again. That produced paths like `/fr-fr/fr-FR` or, depending on redirects and caching, repeated **`/fr-FR/fr-FR/…`**.

**Lesson:** Treat the first path segment as a locale using **case-insensitive** matching, then **normalize** to your canonical string (usually the same casing you use in routes and Prismic).

### 2. Layout and pages used raw `[lang]` for Prismic

Even when a page rendered, `isValidLocale` used strict `locales.includes(lang)`, so **`fr-FR` failed** while `fr-fr` worked. Normalizing once (e.g. `normalizeLocale`) keeps Prismic `lang` parameters aligned with repository locale codes.

### 3. The build was not the problem

Vercel build logs showed a successful `next build` and “Proxy (Middleware)”. The failure was **runtime routing**, not compilation.

## What we changed

- **`normalizeLocale()`** in `src/i18n.ts`: maps supported tags regardless of casing to canonical `en-us` / `fr-fr`.
- **`src/proxy.ts`**: parse the first segment; if it is a supported locale in any casing, set `x-locale` to the canonical value; if casing differs from canonical, **308 redirect** to the canonical path (`/fr-fr/...`).
- **Layouts / pages / `LanguageSwitcher`**: use normalized locale for Prismic and for stripping the locale from the path when building links.

## Checklist for future projects

- [ ] Decide one canonical locale string for URLs and CMS (recommend lowercase `xx-yy` to match Prismic).
- [ ] In proxy/middleware, **never** rely on `pathname.startsWith(\`/${locale}\`)` alone if `locale` is mixed-case in the wild; normalize or compare case-insensitively.
- [ ] After changing locale logic, hit `/`, `/fr-fr`, and **`/fr-FR`** (wrong casing) in production and confirm a **single** redirect to the canonical URL, not a growing path.
- [ ] Keep language switchers and `generateStaticParams` consistent with the same normalization rules.
