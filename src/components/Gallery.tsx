import { Orbit } from "./Artwork";
import { EditorialText } from "./EditorialText";
import {
  assetHref,
  pageHref,
  languages,
  translator,
  type Locale,
} from "../i18n";
import { useEffect, useState } from "react";
type Props = { language: Locale };
const pieces = [
  {
    id: "cover",
    tag: ["هویت بصری", "Identity", "هوية بصرية"],
    title: ["دو دست، یک تصویر", "Two hands, one image", "يدان وصورة واحدة"],
    body: [
      "دو تا شخصیت دست‌هاشون رو به سمت یه قطعه می‌برن. همین لحظه رو برای جلد کاتالوگ جیگزا انتخاب کردیم.",
      "Two characters reach for the same piece. That little moment of connection became our studio catalogue cover.",
      "شخصيتان تمدّان أيديهما نحو قطعة واحدة. اخترنا لحظة التواصل هذي لغلاف كتالوج الاستوديو.",
    ],
  },
  {
    id: "print",
    tag: ["پوستر", "Poster", "ملصق"],
    title: ["آخرین قطعه", "The last piece", "القطعة الأخيرة"],
    body: [
      "توی این اتود، یه تکه از صورت روی قطعه زرد چاپ شده. وقتی دست قطعه رو سر جاش می‌ذاره، پرتره کامل می‌شه.",
      "A fragment of a face sits on the yellow piece. Put it in place and the whole portrait comes together.",
      "في هالتجربة، جزء من الوجه مطبوع على القطعة الصفراء. أول ما ترجع القطعة لمكانها، تكتمل الصورة.",
    ],
  },
  {
    id: "motion",
    tag: ["موشن", "Motion", "حركة"],
    title: ["مدار اتصال", "Orbit in motion", "مدارات تلتقي"],
    body: [
      "این بار رنگ‌های جلد رو از روی کاغذ آوردیم توی یه تجربه تعاملی. سه حلقه در فضا می‌چرخن و دور یه هسته به هم نزدیک می‌شن.",
      "We took our cover colours off the page and set them in motion. Three rings turn in depth around a shared centre.",
      "هالمرة طلعنا ألوان الغلاف من الورق وخلّيناها تتحرك. ثلاث حلقات تدور في الفضاء حول مركز مشترك.",
    ],
  },
];
function Art({ id, language }: Props & { id: string }) {
  const tr = translator(language);
  if (id === "motion") return <Orbit />;
  return (
    <img
      loading="lazy"
      alt={
        id === "cover"
          ? tr(
              "جلد تصویری جیگزا",
              "Illustrated JIGSAW studio cover",
              "غلاف جيغسو المرسوم",
            )
          : tr(
              "دست و قطعهٔ زرد روی یک پرترهٔ چاپی",
              "A hand fitting a yellow piece into a printed portrait",
              "يد تضع قطعة صفراء في صورة وجه مطبوعة",
            )
      }
      src={assetHref(
        id === "cover" ? "media/jigsaw-600.webp" : "media/last-piece.webp",
      )}
    />
  );
}
const stages = [
  {
    id: "composition",
    title: ["قاب تصویر", "The composition", "تكوين الصورة"],
    text: [
      "دو تا دست و یه فاصله. توی نمای نزدیک ببینید چشمتون چطور از دست چپ به قطعه وسط و بعد به دست راست می‌رسه.",
      "Two hands, one little gap. Follow your eye from the left hand, across the piece, to the right.",
      "يدان وبينهما مسافة صغيرة. شوفوا كيف تنتقل العين من اليد اليسرى للقطعة في الوسط، ثم لليد اليمنى.",
    ],
  },
  {
    id: "ink",
    title: ["رنگ‌های چاپ", "The ink colours", "ألوان الطباعة"],
    text: [
      "زرد نگاه رو به نقطه اتصال می‌بره، قرمز بین دو شخصیت تعادل ایجاد می‌کنه و زمینه زغالی باعث می‌شه خطوط سفید بهتر دیده بشن.",
      "Yellow draws your eye to the connection, red balances the figures, and charcoal makes the white outlines pop.",
      "الأصفر يلفت النظر لنقطة الالتقاء، والأحمر يوازن بين الشخصيتين، والخلفية الفحمية تبرز الخطوط البيضاء.",
    ],
  },
  {
    id: "sheet",
    title: ["جلد کامل", "The finished cover", "الغلاف الكامل"],
    text: [
      "حالا همون جزئیات رو توی جلد کامل ببینید. فاصله تیتر و تصویر رو طوری در نظر گرفتیم که توی قطع عمودی راحت خونده بشه.",
      "Now see how it all comes together. We left breathing room between the lettering and the illustration so the portrait-format cover is easy to read.",
      "الحين شوفوا التفاصيل كلها على الغلاف الكامل. تركنا مساحة بين العنوان والرسم عشان تكون القراءة واضحة في التصميم العمودي.",
    ],
  },
];
export function Gallery({ language }: Props) {
  const tr = translator(language);
  const idx = languages[language].index,
    [filter, setFilter] = useState("all"),
    [stage, setStage] = useState(0);
  useEffect(() => {
    const open = () => {
      const id = location.hash.slice(1);
      if (pieces.some((p) => p.id === id)) {
        const item = document.getElementById(id) as HTMLDetailsElement | null;
        if (item) item.open = true;
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return (
    <div className="wrap exhibit">
      <div className="intro">
        <h1>
          {tr("تجربه‌های استودیو", "Studio experiments", "تجارب الاستوديو")}
        </h1>
        <p>
          <EditorialText language={language} text={tr(
            "از طراحی جلد جیگزا تا پوستر و موشن؛ هر اثر رو باز کنید تا از نزدیک ببینیدش.",
            "From cover design to posters and motion, take a closer look at what we’ve been making.",
            "من تصميم الغلاف إلى الملصق والموشن، خذوا جولة قريبة في تجاربنا.",
          )}/>
        </p>
      </div>
      <div
        className="filters"
        role="group"
        aria-label={tr("فیلتر آثار", "Filter work", "تصفية الأعمال")}
      >
        {[{ id: "all", tag: ["همه", "All", "الكل"] }, ...pieces].map((p) => (
          <button
            key={p.id}
            aria-pressed={filter === p.id}
            onClick={() => setFilter(p.id)}
          >
            {p.tag[idx]}
          </button>
        ))}
      </div>
      <div className="ex-grid">
        {pieces
          .filter((p) => filter === "all" || p.id === filter)
          .map((p) => (
            <details id={p.id} key={p.id} className={"ex-card art-" + p.id}>
              <summary>
                <div className="ex-art">
                  <Art id={p.id} language={language} />
                </div>
                <div className="ex-caption">
                  <div>
                    <small>{p.tag[idx]}</small>
                    <h2>{p.title[idx]}</h2>
                  </div>
                  <span aria-hidden="true">+</span>
                </div>
              </summary>
              <p className="ex-description"><EditorialText language={language} text={p.body[idx]}/></p>
            </details>
          ))}
      </div>
      <section id="backstage" className="backstage">
        <h2>{tr("پشت صحنهٔ جلد", "Inside the cover", "من كواليس الغلاف")}</h2>
        <div className="bench">
          <div className={"bench-frame frame-" + stages[stage].id} key={stage}>
            {stage === 1 ? (
              <div className="swatch-set" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            ) : (
              <img
                src={assetHref("media/jigsaw-600.webp")}
                loading="lazy"
                alt={stages[stage].title[idx]}
              />
            )}
          </div>
          <div className="bench-text" aria-live="polite">
            <small>
              {tr("یادداشت طراحی", "Design notes", "ملاحظات التصميم")}
            </small>
            <h3>{stages[stage].title[idx]}</h3>
            <p><EditorialText language={language} text={stages[stage].text[idx]}/></p>
            <div className="stage-controls">
              {stages.map((s, n) => (
                <button
                  key={s.id}
                  aria-pressed={stage === n}
                  aria-label={s.title[idx]}
                  onClick={() => setStage(n)}
                >
                  {tr(["۱", "۲", "۳"][n], String(n + 1), ["١", "٢", "٣"][n])}
                </button>
              ))}
            </div>
            <button
              className="stage-next"
              onClick={() => setStage((stage + 1) % stages.length)}
            >
              {tr("ورق بعدی", "Turn the page", "الصفحة التالية")}
            </button>
          </div>
        </div>
      </section>
      <a
        className="button"
        href={pageHref(language, "contact") + "?interest=samples"}
      >
        {tr(
          "دنبال نمونه‌ای شبیه پروژه‌تون هستید؟",
          "Looking for something similar?",
          "تدورون على أعمال مشابهة؟",
        )}
      </a>
    </div>
  );
}
