/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#f3f4f6',
        accent: '#10b981',
        text: '#1f2937',
        'subtle-text': '#6b7280',
        border: '#e5e7eb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: 700,
            },
            h2: {
              fontWeight: 700,
            },
            h3: {
              fontWeight: 600,
            },
            h4: {
              fontWeight: 600,
            },
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
            },
            blockquote: {
              borderLeftColor: '#e5e7eb',
            },
            code: {
              color: '#111827',
              backgroundColor: '#f3f4f6',
              padding: '0.1em 0.25em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
              overflow: 'auto',
              borderRadius: '0.375rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 