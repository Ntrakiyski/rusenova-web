import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────────────
      // 1. COLORS (Your Figma Colors)
      // ─────────────────────────────────────────────────────
      colors: {
        // Background colors
        bg: {
          light: '#F7F4ED',      // light background
          dark: '#252222',       // dark
          'light-dark': '#373737', // light dark
          white: '#FFFFFF',
          orange: '#F38300',
        },
        // Additional colors for specific use cases
        additional: {
          blue: '#155DFC',       // used in MLTechnicalPerformance
          blueLight: '#8EB2F21F', // used in MLSectionWithTable
          grayLight: '#f0f0f0',  // used in MLSectionWithTable borders
        },
        // Text colors
        text: {
          primary: '#191818',    // main text
          secondary: '#494848',  // secondary text
          white: '#FFFFFF',
          'light-gray': '#BABCC0',
          orange: '#F38300',
        },
        // Stroke/Border colors
        stroke: '#DDDDDD',
        strokeDark: '#444444',
      },

      // ─────────────────────────────────────────────────────
      // 2. FONT FAMILY
      // ─────────────────────────────────────────────────────
      fontFamily: {
        bricolage: ['Bricolage_Grotesque', 'sans-serif'],
      },

      // ─────────────────────────────────────────────────────
      // 3. TYPOGRAPHY (Responsive with minimal duplication)
      // ─────────────────────────────────────────────────────
      fontSize: {
        // Display 2xl: Mobile 36px → Tablet 64px → Desktop 90px
        'display-2xl': [
          'clamp(36px, 8vw, 90px)',
          { lineHeight: '1', letterSpacing: '-0.02em' },
        ],

        // Display md: Mobile 28px → Tablet 36px → Desktop 40px
        'display-md': [
          'clamp(28px, 5vw, 36px)',
          { lineHeight: '44px', letterSpacing: '-0.01em' },
        ],

        // Display xs: Mobile 20px → Tablet/Desktop 24px
        'display-xs': [
          'clamp(20px, 4vw, 24px)',
          { lineHeight: '32px', letterSpacing: '-0.01em' },
        ],
        'display-xs-semibold': [
          'clamp(20px, 4vw, 24px)',
          { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' },
        ],

        // Text xl regular: Mobile/Tablet 20px → Desktop 22px
        'text-xl-regular': [
          'clamp(20px, 2.5vw, 22px)',
          { lineHeight: '30px' },
        ],

        // Text xl semibold: Mobile/Tablet 20px → Desktop 22px
        'text-xl-semibold': [
          'clamp(20px, 2.5vw, 22px)',
          { lineHeight: '30px', fontWeight: '600' },
        ],

        // Text md regular: Mobile 16px → Tablet/Desktop 20px
        'text-md-regular': [
          'clamp(16px, 2vw, 20px)',
          { lineHeight: '24px' },
        ],

        // Text md semibold: Mobile 16px → Tablet/Desktop 20px
        'text-md-semibold': [
          'clamp(16px, 2vw, 20px)',
          { lineHeight: '30px', fontWeight: '600' },
        ],

        // Text lg regular: Fixed at 16px
        'text-lg-regular': ['16px', { lineHeight: '24px' }],

        // Text lg semibold: Fixed at 16px
        'text-lg-semibold': ['16px', { lineHeight: '24px', fontWeight: '600' }],
      },

      // ─────────────────────────────────────────────────────
      // 4. SPACING (Extended scale)
      // ─────────────────────────────────────────────────────
      spacing: {
        0: '0',
        xs: '0.25rem',      // 4px
        'xs-2': '0.375rem', // 6px
        sm: '0.5rem',       // 8px
        'sm-2': '0.75rem',  // 12px
        md: '1rem',         // 16px
        'md-2': '1.25rem',  // 20px
        lg: '1.5rem',       // 24px
        'lg-2': '1.75rem',  // 28px
        xl: '2rem',         // 32px
        'xl-2': '2.5rem',   // 40px
        '2xl': '3rem',      // 48px
        '2xl-2': '3.5rem',  // 56px
        '3xl': '4rem',      // 64px
        '3xl-2': '4.5rem',  // 72px
        '4xl': '5rem',      // 80px
        '4xl-2': '5.5rem',  // 88px
        '5xl': '6rem',      // 96px
        '5xl-2': '7rem',    // 112px
        '6xl': '8rem',      // 128px
      },

      // ─────────────────────────────────────────────────────
      // 5. BORDER RADIUS (Extended to 64px)
      // ─────────────────────────────────────────────────────
      borderRadius: {
        0: '0',
        xs: '2px',
        xs2: '4px',
        sm: '6px',
        'sm-2': '8px',
        md: '12px',
        'md-2': '14px',
        lg: '16px',
        'lg-2': '20px',
        xl: '24px',
        'xl-2': '28px',
        '2xl': '32px',
        '2xl-2': '36px',
        '3xl': '40px',
        '3xl-2': '44px',
        '4xl': '48px',
        '4xl-2': '52px',
        '5xl': '56px',
        '5xl-2': '60px',
        '6xl': '64px',
        full: '9999px',
      },
    },
  },
  plugins: [animate],
}

export default config