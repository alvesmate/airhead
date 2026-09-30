import { defineConfig } from 'astro/config';

// На GitHub Pages сайт живёт в подпапке (/airhead) — путь задаёт workflow через BASE_PATH.
// На Vercel переменной нет, сайт в корне.
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH || '/',
});
