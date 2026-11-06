# REPORT: 10X Shop

Final report for the 10X Front-end graduation project. Live demo and run instructions are in [README.md](README.md); the plan is in [PLAN.md](PLAN.md); debugging notes are in [DEBUG-LOG.md](DEBUG-LOG.md).

## 1. Planned vs delivered

| Module | CORE | FULL |
| React | Done: Context (auth, cart), Router, controlled forms, cart, checkout, protected checkout | Done: search/filter/sort/pagination in the URL, reviews, related products, promo code, Formik + Yup login, Orders, Profile (username only) |
| TypeScript | Done: strict mode, `npm run typecheck` = 0 errors, no `any` (enforced by ESLint) | Done: generic `ApiClient`, `ApiError`, `StorageService<T>`, `Cart` and `Order` classes, type guards, `AsyncState<T>`. Not done: reducer with a `CartAction` union |
| Tailwind CSS | Done: v4 via `@tailwindcss/vite`, utilities, grid/flex, responsive breakpoints, hover/focus/disabled | Done: `@theme` brand tokens, dark mode. Partly: most buttons still use `indigo-*` classes instead of the token |
| Optimization | Done: Error Boundary, DEBUG-LOG, responsive layout | Done: route-level lazy loading. Not done: Lighthouse before/after, cross-browser matrix |
| Practical project | Done: PLAN.md written first, meaningful Git history, README, REPORT, Vercel deploy | Done: feature branches and merged pull requests. Not done: weekly progress notes, demo video |

**Not done:** Reorder, order timeline, extended Profile fields (first/last name, email, phone), shipping cost, Lighthouse and compatibility reports, progress notes. I prioritised the CORE checklist, documentation and deployment before the deadline, as planned in PLAN.md ("FULL starts only after CORE works").

## 2. Metrics

| Metric | Value |
|---|---|
| Commits |62 |
| Merged pull requests | 11 (#2–#11) |
| CSS (gzip) | 4.67 kB |
| `npm run typecheck`, `npm run lint`, `npm run build` | all pass |
| Lighthouse | not measured |

## 3. Three hardest problems

1. **Stale responses in the catalog.** Changing search, category or page quickly could show an older response over a newer one. Fix: every request has an `AbortController` that is aborted in the `useEffect` cleanup, and the stored result carries a `requestKey`, so a result is only shown if it belongs to the current request.
2. **Search and category cannot be combined in DummyJSON.** `/products/search` ignores categories. Fix: the URL state clears one when the other is set, and `buildProductsUrl` picks the endpoint (`/products`, `/products/search` or `/products/category/{slug}`).
3. **Lost files and a merge conflict (see DEBUG-LOG #2 and #3).** After the project folders were duplicated, files were missing and `lint` passed while `typecheck` and `build` failed; later `src/utils/error.ts` was created independently on two branches and conflicted on merge. Fix: restored the files, resolved the conflict, and learned to branch from an up-to-date `main` and to run both `typecheck` and `lint`.

## 4. What I would do differently
- Write README and REPORT earlier instead of at the end.
- Use `useReducer` with a `CartAction` union for the cart.
- Keep order status in one place (`Order.getStatus`) instead of duplicating it in `OrdersPage`.
- Create GitHub Issues and a Projects board from PLAN.md at the start.
- Measure performance with Lighthouse before and after adding lazy loading.

## 5. AI usage summary
- **Delegated:** boilerplate such as types and provider scaffolding, Tailwind class suggestions, checking my code against the PRD, and drafting documentation text.
- **Kept under my control:** the plan, the commits and the decisions about scope (CORE first, then FULL), and which features to build.
- **Verified:** `npm run typecheck`, `npm run lint` and `npm run build` pass, and I can explain the code in the defense (Context, effects and cleanup, the URL as the source of state, type guards for `localStorage` data).
