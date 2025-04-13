/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#f3f4f6',
        accent: '#10b981',
        'text-primary': '#1f2937', // Renamed to avoid conflict with text utility
        'text-subtle': '#6b7280', // Renamed to avoid conflict
        border: '#e5e7eb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Set Inter as the default sans-serif font
        heading: ['Inter', 'sans-serif'], // Explicitly define heading font if needed later
      },
      // Define breakpoints if different from default sm, md, lg, xl, 2xl
      // screens: {
      //   'sm': '640px',
      //   'md': '768px',
      //   'lg': '1024px',
      //   'xl': '1280px',
      // }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add typography plugin
  ],
} 