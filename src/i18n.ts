export const defaultLocale = 'fa';
export const languages = {
  fa: { label: 'فارسی', direction: 'rtl', flag: 'ir', index: 0 },
  en: { label: 'English', direction: 'ltr', flag: 'gb', index: 1 },
  ar: { label: 'العربية', direction: 'rtl', flag: 'ae', index: 2 },
} as const;
export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const pages = ['home', 'about', 'services', 'work', 'process', 'contact', 'network', 'network/sbc', 'blog'] as const;
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

export function translator(locale: Locale) {
  return (fa: string, en: string, ar: string) => [fa, en, ar][languages[locale].index];
}

export const navigationLabels = {
  services: ['خدمات', 'Services', 'خدماتنا'],
  work: ['پروژه‌ها', 'Work', 'أعمالنا'],
  process: ['شیوهٔ همکاری', 'How we work', 'كيف نعمل'],
  about: ['دربارهٔ جیگزا', 'About', 'عن جيغسو'],
  network: ['شبکهٔ جیگزا', 'Network', 'شبكة جيغسو'],
  blog: ['وبلاگ', 'Blog', 'المدوّنة'],
  contact: ['تماس با ما', 'Contact us', 'تواصل معنا'],
};
export const networkSections = {
  partners: ['شرکای تجاری', 'Business partners', 'شركاؤنا'],
  ventures: ['برندهای در حال توسعه', 'Brands in development', 'علامات قيد التطوير'],
  partnership: ['پیشنهاد شراکت', 'Propose a partnership', 'اقترح شراكة'],
};
