// Внутренние ссылки с учётом базового пути: '/' на Vercel, '/airhead' на GitHub Pages
export const url = (path = '/') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
