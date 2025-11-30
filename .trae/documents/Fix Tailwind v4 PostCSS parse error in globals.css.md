## What’s Breaking
- The build fails with `CssSyntaxError: Missed semicolon` while processing Tailwind’s generated CSS, not your own styles (see `/app/globals.css:1` import and the error’s generated source).
- Tailwind v4 injects modern CSS (e.g. `oklch()` and `rgb(from …)`), and Next 16 is currently using `postcss@8.4.31`, which has known parsing issues with these newer constructs.
- Evidence in the log references `postcss@8.4.31` and shows the error inside Tailwind’s `@layer properties`/`@layer theme` blocks, even though your `globals.css` only contains `@import "tailwindcss"`.

## Plan to Resolve
1. Upgrade PostCSS in the project to a recent 8.4.x that properly parses Tailwind v4 output.
   - Run: `pnpm add -D postcss@^8.4.47` (or latest 8.4.x) to override Next’s older transitive version.
2. Keep Tailwind v4 tooling as-is.
   - `@tailwindcss/postcss` remains in `postcss.config.mjs` and `tailwindcss@^4` stays in devDependencies.
3. Update the stale Baseline mapping (optional but recommended, as warned by the build).
   - Run: `pnpm add -D baseline-browser-mapping@latest`.
4. Rebuild and verify.
   - Run: `pnpm run build` and confirm the Tailwind CSS compilation completes without the semicolon error.

## Verification Steps
- Check that `./app/globals.css` continues to be minimal (`@import "tailwindcss"`) and compiles.
- Confirm build output completes with no PostCSS syntax errors.
- Smoke-test pages using shadcn components to ensure styles render and no regressions.

## Optional Cleanup
- Remove unused `tw-animate-css` if not used; ensure `tailwindcss-animate` classes work without extra plugins on v4.
- If issues persist, pin `postcss` to the very latest 8.4.x and update `tailwindcss`/`@tailwindcss/postcss` to latest minor.
