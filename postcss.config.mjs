/**
 * Tailwind CSS v4 via PostCSS. Next.js runs this for both `next dev` (Turbopack)
 * and `next build --webpack`, so styles compile identically in dev and the
 * Hostinger production build.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
