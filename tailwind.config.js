/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e', // Verde Kiana (botones, links hover)
        secondary: '#10b981', // Verde más oscuro para acentos
        accent: '#fcd34d', // Amarillo para destacar elementos
        background: '#f9fafb', // Gris suave para secciones
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'], // Opcional para títulos
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0,0,0,0.08)',
        'card-hover': '0 6px 20px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
