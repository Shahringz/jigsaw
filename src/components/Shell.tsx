import { Mark } from "./Artwork";
import data from "../data/copy.json";
import { languages, pageHref, pages, type Locale, type PageKey } from "../i18n";

interface HeaderProps {
  language: Locale;
  page: PageKey;
}

export function SiteHeader({ language, page }: HeaderProps) {
  const fa = language === "fa";
  const alternate = fa ? "en" : "fa";
  const index = fa ? 0 : 1;
  const contact = data.nav[5][index];
  function navigation(className: string) {
    return (
      <nav
        className={className}
        aria-label={fa ? "صفحات سایت" : "Main navigation"}
      >
        {pages.slice(1, 5).map((section, i) => (
          <a
            key={section}
            href={pageHref(language, section)}
            aria-current={section === page ? "page" : undefined}
          >
            {data.nav[i + 1][index]}
          </a>
        ))}
      </nav>
    );
  }
  return (
    <>
      <a className="skip" href="#main">
        {fa ? "رفتن به محتوا" : "Skip to content"}
      </a>
      <header>
        <div className="bar wrap">
          <a
            className="logo"
            href={pageHref(language)}
            aria-label={fa ? "جیگزا، خانه" : "JIGSAW home"}
          >
            <Mark />
          </a>
          {navigation("desktop")}
          <div className="tools">
            <a
              className="lang"
              data-language
              href={pageHref(alternate, page)}
              lang={alternate}
              hrefLang={alternate}
            >
              {languages[alternate].label}
            </a>
            <a className="header-cta" href={pageHref(language, "contact")}>
              {contact}
            </a>
            <details className="mobile">
              <summary aria-label={fa ? "منوی صفحات" : "Navigation menu"}>
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
  const fa = language === "fa";
  return (
    <footer>
      <div className="wrap foot">
        <a href={pageHref(language)} aria-label={fa ? "خانه" : "Home"}>
          <Mark />
        </a>
        <span>{fa ? "ایران، عمان و امارات" : "Iran, Oman and the UAE"}</span>
        <a className="footlink" href={pageHref(language, "contact")}>
          {fa ? "شروع گفت‌وگو" : "Start a conversation"}
        </a>
      </div>
    </footer>
  );
}
