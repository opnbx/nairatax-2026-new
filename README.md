# NairaTax

Free Nigerian tax estimators for the Nigeria Tax Act 2025 (in force since 1 January 2026), live at
[www.nairatax.ng](https://www.nairatax.ng).

Next.js (App Router) and Tailwind CSS. Every page is static and every calculation runs in the
browser; there is no backend.

## Develop

```bash
npm install
```

```bash
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build (also type-checks) |
| `npm test` | Unit tests for the tax engine (Vitest, watch mode) |
| `npm run lint` | ESLint |

## Layout

| Path | Contents |
| --- | --- |
| `lib/tax-engine.ts` | All tax rules and maths: bands, PAYE, freelancer, company and investment calculations |
| `components/calc/` | Calculator cards and the shared UI kit (`ui.tsx`) |
| `components/site/` | Header, footer, navigation and the page shell |
| `components/home/` | Homepage sections, including the employee PAYE calculator |
| `app/` | Routes, metadata and the sitemap |
| `tests/` | Tests for `lib/tax-engine.ts` |

Change a rate or threshold in `lib/tax-engine.ts`, then update the page copy that quotes it.

## Configuration

`NEXT_PUBLIC_GA_ID` is the Google Analytics 4 measurement ID. Analytics loads only when it is set.
Copy `.env.example` to `.env.local` for local use; in production it is set on the Vercel project.

## Deployment

Vercel builds and deploys every push to `main`. `public/googleadc53b5c32d5d426.html` is the Google
Search Console ownership file; keep it.
