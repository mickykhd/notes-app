/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#05060a',
        aurora: '#6f7ef6',
        neon: '#12f7d6',
        dusk: '#1b1c2d',
      },
      backgroundImage: {
        'aurora-sheen':
          'radial-gradient(circle at 10% 20%, rgba(111, 126, 246, 0.4), transparent 45%), radial-gradient(circle at 80% 0%, rgba(18, 247, 214, 0.35), transparent 55%)',
      },
      boxShadow: {
        glow: '0 15px 60px rgba(111, 126, 246, 0.25)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

