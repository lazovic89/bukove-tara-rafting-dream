// Same theme the site used with the Tailwind Play CDN, now compiled to css/tailwind.css.
const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  content: [
    path.join(root, '*.html'),
    path.join(root, '{en,de,hu,pl}/*.html'),
  ],
  theme: { extend: { colors: {
    border: 'hsl(var(--border))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
    card: 'hsl(var(--card))',
    primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
    secondary: 'hsl(var(--secondary))',
    accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
  }}},
};
