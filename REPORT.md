# REPORT: 10X Shop

## 1. Planned vs delivered

| Module | CORE | FULL |
|---|---|---|
| React | Done: Context, Router, controlled forms, cart, checkout | Search/filter/sort/pagination, reviews, related, promo, Formik + Yup, Orders, Profile (username only) |
| TypeScript | Done: strict, 0 typecheck errors, no `any` | `ApiClient<T>`, `ApiError`, `StorageService<T>`, `Cart`/`Order` classes, type guards, `AsyncState<T>`. Not done: reducer with `CartAction` union |
| Tailwind CSS | Done: v4, utilities, grid/flex, responsive, hover/focus/disabled | `@theme` tokens, dark mode |
| Optimization | Done: Error Boundary, DEBUG-LOG, responsive | Route-level lazy loading. Not done: Lighthouse before/after, compatibility matrix |
| Practical project | Done: PLAN.md, README, Git history, deploy | PRs merged (#2–#11). Not done: weekly progress notes, demo video |

**Not done and why:** Reorder, order timeline, extended Profile fields, shipping cost, Lighthouse and cross-browser reports. TODO: write the real reason (for example "ran out of time; CORE and documentation had priority").

## 2. Metrics

| Metric | Value |
|---|---|
| Commits | 59 (on 7 different days, 23 Oct – 2 Nov) |
| Merged pull requests | 10 (#2–#11) |
| Closed issues | TODO |
| Main JS chunk (gzip) | 85.85 kB |
| Login chunk (gzip, includes Formik + Yup) | 25.02 kB |
| CSS (gzip) | 4.67 kB |
| `npm run typecheck` / `lint` / `build` | all pass |
| Lighthouse (Mobile) | TODO (before / after, if measured) |
| Hours per epic | TODO |

## 3. Three hardest problems

1. **Stale responses in the catalog.** Changing search, category or page quickly could show an older response. Fix: every request has an `AbortController` aborted in the `useEffect` cleanup, and the stored result carries a `requestKey`, so a result is only shown if it belongs to the current request.
2. **Search and category are mutually exclusive in DummyJSON.** `/products/search` cannot be combined with a category. Fix: the URL state clears one when the other is set, and `buildProductsUrl` chooses the endpoint (`/products`, `/products/search`, `/products/category/{slug}`).
3. **Untyped localStorage data.** `JSON.parse` returns an unknown shape, so stale or corrupted data could crash the cart or orders. Fix: type guards (`isCartState`, `isOrderDataArray`, `isReview`) inside `StorageService<T>`; invalid data falls back to an empty value.

TODO: replace any of these with the problems you personally remember best; you must be able to explain them in the defense.

## 4. What I would do differently
- Write README and REPORT early instead of at the end.
- Use `useReducer` with a `CartAction` union for the cart.
- Keep order status in one function (the `Order.getStatus` method) instead of duplicating it in `OrdersPage`.
- Measure with Lighthouse before and after the lazy-loading change.
- Create GitHub Issues and a Projects board from PLAN.md at the start.

## 5. AI usage summary
- **Delegated:** boilerplate (types, provider scaffolding), Tailwind class suggestions, review of my code against the PRD, drafting documentation text.
- **Rejected or rewrote:** TODO, for example "AI suggestions that added unneeded libraries or `any` types".
- **Verified by me:** every feature in the browser, `typecheck`, `lint` and `build`, and I can explain the code (Context, effects and cleanup, the URL as state, type guards).
- TODO: add 1–2 concrete examples of AI output you corrected.