# PLAN: 10X Shop (CORE first, then FULL)

## Goal & Scope
Build "10X Shop", an e-commerce SPA with React 19 + TypeScript (strict) + Tailwind CSS v4,
using the DummyJSON products API. Login and Checkout are local simulations (no real auth/payment).

**CORE:** Login (Context), Catalog, Product Details, Cart (add / quantity / remove / total),
Checkout (controlled form + local confirmation), responsive UI, loading/error/empty states,
Error Boundary, DEBUG-LOG, deploy.
**FULL:** only after that day's CORE works (search/filter/sort/pagination, reviews, promo,
ApiClient/OOP, Formik + Yup, Orders, Profile, @theme, lazy loading, Lighthouse).

## Timeline: 7 working days (26 Oct - 1 Nov), buffer 2-6 Nov (deadline 6 Nov, 23:59 GMT+4)
| Day | Date | CORE | FULL |
|-----|------|------|------|
| 1 | 26 Oct | Router, Layout, 404, AuthContext, Login | - |
| 2 | 27 Oct | API, Catalog, ProductCard/Grid, states | ApiClient, ApiError, generics |
| 3 | 28 Oct | Product Details, Add to Cart | Search, category, sort, pagination, URL state |
| 4 | 29 Oct | CartContext, Cart page | Gallery, reviews, related |
| 5 | 30 Oct | Checkout, guard, validation | Promo, OOP classes, type guards |
| 6 | 31 Oct | Error Boundary, DEBUG-LOG | Formik+Yup, Orders, Profile, @theme |
| 7 | 1 Nov | Responsive audit, deploy, README, REPORT | Lazy loading, Lighthouse, compat report |

Rule: FULL starts each day only after that day's CORE works. Each FULL feature uses its own branch and PR.

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