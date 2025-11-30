## Overview
- Replace radial gradient backgrounds in ML/PD preview cards with a circular image anchored to the bottom‑right, clipped by the card, scaling proportionally.
- Update home page content data to provide an image path per card instead of gradient colors.

## Files to Update
- Components: `app/components/home/MLPreviewSection.tsx`, `app/components/home/PDPreviewSection.tsx`
- Types: `types/project.ts` (`HomeContent` project item shape)
- Data: `app/data/homeContent.json`
- Admin (if needed to expose image field): `app/components/admin/HomeContentEditor.tsx`

## Component Changes
1. Import `Image` from `next/image` in both preview sections.
2. Remove the inline gradient `style` blocks:
   - ML: lines 96–103
   - PD: lines 93–99
   Set a neutral base background: `bg-[#F7F4ED]` on the card container.
3. Add an absolutely positioned image wrapper inside the existing `relative overflow-hidden rounded-[24px]` container:
   - `absolute bottom-0 right-0 w-[40%] max-w-[264px] aspect-square right-[-8%] bottom-[-8%]`
   - Keeps the image in the same place and slightly outside the corner so it’s clipped.
4. Render the image via `next/image` with `fill`:
   - `src={item.previewImage ?? '/gradient-pink.png'}`
   - `className="object-contain"`, `alt=""`, `aria-hidden`, `draggable={false}`
5. Ensure text stays above the image by adding `z-[1]`/`z-10` to metric text elements.

## Responsiveness
- Use percentage width (`w-[40%]`) with `max-w-[264px]` and `aspect-square` so it scales with the card while respecting the 264×264 max.
- Optional responsive tweak: `sm:w-[36%] md:w-[40%]` to reduce size proportionally on smaller cards.

## Data Model Updates
1. Types (`types/project.ts`):
   - For `HomeContent.mlPreview.projects[]` and `HomeContent.pdPreview.projects[]`, replace `gradientColors: string[]` with `previewImage?: string`.
   - Keep `gradientColors?: string[]` transiently as optional for backward compatibility if desired.
2. Home data (`app/data/homeContent.json`):
   - For every ML/PD project item, remove `gradientColors` and add `"previewImage": "/gradient-pink.png"` (or project‑specific paths when available).
3. Usage:
   - `HomePageContent.tsx` already passes `typedHomeContent.mlPreview`/`pdPreview`; components will read `previewImage`.

## Admin Editing
- Extend the admin editor to expose a field for each ML/PD project’s `previewImage`:
  - Add an input to `HomeContentEditor.tsx` for `previewImage` under each project.
  - `useAdminData.ts` already serializes `homeContent` to `/api/admin/save-content`; no API changes needed.

## Accessibility & Performance
- Decorative image: empty `alt` or `aria-hidden={true}` to avoid noise for screen readers.
- Use `next/image` for optimized loading; wrapper controls size to avoid layout shift.

## Verification
- Visual: image appears at the bottom‑right of each card, partially clipped; text overlays remain readable.
- Data: `homeContent.json` contains `previewImage` fields; UI renders without relying on `gradientColors`.
- Responsive: shrinking viewport scales the image proportionally while staying anchored.

## Notes
- Default image path is `/gradient-pink.png` per your instruction; can be customized per card later without code changes.