export const defaultLocale = 'fa';

export const languages = {
  fa: { label: 'فارسی', direction: 'rtl' },
  en: { label: 'English', direction: 'ltr' },
} as const;

export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function pageHref(locale: Locale, page = '') {
  if (locale === defaultLocale && page === '') return `${base}/`;
  return `${base}/${locale}/${page ? `${page}/` : ''}`;
}
