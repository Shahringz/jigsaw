import { Orbit } from "./Artwork";
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
      "دست‌های دو شخصیت دور یک قطعه به هم می‌رسند. همین لحظه را برای جلد معرفی جیگزا انتخاب کردیم.",
      "The two figures reach around a single piece. That shared gesture became the cover of our studio catalogue.",
      "تمتدّ يدا الشخصيتين حول قطعة واحدة. اخترنا تلك اللحظة لتكون غلاف كتيّب الاستوديو.",
    ],
  },
  {
    id: "print",
    tag: ["پوستر", "Poster", "ملصق"],
    title: ["آخرین قطعه", "The last piece", "القطعة الأخيرة"],
    body: [
      "در این اتود، بخشی از یک صورت روی قطعهٔ زرد چاپ شده. دست که قطعه را سر جایش می‌گذارد، پرتره کامل می‌شود.",
      "In this poster study, a fragment of the portrait is printed on a yellow piece. The hand completes the picture by putting it in place.",
      "في هذا الملصق طُبع جزء من الوجه على قطعة صفراء. حين تضعها اليد في مكانها تكتمل الصورة.",
    ],
  },
  {
    id: "motion",
    tag: ["موشن", "Motion", "حركة"],
    title: ["مدار اتصال", "Orbit in motion", "مدارات تلتقي"],
    body: [
      "برای این تجربهٔ تعاملی، رنگ‌های جلد را از کاغذ جدا کردیم. سه حلقه در عمق می‌چرخند و دور یک هسته به هم نزدیک می‌شوند.",
      "For this interactive study we lifted the cover colours off the page. Three rings turn in depth around a shared centre.",
      "أخرجنا ألوان الغلاف من الورق. في هذه التجربة التفاعلية تدور ثلاث حلقات في العمق حول مركز واحد.",
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
      "دو دست و یک فاصله. برش نزدیک نشان می‌دهد چشم چطور از دست چپ به قطعهٔ وسط و بعد به دست راست می‌رسد.",
      "Follow the cropped illustration from the left hand, across the gap, to the right hand.",
      "تابعوا الرسم من اليد اليسرى عبر الفراغ إلى اليد اليمنى. يكشف الاقتصاص كيف تنتقل العين بين العناصر.",
    ],
  },
  {
    id: "ink",
    title: ["رنگ‌های چاپ", "The ink colours", "ألوان الطباعة"],
    text: [
      "زرد نقطهٔ اتصال را جلو می‌آورد. قرمز بین دو شخصیت وزن تصویر را متعادل می‌کند و زغالی به خطوط سفید وضوح می‌دهد.",
      "Yellow brings the meeting point forward. Red balances the figures and charcoal gives the white outlines their contrast.",
      "يُبرز الأصفر نقطة الالتقاء، ويوازن الأحمر بين الشخصيتين، ويمنح الفحمي الخطوط البيضاء تباينها.",
    ],
  },
  {
    id: "sheet",
    title: ["جلد کامل", "The finished cover", "الغلاف الكامل"],
    text: [
      "حالا همان جزئیات را در جلد کامل ببین. فاصلهٔ تیتر و تصویر برای خوانده‌شدن در قطع عمودی در نظر گرفته شده.",
      "See those details together in the finished cover, with room between the lettering and the figures in the portrait format.",
      "اجمعوا التفاصيل في نظرة واحدة إلى الغلاف النهائي. تفصل مسافة مدروسة بين العنوان والرسم في هذا التكوين العمودي.",
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
          {tr(
            "از جلد جیگزا تا اتود پوستر و یک تجربهٔ متحرک. هر اثر را باز کنید تا از نزدیک ببینید.",
            "Open a studio piece to explore our cover design, poster study or motion experiment.",
            "افتحوا أحد الأعمال لإلقاء نظرة أقرب على غلاف الاستوديو أو الملصق أو تجربة الحركة.",
          )}
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
              <p className="ex-description">{p.body[idx]}</p>
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
            <p>{stages[stage].text[idx]}</p>
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
          "درخواست نمونهٔ مرتبط",
          "Ask about relevant work",
          "طلب أعمال مشابهة",
        )}
      </a>
    </div>
  );
}
