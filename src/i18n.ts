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

export const blogCategories = {
  studio: ['تجربه‌های جیگزا', 'Studio experiences', 'تجارب جيغسو'],
  campaigns: ['تحلیل کمپین‌ها', 'Campaign analysis', 'تحليل الحملات'],
  research: ['پژوهش و آموزش', 'Research and education', 'البحث والتعليم'],
} as const;

// Localize display numerals only; never use this for identifiers, URLs or submitted data.
export function displayNumber(value: string | number, locale: Locale): string {
  const digits = locale === 'fa' ? '۰۱۲۳۴۵۶۷۸۹' : locale === 'ar' ? '٠١٢٣٤٥٦٧٨٩' : '0123456789';
  return String(value).replace(/[0-9۰-۹٠-٩]/g, digit => {
    const index = '0123456789'.indexOf(digit);
    const faIndex = '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit);
    return digits[index >= 0 ? index : faIndex >= 0 ? faIndex : '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)];
  });
}
export function displayDate(date: Date, locale: Locale): string {
  return displayNumber(date.toLocaleDateString(locale, { dateStyle: 'long', timeZone: 'UTC', numberingSystem: locale === 'fa' ? 'arabext' : locale === 'ar' ? 'arab' : 'latn' }), locale);
}
