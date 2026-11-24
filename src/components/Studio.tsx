import { Cover, Trace, ProjectEntry } from "./Artwork";
import type { CSSProperties } from "react";
import data from "../data/copy.json";
import {
  languages,
  assetHref,
  translator,
  pageHref,
  type Locale,
  type PageKey,
} from "../i18n";

export function StudioContent({
  language,
  page,
}: {
  language: Locale;
  page: Exclude<PageKey, "work">;
}) {
  const i = languages[language].index;
  const tr = translator(language);
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
                  "اكتشفوا مشروع غلاف جيغسو",
                )}
              >
                <Trace />
                <Cover language={language} />
              </a>
              <div className="hero-copy">
                {language !== "en" && (
                  <span className="brand-motto" lang="en" dir="ltr">
                    Can we help you?
                  </span>
                )}
                <h1>
                  {tr("می‌تونیم", "Can we", "هل يمكننا")}{" "}
                  <em>{tr("بهتون کمک کنیم؟", "help you?", "مساعدتكم؟")}</em>
                </h1>
                <p>
                  {tr(
                    "شما ریزه‌کاری‌های کارتون رو می‌شناسید. ما کمک می‌کنیم مشتری‌تون هم اون‌ها رو ببینه. گاهی با یه عکس که جزئیات محصول رو نشون می‌ده، گاهی با سایتی که انتخاب رو براش راحت‌تر می‌کنه.",
                    "You know the details that make your work good. We help your customers see them, from the first image that catches their eye to the question they ask before choosing.",
                    "أنتم تعرفون التفاصيل التي تميّز عملكم. نساعد عملاءكم على رؤيتها، من صورة تُظهر دقة المنتج إلى موقع يسهّل عليهم الاختيار.",
                  )}
                </p>
                <div className="actions">
                  {go(
                    "contact",
                    tr(
                      "دربارهٔ پروژه‌م حرف بزنیم",
                      "Let’s talk about my project",
                      "لنتحدّث عن مشروعي",
                    ),
                  )}
                  {go(
                    "services",
                    tr(
                      "خدمات جیگزا",
                      "Explore our services",
                      "اكتشفوا خدماتنا",
                    ),
                    "textlink",
                  )}
                </div>
              </div>
            </div>
          </section>
          <ProjectEntry language={language} />
          <section className="wrap block split">
            <h2>
              {tr(
                "از کجا شروع کنیم؟",
                "Where should we start?",
                "من أين نبدأ؟",
              )}
            </h2>
            <div className="rows">
              {[
                {
                  id: "identity",
                  title: tr(
                    "برندم به هویت روشن‌تری نیاز دارد",
                    "My brand needs a clearer identity",
                    "علامتي تحتاج إلى هوية أوضح",
                  ),
                  body: tr(
                    "جایگاه، لحن و هویت بصری برند",
                    "Positioning, voice and visual identity",
                    "مكانة العلامة ونبرتها وهويتها البصرية",
                  ),
                },
                {
                  id: "film",
                  title: tr(
                    "می‌خواهم محصول یا خدمتم بهتر معرفی شود",
                    "I want to show what we do",
                    "أريد تقديم منتجي أو خدمتي بصورة أوضح",
                  ),
                  body: tr(
                    "روایت، عکاسی، فیلم و کمپین",
                    "Storytelling, photography, film and campaigns",
                    "السرد والتصوير والأفلام والحملات",
                  ),
                },
                {
                  id: "web",
                  title: tr(
                    "وب‌سایتم باید مسیر مشتری را ساده‌تر کند",
                    "Our website should be easier to use",
                    "أريد أن أسهّل تجربة عملائي على الموقع",
                  ),
                  body: tr(
                    "از اولین سؤال تا ثبت درخواست",
                    "From the first question to an enquiry",
                    "من السؤال الأول إلى تقديم الطلب",
                  ),
                },
              ].map((choice) => (
                <a
                  key={choice.id}
                  className="choice"
                  href={url("services") + "#" + choice.id}
                >
                  <div>
                    <h3>{choice.title}</h3>
                    <p>{choice.body}</p>
                  </div>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </a>
              ))}
              {go(
                "services",
                tr("همهٔ خدمات", "All services", "كل الخدمات"),
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
                  "لكل قطاع تفاصيله",
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
                "نعمل مع شركات في إيران وعُمان والإمارات.",
              )}
            </p>
            {go(
              "process",
              tr("شیوهٔ همکاری با جیگزا", "See how we work", "كيف نعمل معاً"),
            )}
          </div>
        </div>
      )}
      {page === "services" && (
        <div className="wrap inner">
          {intro(
            tr(
              "برای پروژه‌تان به چه چیزی نیاز دارید؟",
              "What does your project need?",
              "ما الذي يحتاجه مشروعكم؟",
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
                    tr(
                      "گفت‌وگو دربارهٔ این خدمت",
                      "Discuss this service",
                      "لنتحدّث عن هذه الخدمة",
                    ),
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
              "من السؤال الأول إلى التسليم",
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
            {tr("پرسش‌های رایج", "Common questions", "أسئلة شائعة")}
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
        <div className="connection-page" data-connection>
          <section className="connection-stage" aria-label={tr("شروع گفت‌وگو","Start a conversation","ابدأوا الحوار")}>
            <div className="wrap connection-stage-inner">
              <div className="connection-scene">
                <div className="connection-photo-motion">
                  <figure className="connection-photo">
                    <img src={assetHref("media/jigsaw-900.webp")} srcSet={[360,600,900].map(n => assetHref("media/jigsaw-"+n+".webp")+" "+n+"w").join(", ")} sizes="(max-width: 700px) 80vw, 42vw" width="900" height="1200" fetchPriority="high" alt={tr("تصویرسازی هویت بصری جیگزا","JIGSAW brand illustration","رسم الهوية البصرية لجيغسو")} />
                  </figure>
                </div>
                <div className="connection-card-motion">
                  <div className="connection-card" dir={languages[language].direction}>
                    <p className="connection-kicker"><i aria-hidden="true"/>{tr("تماس با ما","Contact us","تواصل معنا")}</p>
                    <h1 lang="en" dir="ltr"><span>Can we</span><span>help you?</span></h1>
                    <p className="connection-card-copy">{tr("از ایده‌هاتون برامون بگید. از همین‌جا شروع می‌کنیم.","Tell us what you have in mind. Let’s start here.","أخبرونا بما يدور في أذهانكم. لنبدأ من هنا.")}</p>
                    <a className="connection-primary" href="#contact-form">{tr("بیا صحبت کنیم","Let's talk","لنتحدّث")} <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </div>
              <div className="connection-word-wrap">
                <div className="connection-word" dir="ltr" aria-label="JIGSAW" role="img">
                  {"JIGSAW".split("").map((letter,n)=><span key={n} aria-hidden="true" style={{"--letter":n} as CSSProperties}>{letter}</span>)}
                </div>
              </div>
            </div>
          </section>
          <section className="wrap connection-paths" aria-labelledby="connection-paths-title">
            <div className="connection-section-heading" data-contact-reveal>
              <small>01 / {tr("مسیرهای ارتباطی","Ways to connect","طرق التواصل")}</small>
              <h2 id="connection-paths-title">{tr("از کجا شروع کنیم؟","How should we connect?","من أين نبدأ؟")}</h2>
              <p>{tr("هر گفت‌وگویی مسیر خودش رو داره.","Every conversation has its own starting point.","لكل حوار نقطة بداية.")}</p>
            </div>
            <div className="connection-grid">
              {[
                {id:"project",title:tr("شروع یک پروژه","Start a project","ابدأ مشروعاً"),text:tr("درباره ایده یا کسب‌وکارتون حرف بزنیم.","Tell us about your idea or business.","لنتحدّث عن فكرتكم أو عملكم."),href:"#contact-form"},
                {id:"phone",title:tr("تماس تلفنی","Call us","اتصلوا بنا"),text:tr("برای یک گفت‌وگوی مستقیم.","For a direct conversation.","لحوار مباشر."),href:null},
                {id:"whatsapp",title:"WhatsApp",text:tr("برای یک پیام کوتاه و راحت.","For a quick, easy message.","لرسالة سريعة وسهلة."),href:null},
                {id:"email",title:tr("ارسال ایمیل","Email us","راسلونا"),text:tr("برای معرفی، فایل یا مکاتبات.","For introductions, files or correspondence.","للتعريف أو الملفات أو المراسلات."),href:null},
                {id:"team",title:tr("همکاری با تیم جیگزا","Join our team","انضموا إلى فريقنا"),text:tr("جایی برای آدم‌های خلاق.","A place for creative people.","مكان للمبدعين."),href:null},
                {id:"partner",title:tr("پیشنهاد شراکت","Become a partner","اقترحوا شراكة"),text:tr("ببینیم چه چیزی می‌تونیم با هم بسازیم.","Let’s see what we can build together.","لنكتشف ما يمكننا بناؤه معاً."),href:url("contact")+"?interest=partnership#contact-form"}
              ].map((item,n)=>{
                const inside=<><span className="connection-route-index">0{n+1}</span><span className={"connection-route-art route-"+item.id} aria-hidden="true"><i/><b/></span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="connection-route-tail">{item.href?"↗":tr("به‌زودی","Coming soon","قريباً")}</span></>;
                const className="connection-route connection-route-"+item.id;
                return item.href?<a key={item.id} className={className} href={item.href} data-astro-reload={item.id==="partner"?"true":undefined} data-contact-reveal>{inside}</a>:<div key={item.id} className={className+" is-pending"} data-contact-reveal>{inside}</div>;
              })}
            </div>
          </section>
          <section className="wrap inner contact connection-form" id="contact-form" aria-labelledby="connection-form-title">
            <div className="connection-section-heading" data-contact-reveal>
              <small>02 / {tr("شرح پروژه","Project brief","ملخص المشروع")}</small>
              <h2 id="connection-form-title">{tr("از ایده‌تون بگید.","Tell us your story.","حدّثونا عن فكرتكم.")}</h2>
              <p>{data.contactIntro[i]}</p>
            </div>
          <form id="enquiry">
            <p className="notice">
              {tr(
                "فرم در حالت پیش‌نمایش است. می‌توانید یک نسخه از شرح پروژه را برای خودتان دانلود کنید.",
                "This form is in preview mode. You can download a copy of your project brief.",
                "يمكنكم تنزيل نسخة من ملخّص المشروع للاحتفاظ بها. لا يرسل هذا النموذج البيانات إلى الاستوديو.",
              )}
            </p>
            <div className="fields">
              <label>
                {tr("نام شما", "Your name", "الاسم")}
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                {tr(
                  "نام مجموعه (اختیاری)",
                  "Business name (optional)",
                  "اسم الشركة (اختياري)",
                )}
                <input name="business" autoComplete="organization" />
              </label>
              <label>
                {tr(
                  "ایمیل یا شمارهٔ تماس",
                  "Email or phone number",
                  "البريد الإلكتروني أو رقم الهاتف",
                )}
                <input name="contact" dir="auto" required />
              </label>
              <div className="interest-field" data-interest>
                <span id="interest-label">
                  {tr("موضوع همکاری", "Project interest", "موضوع التعاون")}
                </span>
                <input type="hidden" name="interest" value="unsure" />
                <details className="interest-picker">
                  <summary aria-labelledby="interest-label interest-value">
                    <span id="interest-value">
                      {tr(
                        "هنوز مطمئن نیستم",
                        "I’m not sure yet",
                        "لم أقرّر بعد",
                      )}
                    </span>
                    <span className="interest-chevron" aria-hidden="true" />
                  </summary>
                  <div
                    className="interest-options"
                    role="group"
                    aria-labelledby="interest-label"
                  >
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
                    <button
                      type="button"
                      data-value="unsure"
                      aria-pressed={true}
                    >
                      {tr(
                        "هنوز مطمئن نیستم",
                        "I’m not sure yet",
                        "لم أقرّر بعد",
                      )}
                    </button>
                    <button
                      type="button"
                      data-value="partnership"
                      aria-pressed={false}
                    >
                      {tr(
                        "پیشنهاد شراکت",
                        "Business partnership",
                        "اقتراح شراكة",
                      )}
                    </button>
                    <button
                      type="button"
                      data-value="samples"
                      data-legacy-service="related"
                      aria-pressed={false}
                    >
                      {tr(
                        "درخواست نمونهٔ مرتبط",
                        "Request relevant work",
                        "طلب أعمال مشابهة",
                      )}
                    </button>
                  </div>
                </details>
              </div>
              <label className="wide">
                {tr(
                  "توضیح پروژه",
                  "Tell us about your project",
                  "حدّثونا عن مشروعكم",
                )}
                <textarea
                  name="brief"
                  required
                  rows={4}
                  placeholder={tr(
                    "دوست دارید چه تغییری ایجاد شود؟",
                    "What would you like to change?",
                    "ما الذي تودّون تغييره؟",
                  )}
                />
              </label>
              <label className="wide">
                {tr(
                  "لینک نمونه (اختیاری)",
                  "Reference link (optional)",
                  "رابط مرجعي (اختياري)",
                )}
                <input
                  name="reference"
                  type="url"
                  dir="ltr"
                  placeholder="https://"
                />
              </label>
            </div>
            <button className="button" type="button" id="download">
              {tr(
                "دانلود شرح پروژه",
                "Download my brief",
                "تنزيل ملخّص المشروع",
              )}
            </button>
            <p role="status" id="status" />
          </form>
          </section>
        </div>
      )
    </>
  );
}
