# PLAN: 10X Shop (CORE first)

## Goal & Scope
Build "10X Shop", an e-commerce SPA with React 19 + TypeScript (strict) + Tailwind CSS v4,
using the DummyJSON products API. Login and Checkout are local simulations (no real auth/payment).

**CORE (this plan):** Login (Context), Catalog, Product Details, Cart (add / quantity / remove / total),
Checkout (controlled form + local confirmation), responsive UI, loading/error/empty states, deploy.
**FULL / BONUS:** not started. Only considered after the CORE checklist is complete.

## Timeline (deadline: 6 Nov 2026, 23:59 GMT+4)
1. 23 Oct | Vite + TS strict + Tailwind v4, PLAN.md, folders, `types/`
2. 26 Oct | Router, Layout (Header/Footer/404), AuthContext, Login form
3. 27 Oct | `api/`, Catalog, ProductCard/Grid, loading/error/empty
4. 28 Oct | Product Details, image/quantity state, Add to Cart
5. 29 Oct | CartContext, Cart page, stepper, remove, totals
6. 30 Oct | Checkout, protected redirect, validation, confirmation
7. 31 Oct | Responsive audit, typecheck, build, deploy, README, REPORT

Remaining days until 6 Nov are buffer for fixes and optional FULL work.

## Risks
1. **DummyJSON unavailable or slow** -> show Error state; keep a small local JSON fallback if needed.
2. **Typecheck script silently checks nothing** -> `typecheck` targets `tsconfig.app.json` explicitly.
3. **SPA refresh 404 on deploy (`/products/5`)** -> add rewrite config (Vercel/Netlify) and test after deploy.
4. **Scope creep into FULL features** -> CORE checklist must be complete first.

## Definition of Done (per task)
- `npm run typecheck` = 0 errors, `npm run lint` clean (no `any`).
- Feature matches the PRD acceptance criteria and works at 375px and desktop.
- Committed with a meaningful message; app still builds.

## Evidence & process
Real Git history (`feat:`, `fix:`, `docs:`, `chore:`), live deploy link in README, REPORT.md at the end.