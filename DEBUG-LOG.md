# DEBUG-LOG

## 1. `vite` is not recognized
- **Symptom:** `npm run dev` failed with "'vite' is not recognized".
- **Reproduction:** Ran `npm run dev` in a folder without `node_modules`.
- **Tool:** Terminal output, `dir node_modules\.bin`.
- **Root cause:** Dependencies were never installed in that folder after the project was moved.
- **Fix:** `npm install`.
- **Learned:** Always check that `node_modules` exists in the folder where the command runs.

## 2. Import red / "Cannot find module" after files vanished
- **Symptom:** `Cannot find name 'NotFoundPage'` and `Cannot find module '../components/layout/Layout'`.
- **Reproduction:** `npm run typecheck` and `npm run build`.
- **Tool:** TypeScript compiler (`tsc`) and `dir` on the folders.
- **Root cause:** Files were lost when the project folders were duplicated and moved; `lint` passed because ESLint does not resolve modules.
- **Fix:** Recreated the files; commit history shows the restore.
- **Learned:** `typecheck` catches what `lint` misses, so both are required.

## 3. Merge conflict in `src/utils/error.ts`
- **Symptom:** Conflict markers (`<<<<<<<`) in the file, build broken.
- **Reproduction:** `git merge feat/api-client` into `main`.
- **Tool:** `git status`, `git grep "<<<<<<<"`.
- **Root cause:** The file was created independently on two branches (one with a BOM character).
- **Fix:** Wrote one clean version, `git add`, merge commit.
- **Learned:** Start each branch from an up-to-date `main` and pull before branching.
