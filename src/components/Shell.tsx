import { Mark } from "./Artwork";
import {
  assetHref,
  languages,
  locales,
  navigationLabels,
  networkSections,
  pageHref,
  translator,
  type Locale,
  type PageKey,
} from "../i18n";

type AlternateLinks = Partial<Record<Locale, string>>;
interface HeaderProps {
  language: Locale;
  page: PageKey;
  alternates?: AlternateLinks;
}

function LanguageName({ locale }: { locale: Locale }) {
  return (
    <>
      <img
        className={"flag-disc flag-" + locale}
        src={assetHref("media/flag-" + languages[locale].flag + ".png")}
        alt=""
        width="22"
        height="22"
      />
      <bdi lang={locale}>{languages[locale].label}</bdi>
    </>
  );
}

export function SiteHeader({ language, page, alternates }: HeaderProps) {
  const tr = translator(language);
  const index = languages[language].index;
  const sections = ["services", "work", "process", "about"] as const;
  const link = (section: keyof typeof navigationLabels, className?: string) => (
    <a
      key={section}
      className={className}
      href={pageHref(language, section)}
      aria-current={section === page ? "page" : undefined}
    >
      {navigationLabels[section][index]}
    </a>
  );
  const navigation = (className: string) => (
    <nav
      className={className}
      aria-label={tr("صفحات سایت", "Main navigation", "التنقّل الرئيسي")}
    >
      {sections.map((section) => link(section))}
      <details className="nav-picker network-picker">
        <summary
          className={page.startsWith("network") ? "current-section" : undefined}
        >
          {navigationLabels.network[index]}
          <i className="chevron" aria-hidden="true" />
        </summary>
        <div className="menu-panel">
          {link("network")}
          {Object.entries(networkSections).map(([id, label]) => (
            <a href={pageHref(language, "network") + "#" + id} key={id}>
              {label[index]}
            </a>
          ))}
        </div>
      </details>
      {link("blog")}
      {className === "dropdown" && link("contact")}
    </nav>
  );
  return (
    <>
      <a className="skip" href="#main">
        {tr("رفتن به محتوا", "Skip to content", "انتقل إلى المحتوى")}
      </a>
      <header>
        <div className="bar wrap">
          <a
            className="logo"
            href={pageHref(language)}
            aria-label={tr("جیگزا، خانه", "JIGSAW home", "جيغسو، الرئيسية")}
          >
            <Mark />
          </a>
          {navigation("desktop")}
          <div className="tools">
            <details className="nav-picker language-picker">
              <summary
                aria-label={
                  tr("انتخاب زبان، ", "Choose language, ", "اختر اللغة، ") +
                  languages[language].label
                }
              >
                <LanguageName locale={language} />
                <i className="chevron" aria-hidden="true" />
              </summary>
              <div className="menu-panel">
                {locales.map((locale) => (
                  <a
                    key={locale}
                    href={alternates?.[locale] ?? pageHref(locale, page)}
                    data-language
                    hrefLang={locale}
                    aria-current={locale === language ? "true" : undefined}
                  >
                    <LanguageName locale={locale} />
                  </a>
                ))}
              </div>
            </details>
            {link("contact", "header-cta")}
            <details className="mobile">
              <summary
                aria-label={tr(
                  "منوی صفحات",
                  "Navigation menu",
                  "قائمة الصفحات",
                )}
              >
                <span />
                <span />
              </summary>
              {navigation("dropdown")}
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ language }: { language: Locale }) {
  const tr = translator(language);
  return (
    <footer>
      <div className="wrap foot">
        <a
          href={pageHref(language)}
          aria-label={tr("خانه", "Home", "الرئيسية")}
        >
          <Mark />
        </a>
        <span>
          {tr(
            "ایران، عمان و امارات",
            "Iran, Oman and the UAE",
            "إيران وعُمان والإمارات",
          )}
        </span>
        <a className="footlink" href={pageHref(language, "contact")}>
          {navigationLabels.contact[languages[language].index]}
        </a>
      </div>
    </footer>
  );
}
