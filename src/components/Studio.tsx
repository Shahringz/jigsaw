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
                    <a className="connection-primary" href="#contact-form" data-open-quiz="">{tr("بیا صحبت کنیم","Let's talk","لنتحدّث")} <span aria-hidden="true">↗</span></a>
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
                {id:"team",title:tr("همکاری با تیم جیگزا","Join our team","انضموا إلى فريقنا"),text:tr("جایی برای آدم‌های خلاق.","A place for creative people.","مكان للمبدعين."),href:"#contact-form"},
                {id:"partner",title:tr("پیشنهاد شراکت","Become a partner","اقترحوا شراكة"),text:tr("ببینیم چه چیزی می‌تونیم با هم بسازیم.","Let’s see what we can build together.","لنكتشف ما يمكننا بناؤه معاً."),href:"#contact-form"}
              ].map((item,n)=>{
                const inside=<><span className="connection-route-index">0{n+1}</span><span className={"connection-route-art route-"+item.id} aria-hidden="true"><i/><b/></span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="connection-route-tail">{item.href?"↗":tr("به‌زودی","Coming soon","قريباً")}</span></>;
                const className="connection-route connection-route-"+item.id;
                return item.href?<a key={item.id} className={className} href={item.href} data-open-quiz={item.id==="partner"?"partnership":item.id==="team"?"careers":""} data-contact-reveal>{inside}</a>:<div key={item.id} className={className+" is-pending"} data-contact-reveal>{inside}</div>;
              })}
            </div>
          </section>
          <section className="wrap inner contact connection-form" id="contact-form" aria-labelledby="connection-form-title">
            <div className="connection-section-heading" data-contact-reveal>
              <small>02 / {tr("شرح پروژه","Project brief","ملخص المشروع")}</small>
              <h2 id="connection-form-title">{tr("از ایده‌تون بگید.","Tell us your story.","حدّثونا عن فكرتكم.")}</h2>
              <p>{data.contactIntro[i]}</p>
            </div>
            <div className="connection-brief-card" data-contact-reveal>
              <span className="connection-brief-number" dir="ltr">01 — 03</span>
              <h3>{tr("سه قدم برای شروع.","Three steps to get started.","ثلاث خطوات للبداية.")}</h3>
              <p>{tr("موضوع همکاری، آشنایی با شما و چند خط درباره ایده‌تون.","Choose a topic, introduce yourself and tell us a little about your idea.","اختاروا الموضوع، عرّفوا بأنفسكم وأخبرونا عن فكرتكم.")}</p>
              <a className="connection-primary" href="#contact-form" data-open-quiz="">{tr("شروع پرسش‌نامه","Start the questionnaire","ابدأوا الاستبيان")} <span aria-hidden="true">↗</span></a>
              <p className="connection-brief-note">{tr("نسخه آزمایشی: پاسخ‌ها فقط به‌صورت فایل دانلود می‌شن و هنوز برای جیگزا ارسال نمی‌شن.","Preview: responses can be downloaded, but are not yet sent to JIGSAW.","نسخة تجريبية: يمكن تنزيل الإجابات، ولا تُرسل إلى جيغسو بعد.")}</p>
              <noscript>{tr("برای باز کردن پرسش‌نامه، جاوااسکریپت را فعال کنید.","Enable JavaScript to open the questionnaire.","فعّلوا جافاسكريبت لفتح الاستبيان.")}</noscript>
            </div>
          </section>
          <dialog className="connection-quiz" id="connection-quiz" aria-labelledby="quiz-heading-1" data-preview-note={tr("شرح پروژه آماده دانلود شد؛ هیچ اطلاعاتی ارسال نشده.","Your brief is ready to download. Nothing has been sent.","الملخص جاهز للتنزيل. لم تُرسل أي بيانات.")} data-contact-required={tr("حداقل یک ایمیل یا شماره تماس معتبر وارد کنید.","Enter at least one valid email or phone number.","أدخلوا بريداً إلكترونياً أو رقم هاتف صالحاً.")} data-topic-required={tr("حداقل یک گزینه انتخاب کنید.","Choose at least one option.","اختاروا خياراً واحداً على الأقل.")}>
            <div className="quiz-scenery" aria-hidden="true">
              <svg viewBox="0 0 160 160" className="quiz-piece quiz-piece-a"><path fill="#F5BD13" d="M0 0H58C48 35 95 35 85 0H160V65C125 55 125 105 160 95V160H0Z"/></svg>
              <svg viewBox="0 0 160 160" className="quiz-piece quiz-piece-b"><path fill="#22221F" d="M0 0H160V160H95C105 125 55 125 65 160H0V95C35 105 35 55 0 65Z"/></svg>
              <img className="quiz-side-art" src={assetHref("media/jigsaw-600.webp")} alt="" width="600" height="800" loading="lazy"/>
              <span className="quiz-red-square"/>
            </div>
            <div className="quiz-shell">
              <div className="quiz-top">
                <span className="quiz-brand" dir="ltr">JIGSAW<span>.</span></span>
                <button type="button" className="quiz-close" data-quiz-close aria-label={tr("بستن پرسش‌نامه","Close questionnaire","إغلاق الاستبيان")}>×</button>
                <span className="quiz-counter" dir="ltr" aria-live="polite">01 / 03</span>
              </div>
              <div className="quiz-progress" aria-hidden="true"><i/><i/><i/></div>
              <form id="connection-quiz-form" noValidate>
                <section className="quiz-step" data-quiz-step="1">
                  <p className="quiz-step-number" dir="ltr">01.</p>
                  <h2 id="quiz-heading-1" tabIndex={-1}>{tr("روی چی با هم کار کنیم؟","What can we work on?","على ماذا نعمل معاً؟")}</h2>
                  <p className="quiz-intro">{tr("هر چندتا گزینه که به کارتون میاد، انتخاب کنید.","Choose as many as you like.","اختاروا كل ما يناسبكم.")}</p>
                  <div className="quiz-options">
                    {[...data.services.map((service,n)=>({id:service.id,title:service.title[i],legacy:String(n)})),{id:"partnership",title:tr("پیشنهاد شراکت تجاری","Business partnership","اقتراح شراكة"),legacy:""},{id:"careers",title:tr("همکاری با تیم جیگزا","Join the JIGSAW team","انضموا إلى فريق جيغسو"),legacy:""},{id:"samples",title:tr("دیدن نمونه‌کار مرتبط","Request relevant work","طلب أعمال مشابهة"),legacy:"related"},{id:"unsure",title:tr("هنوز نمی‌دونم از کجا شروع کنم!","Not sure where to start!","لم أقرر من أين أبدأ!"),legacy:""},{id:"hello",title:tr("فقط اومدم سلام کنم!","Just saying hello!","أردت فقط إلقاء التحية!"),legacy:""}].map(item=><label className="quiz-option" key={item.id}><input type="checkbox" name="topics" value={item.id} data-legacy-service={item.legacy}/><span>{item.title}</span></label>)}
                  </div>
                  <div className="quiz-actions"><button type="button" className="quiz-next" data-quiz-next>{tr("مرحله بعد","Next step","الخطوة التالية")} <span aria-hidden="true">↗</span></button></div>
                </section>
                <section className="quiz-step" data-quiz-step="2" hidden>
                  <p className="quiz-step-number" dir="ltr">02.</p>
                  <h2 id="quiz-heading-2" tabIndex={-1}>{tr("یکم بیشتر آشنا بشیم.","Let’s get to know you.","لنتعرّف عليكم أكثر.")}</h2>
                  <p className="quiz-intro">{tr("اسم‌تون و حداقل یک راه ارتباطی برای شروع کافیه.","Your name and at least one way to reach you are enough.","اسمكم وطريقة واحدة للتواصل تكفيان.")}</p>
                  <div className="quiz-fields">
                    <label>{tr("نام","First name","الاسم")}<input name="firstName" autoComplete="given-name" required maxLength={100}/></label>
                    <label>{tr("نام خانوادگی","Last name","اسم العائلة")}<input name="lastName" autoComplete="family-name" required maxLength={100}/></label>
                    <label>{tr("نام مجموعه (اختیاری)","Business name (optional)","اسم الشركة (اختياري)")}<input name="business" autoComplete="organization" maxLength={150}/></label>
                    <label>{tr("ایمیل","Email","البريد الإلكتروني")}<input name="email" type="email" autoComplete="email" dir="ltr" placeholder="name@example.com" maxLength={254}/></label>
                    <label className="quiz-wide">{tr("شماره تماس با کد کشور","Phone number with country code","رقم الهاتف مع رمز الدولة")}<span className="quiz-phone" dir="ltr"><select name="country" aria-label={tr("کد کشور","Country code","رمز الدولة")}><option value="">{tr("کد کشور","Country code","رمز الدولة")}</option><option value="+98">IR +98</option><option value="+968">OM +968</option><option value="+971">AE +971</option><option value="other">{tr("سایر (شماره کامل)","Other (full number)","أخرى (الرقم الكامل)")}</option></select><input name="phone" type="tel" autoComplete="tel" placeholder="+..." maxLength={32}/></span></label>
                  </div>
                  <div className="quiz-actions"><button type="button" className="quiz-back" data-quiz-back>{tr("مرحله قبل","Previous","السابق")}</button><button type="button" className="quiz-next" data-quiz-next>{tr("مرحله آخر","Final step","الخطوة الأخيرة")} <span aria-hidden="true">↗</span></button></div>
                </section>
                <section className="quiz-step" data-quiz-step="3" hidden>
                  <p className="quiz-step-number" dir="ltr">03.</p>
                  <h2 id="quiz-heading-3" tabIndex={-1}>{tr("چیزی هست که بخواید بگید؟","Anything else?","هل من شيء آخر؟")}</h2>
                  <p className="quiz-intro">{tr("از ایده یا پروژه‌تون برامون بگید؛ چند خط هم کافیه.","Tell us a little about your idea or project. A few lines are enough.","أخبرونا عن فكرتكم أو مشروعكم. بضعة أسطر تكفي.")}</p>
                  <div className="quiz-fields">
                    <label className="quiz-wide">{tr("پیام شما (اختیاری)","Your message (optional)","رسالتكم (اختياري)")}<textarea name="brief" rows={4} maxLength={5000} placeholder={tr("از اینجا شروع کنید...","Start here...","ابدأوا هنا...")}/></label>
                    <label className="quiz-wide">{tr("لینک نمونه‌کار یا رفرنس (اختیاری)","Portfolio or reference link (optional)","رابط الأعمال أو المرجع (اختياري)")}<input name="reference" type="url" dir="ltr" placeholder="https://" maxLength={2048}/></label>
                  </div>
                  <p className="quiz-preview-note">{tr("نسخه آزمایشی: این اطلاعات فقط روی دستگاه شما به فایل تبدیل می‌شن؛ به جیگزا ارسال نمی‌شن.","Preview mode: your answers are converted into a file on your device and are not sent to JIGSAW.","نسخة تجريبية: تتحول الإجابات إلى ملف على جهازكم ولا تُرسل إلى جيغسو.")}</p>
                  <div className="quiz-actions"><button type="button" className="quiz-back" data-quiz-back>{tr("مرحله قبل","Previous","السابق")}</button><button type="submit" className="quiz-next">{tr("دانلود شرح پروژه","Download my brief","تنزيل ملخّص المشروع")} <span aria-hidden="true">↓</span></button></div>
                </section>
                <p className="quiz-error" role="alert" hidden/>
              </form>
              <section className="quiz-success" hidden>
                <svg viewBox="0 0 160 100" aria-hidden="true" className="quiz-connected"><path fill="#F5BD13" d="M0 10H80V33C108 24 108 66 80 57V90H0Z"/><path fill="#22221F" d="M80 10H160V90H80V57C108 66 108 24 80 33Z"/></svg>
                <h2 tabIndex={-1}>{tr("یک قطعه دیگه آماده شد!","One more piece ready!","قطعة أخرى جاهزة!")}</h2>
                <p>{tr("شرح پروژه آماده دانلود شده. هنوز پیامی ارسال نشده.","Your brief is ready to download. Nothing has been sent.","ملخصكم جاهز للتنزيل. لم تُرسل أي رسالة.")}</p>
                <div className="quiz-actions"><button type="button" className="quiz-back" data-quiz-edit>{tr("ویرایش پاسخ‌ها","Edit answers","تعديل الإجابات")}</button><button type="button" className="quiz-next" data-quiz-close>{tr("بازگشت به صفحه تماس","Back to contact","العودة إلى التواصل")}</button></div>
              </section>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
