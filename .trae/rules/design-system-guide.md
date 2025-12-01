# Design System Guidelines for Component Development

## Overview
This document outlines the design system standards that must be followed when building new components in this Next.js + Tailwind CSS project. All developers must adhere to these guidelines to maintain consistency, maintainability, and visual coherence across the application.

---

## 🎨 Design System Structure

### Available Design Tokens

#### Colors
Use only these predefined colors in your components:

**Background Colors:**
- `bg-bg-light` (#F7F4ED) - Primary light background
- `bg-bg-dark` (#252222) - Dark background
- `bg-bg-light-dark` (#373737) - Medium dark background
- `bg-bg-white` (#FFFFFF) - White background

**Text Colors:**
- `text-text-primary` (#191818) - Main/primary text
- `text-text-secondary` (#494848) - Secondary text
- `text-text-white` (#FFFFFF) - White text
- `text-text-light-gray` (#BABCC0) - Light gray text
- `text-text-orange` (#F38300) - Orange accent text

**Stroke/Border Colors:**
- `border-stroke` (#DDDDDD) - Standard border color

**Rule:** ❌ NEVER hardcode colors or use arbitrary Tailwind colors like `bg-blue-500`. Always use the defined color tokens above.

---

### Typography

#### Font Family
- Use `font-bricolage` for all text (already set as default)
- Font: Bricolage Grotesque (Google Fonts)

#### Font Sizes (Responsive with clamp)

| Class | Mobile | Tablet | Desktop | Use Case |
|-------|--------|--------|---------|----------|
| `text-display-2xl` | 36px | 64px | 90px | Main hero headings |
| `text-display-md` | 28px | 36px | 40px | Section headings |
| `text-display-xs` | 20px | 24px | 24px | Sub-headings |
| `text-text-xl-semibold` | 20px | 20px | 22px | Large text (bold) |
| `text-text-xl-regular` | 20px | 20px | 22px | Large text (regular) |
| `text-text-md-semibold` | 16px | 20px | 20px | Medium text (bold) |
| `text-text-md-regular` | 16px | 20px | 20px | Medium text (regular) |
| `text-text-lg-semibold` | 16px | 16px | 16px | Body text (bold) |
| `text-text-lg-regular` | 16px | 16px | 16px | Body text (regular) |

**Rule:** Use semantic size classes instead of arbitrary sizes. Typography scales automatically across devices.

---

### Spacing Scale

Use only these spacing values (in rem):

```
0 (0px)
xs (4px)    xs-2 (6px)
sm (8px)    sm-2 (12px)
md (16px)   md-2 (20px)
lg (24px)   lg-2 (28px)
xl (32px)   xl-2 (40px)
2xl (48px)  2xl-2 (56px)
3xl (64px)  3xl-2 (72px)
4xl (80px)  4xl-2 (88px)
5xl (96px)  5xl-2 (112px)
6xl (128px)
```

**Usage Examples:**
```tsx
<div className="p-lg">          // 24px padding all sides
<div className="mx-xl py-md-2"> // 40px margin horizontal, 20px padding vertical
<div className="gap-lg">        // 24px gap in flex/grid
```

**Rule:** ❌ NEVER use arbitrary spacing like `p-[25px]`. Always use predefined tokens.

---

### Border Radius

Use only these border radius values:

```
rounded-0 (0px)       rounded-xs (2px)       rounded-xs2 (4px)
rounded-sm (6px)      rounded-sm-2 (8px)
rounded-md (12px)     rounded-md-2 (14px)
rounded-lg (16px)     rounded-lg-2 (20px)
rounded-xl (24px)     rounded-xl-2 (28px)
rounded-2xl (32px)    rounded-2xl-2 (36px)
rounded-3xl (40px)    rounded-3xl-2 (44px)
rounded-4xl (48px)    rounded-4xl-2 (52px)
rounded-5xl (56px)    rounded-5xl-2 (60px)
rounded-6xl (64px)
rounded-full (9999px) // Fully rounded (circles/pills)
```

**Usage Examples:**
```tsx
<button className="rounded-lg">              // 16px border radius
<div className="rounded-3xl">                // 40px border radius
<img className="rounded-full">               // Circle (for avatars)
```

**Rule:** ❌ NEVER use arbitrary border radius. Match your Figma designs to the closest predefined value.
