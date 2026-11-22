import { Cover, Trace, ProjectEntry } from "./Artwork";
import data from "../data/copy.json";
import { pageHref, type Locale, type PageKey } from "../i18n";

export function StudioContent({
  language,
  page,
}: {
  language: Locale;
  page: Exclude<PageKey, "work">;
}) {
  const fa = language === "fa",
    i = fa ? 0 : 1,
    tr = (a: string, b: string) => (fa ? a : b);
  const url = (p: PageKey) => pageHref(language, p);
  const go = (p: PageKey, text: string, style = "button", suffix = "") => (
    <a className={style} href={url(p) + suffix}>
      {text}
    </a>
  );
  const intro = (title: string, body?: string) => (
    <div className="intro">
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </div>
  );
  return (
    <>
      {page === "home" && (
        <>
          <section className="hero">
            <div className="wrap hero-grid">
              <a
                className="poster"
                href={url("work") + "#cover"}
                aria-label={tr(
                  "ورود به پروژهٔ جلد جیگزا",
                  "Explore the JIGSAW cover project",
                )}
              >
                <Trace />
                <Cover fa={fa} />
              </a>
              <div className="hero-copy">
                <h1>
                  {fa ? (
                    <>
                      کیفیت کار شما
                      <br />
                      <em>چطور دیده</em> می‌شود؟
                    </>
                  ) : (
                    <>
                      How do people see the <em>quality</em> of your work?
                    </>
                  )}
                </h1>
                <p>
                  {tr(
                    "شما جزئیات کارتان را می‌شناسید. ما کمک می‌کنیم مشتری هم آن‌ها را ببیند؛ از اولین تصویری که توجهش را جلب می‌کند تا سؤالی که پیش از انتخاب می‌پرسد.",
                    "You know the details that make your work good. We help your customers see them, from the first image that catches their eye to the question they ask before choosing.",
                  )}
                </p>
                <div className="actions">
                  {go(
                    "contact",
                    tr(
                      "دربارهٔ پروژه‌ام صحبت کنیم",
                      "Let’s talk about my project",
                    ),
                  )}
                  {go(
                    "services",
                    tr("خدمات جیگزا", "Explore our services"),
                    "textlink",
                  )}
                </div>
              </div>
            </div>
          </section>
          <ProjectEntry fa={fa} />
          <section className="wrap block split">
            <h2>{tr("از کجا شروع کنیم؟", "Where should we start?")}</h2>
            <div className="rows">
              {[
                [
                  "identity",
                  "برندم به هویت روشن‌تری نیاز دارد",
                  "My brand needs a clearer identity",
                  "جایگاه، لحن و هویت بصری برند",
                  "Positioning, voice and visual identity",
                ],
                [
                  "film",
                  "می‌خواهم محصول یا خدمتم بهتر معرفی شود",
                  "I want to show what we do",
                  "روایت، عکاسی، فیلم و کمپین",
                  "Storytelling, photography, film and campaigns",
                ],
                [
                  "web",
                  "وب‌سایتم باید مسیر مشتری را ساده‌تر کند",
                  "Our website should be easier to use",
                  "از اولین سؤال تا ثبت درخواست",
                  "From the first question to an enquiry",
                ],
              ].map((a) => (
                <a
                  key={a[0]}
                  className="choice"
                  href={url("services") + "#" + a[0]}
                >
                  <div>
                    <h3>{a[fa ? 1 : 2]}</h3>
                    <p>{a[fa ? 3 : 4]}</p>
                  </div>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </a>
              ))}
              {go(
                "services",
                tr("همهٔ خدمات", "All services"),
                "textlink endlink",
              )}
            </div>
          </section>
          <section className="ink">
            <div className="wrap block">
              <h2>
                {tr(
                  "هر کسب‌وکاری جزئیات خودش را دارد",
                  "The details change with the industry",
                )}
              </h2>
              <div className="industries">
                {data.industries.map((a, j) => (
                  <article key={j}>
                    <div className={"shape shape" + j} aria-hidden="true" />
                    <h3>{a[i][0]}</h3>
                    <p>{a[i][1]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      {page === "about" && (
        <div className="wrap inner">
          {intro(data.about[0].title[i], data.about[0].body[i])}
          <div className="story">
            {data.about.slice(1).map((a) => (
              <section className="storyrow" key={a.title[1]}>
                <h2>{a.title[i]}</h2>
                <p>{a.body[i]}</p>
              </section>
            ))}
            <p>
              {tr(
                "با کسب‌وکارهای ایران، عمان و امارات همکاری می‌کنیم.",
                "We work with businesses in Iran, Oman and the UAE.",
              )}
            </p>
            {go("process", tr("شیوهٔ همکاری با جیگزا", "See how we work"))}
          </div>
        </div>
      )}
      {page === "services" && (
        <div className="wrap inner">
          {intro(
            tr(
              "برای پروژه‌تان به چه چیزی نیاز دارید؟",
              "What does your project need?",
            ),
            data.serviceIntro[i],
          )}
          <div className="service-list">
            {data.services.map((s, serviceIndex) => (
              <details key={s.id} id={s.id}>
                <summary id={"service-" + serviceIndex}>
                  <h2>{s.title[i]}</h2>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="expanded">
                  <p>{s.body[i]}</p>
                  {go(
                    "contact",
                    tr("گفت‌وگو دربارهٔ این خدمت", "Discuss this service"),
                    "textlink",
                    "?interest=" + s.id,
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
      {page === "process" && (
        <div className="wrap inner">
          {intro(
            tr(
              "از اولین سؤال تا تحویل پروژه",
              "From the first question to handover",
            ),
            data.processIntro[i],
          )}
          <ol className="steps">
            {data.process.map((s) => (
              <li key={s[1][0]}>
                <h2>{s[i][0]}</h2>
                <p>{s[i][1]}</p>
              </li>
            ))}
          </ol>
          <h2 className="faqtitle">
            {tr("پرسش‌های رایج", "Common questions")}
          </h2>
          <div className="service-list">
            {data.faq.map((s) => (
              <details key={s[0][1]}>
                <summary>
                  <h3>{s[0][i]}</h3>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="expanded">{s[1][i]}</p>
              </details>
            ))}
          </div>
        </div>
      )}
      {page === "contact" && (
        <div className="wrap inner contact">
          {intro(
            tr(
              "از همان بخشی شروع کنیم که ذهنتان را مشغول کرده",
              "What would you like to work on?",
            ),
            data.contactIntro[i],
          )}
          <form id="enquiry">
            <p className="notice">
              {tr(
                "فرم در حالت پیش‌نمایش است. می‌توانید یک نسخه از شرح پروژه را برای خودتان دانلود کنید.",
                "This form is in preview mode. You can download a copy of your project brief.",
              )}
            </p>
            <div className="fields">
              <label>
                {tr("نام شما", "Your name")}
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                {tr("نام مجموعه (اختیاری)", "Business name (optional)")}
                <input name="business" autoComplete="organization" />
              </label>
              <label>
                {tr("ایمیل یا شمارهٔ تماس", "Email or phone number")}
                <input name="contact" dir="auto" required />
              </label>
              <div className="interest-field" data-interest>
                <span id="interest-label">{tr("موضوع همکاری", "Project interest")}</span>
                <input type="hidden" name="interest" value="unsure" />
                <details className="interest-picker">
                  <summary aria-labelledby="interest-label interest-value">
                    <span id="interest-value">{tr("هنوز مطمئن نیستم", "I’m not sure yet")}</span>
                    <span className="interest-chevron" aria-hidden="true" />
                  </summary>
                  <div className="interest-options" role="group" aria-labelledby="interest-label">
                    {data.services.map((s, serviceIndex) => (
                      <button
                        type="button"
                        data-value={s.id}
                        data-legacy-service={serviceIndex}
                        aria-pressed={false}
                        key={s.id}
                      >
                        {s.title[i]}
                      </button>
                    ))}
                    <button type="button" data-value="unsure" aria-pressed={true}>
                      {tr("هنوز مطمئن نیستم", "I’m not sure yet")}
                    </button>
                    <button type="button" data-value="samples" data-legacy-service="related" aria-pressed={false}>
                      {tr("درخواست نمونهٔ مرتبط", "Request relevant work")}
                    </button>
                  </div>
                </details>
              </div>
              <label className="wide">
                {tr("توضیح پروژه", "Tell us about your project")}
                <textarea
                  name="brief"
                  required
                  rows={4}
                  placeholder={tr(
                    "دوست دارید چه تغییری ایجاد شود؟",
                    "What would you like to change?",
                  )}
                />
              </label>
              <label className="wide">
                {tr("لینک نمونه (اختیاری)", "Reference link (optional)")}
                <input
                  name="reference"
                  type="url"
                  dir="ltr"
                  placeholder="https://"
                />
              </label>
            </div>
            <button className="button" type="button" id="download">
              {tr("دانلود شرح پروژه", "Download my brief")}
            </button>
            <p role="status" id="status" />
          </form>
        </div>
      )}
    </>
  );
}
