export const defaultLocale = 'fa';
export const languages = {
  fa: { label: 'فارسی', direction: 'rtl' },
  en: { label: 'English', direction: 'ltr' },
} as const;
export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const pages = ['home', 'about', 'services', 'work', 'process', 'contact'] as const;
export type PageKey = typeof pages[number];
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function assetHref(path: string) {
  return `${base}/${path}`;
}

export function pageHref(locale: Locale, page: PageKey = 'home') {
  if (page === 'home') {
    return locale === defaultLocale ? `${base}/` : `${base}/${locale}/`;
  }
  return `${base}/${locale}/${page}/`;
}
