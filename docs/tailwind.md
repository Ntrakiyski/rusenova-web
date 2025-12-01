Setting Up Responsive Typography in Tailwind
Here's how to implement your Figma typography scales across different screen sizes:

javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        // Display 2xl
        'display-2xl': [
          '90px', // Desktop
          {
            lineHeight: 'auto',
            fontWeight: '700', // Bold
            letterSpacing: '-0.02em',
          },
        ],
        // Display md
        'display-md': [
          '36px',
          {
            lineHeight: '44px',
            fontWeight: '600', // Semibold
            letterSpacing: '-0.01em',
          },
        ],
        // Display xs
        'display-xs': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '600', // Semibold
            letterSpacing: '-0.01em',
          },
        ],
        // Text xl (with variants)
        'text-xl': [
          '20px',
          {
            lineHeight: 'auto',
            fontWeight: '600', // Semibold
          },
        ],
        'text-xl-regular': [
          '20px',
          {
            lineHeight: '30px',
            fontWeight: '400', // Regular
          },
        ],
        // Text lg
        'text-lg': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '400', // Regular
          },
        ],
        'text-lg-semibold': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '600', // Semibold
          },
        ],
      },

      fontWeight: {
        regular: '400',
        semibold: '600',
        bold: '700',
      },
    },
  },
};
Responsive Typography Pattern (Mobile-First Approach)
Here's the best practice for responsive typography that scales across devices:

typescript
// components/Typography.tsx
import React from 'react'

interface TypographyProps {
  children: React.ReactNode
  variant: 'display-2xl' | 'display-md' | 'display-xs' | 'text-xl' | 'text-lg'
  className?: string
}

export function Display2xl({ children, className = '' }: TypographyProps) {
  return (
    <h1
      className={`
        text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
        font-bold
        leading-tight
        ${className}
      `}
    >
      {children}
    </h1>
  )
}

export function DisplayMd({ children, className = '' }: TypographyProps) {
  return (
    <h2
      className={`
        text-2xl sm:text-3xl md:text-4xl
        font-semibold
        leading-tight
        ${className}
      `}
    >
      {children}
    </h2>
  )
}

export function DisplayXs({ children, className = '' }: TypographyProps) {
  return (
    <h3
      className={`
        text-lg sm:text-xl md:text-2xl
        font-semibold
        leading-tight
        ${className}
      `}
    >
      {children}
    </h3>
  )
}

export function TextXl({ children, className = '' }: TypographyProps) {
  return (
    <p
      className={`
        text-base sm:text-lg md:text-xl
        font-semibold
        leading-auto
        ${className}
      `}
    >
      {children}
    </p>
  )
}

export function TextLg({ children, className = '' }: TypographyProps) {
  return (
    <p
      className={`
        text-sm sm:text-base md:text-lg
        font-regular
        leading-6
        ${className}
      `}
    >
      {children}
    </p>
  )
}
Responsive Scale Mapping (Mobile → Tablet → Desktop)
Based on your Figma design, here's the recommended responsive scale:

javascript
// tailwind.config.js - Advanced approach with CSS Variables
module.exports = {
  theme: {
    extend: {
      // Mobile-first approach
      fontSize: {
        // Mobile: 36px | Tablet: 60px | Desktop: 90px
        'display-2xl': ['2.25rem', { lineHeight: '1', fontWeight: '700' }],
        // Mobile: 24px | Tablet: 30px | Desktop: 36px
        'display-md': ['1.5rem', { lineHeight: '1.22', fontWeight: '600' }],
        // Mobile: 18px | Tablet: 20px | Desktop: 24px
        'display-xs': ['1.125rem', { lineHeight: '1.33', fontWeight: '600' }],
        // Body text scales
        'text-xl': ['1.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'text-lg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
};
Complete Responsive Typography Solution
Here's the most scalable approach using CSS variables for dynamic scaling:

css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

:root {
  /* Base font sizes - Mobile */
  --font-display-2xl: 2.25rem;
  --font-display-md: 1.5rem;
  --font-display-xs: 1.125rem;
  --font-text-xl: 1.25rem;
  --font-text-lg: 1rem;
}

/* Tablet breakpoint */
@media (min-width: 768px) {
  :root {
    --font-display-2xl: 3.75rem;
    --font-display-md: 1.875rem;
    --font-display-xs: 1.25rem;
  }
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  :root {
    --font-display-2xl: 5.625rem; /* 90px */
    --font-display-md: 2.25rem;   /* 36px */
    --font-display-xs: 1.5rem;    /* 24px */
  }
}

/* Usage */
.display-2xl {
  font-size: var(--font-display-2xl);
  font-weight: 700;
  line-height: 1;
}

.display-md {
  font-size: var(--font-display-md);
  font-weight: 600;
  line-height: 1.22;
}

.text-lg {
  font-size: var(--font-text-lg);
  font-weight: 400;
  line-height: 1.5;
}
Usage in Your Components
typescript
// app/page.tsx
'use client'

import { Display2xl, DisplayMd, TextLg } from '@/components/Typography'

export default function Page() {
  return (
    <div className="p-6">
      {/* Display 2xl - Scales from 36px → 60px → 90px */}
      <Display2xl className="mb-4">
        Your Heading Here
      </Display2xl>

      {/* Display md - Scales from 24px → 30px → 36px */}
      <DisplayMd className="mb-6">
        Subheading
      </DisplayMd>

      {/* Text lg - Regular body text */}
      <TextLg>
        Your paragraph content scales responsively across devices
      </TextLg>
    </div>
  )
}