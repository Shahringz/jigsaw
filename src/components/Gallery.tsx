import { Orbit } from "./Artwork";
import { assetHref, pageHref } from "../i18n";
import { useEffect, useState } from "react";
type Props = { fa: boolean };
const pieces = [
  {
    id: "cover",
    tag: ["هویت بصری", "Identity"],
    title: ["دو دست، یک تصویر", "Two hands, one image"],
    body: [
      "دست‌های دو شخصیت دور یک قطعه به هم می‌رسند. همین لحظه را برای جلد معرفی جیگزا انتخاب کردیم.",
      "The two figures reach around a single piece. That shared gesture became the cover of our studio catalogue.",
    ],
  },
  {
    id: "print",
    tag: ["پوستر", "Poster"],
    title: ["آخرین قطعه", "The last piece"],
    body: [
      "در این اتود، بخشی از یک صورت روی قطعهٔ زرد چاپ شده. دست که قطعه را سر جایش می‌گذارد، پرتره کامل می‌شود.",
      "In this poster study, a fragment of the portrait is printed on a yellow piece. The hand completes the picture by putting it in place.",
    ],
  },
  {
    id: "motion",
    tag: ["موشن", "Motion"],
    title: ["مدار اتصال", "Orbit in motion"],
    body: [
      "برای این تجربهٔ تعاملی، رنگ‌های جلد را از کاغذ جدا کردیم. سه حلقه در عمق می‌چرخند و دور یک هسته به هم نزدیک می‌شوند.",
      "For this interactive study we lifted the cover colours off the page. Three rings turn in depth around a shared centre.",
    ],
  },
];
function Art({ id, fa }: { id: string; fa: boolean }) {
  if (id === "motion") return <Orbit />;
  return (
    <img
      loading="lazy"
      alt={
        id === "cover"
          ? fa
            ? "جلد تصویری جیگزا"
            : "Illustrated JIGSAW studio cover"
          : fa
            ? "دست و قطعهٔ زرد روی یک پرترهٔ چاپی"
            : "A hand fitting a yellow piece into a printed portrait"
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
    title: ["قاب تصویر", "The composition"],
    text: [
      "دو دست و یک فاصله. برش نزدیک نشان می‌دهد چشم چطور از دست چپ به قطعهٔ وسط و بعد به دست راست می‌رسد.",
      "Follow the cropped illustration from the left hand, across the gap, to the right hand.",
    ],
  },
  {
    id: "ink",
    title: ["رنگ‌های چاپ", "The ink colours"],
    text: [
      "زرد نقطهٔ اتصال را جلو می‌آورد. قرمز بین دو شخصیت وزن تصویر را متعادل می‌کند و زغالی به خطوط سفید وضوح می‌دهد.",
      "Yellow brings the meeting point forward. Red balances the figures and charcoal gives the white outlines their contrast.",
    ],
  },
  {
    id: "sheet",
    title: ["جلد کامل", "The finished cover"],
    text: [
      "حالا همان جزئیات را در جلد کامل ببین. فاصلهٔ تیتر و تصویر برای خوانده‌شدن در قطع عمودی در نظر گرفته شده.",
      "See those details together in the finished cover, with room between the lettering and the figures in the portrait format.",
    ],
  },
];
export function Gallery({ fa }: Props) {
  const idx = fa ? 0 : 1,
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
        <h1>{fa ? "تجربه‌های استودیو" : "Studio experiments"}</h1>
        <p>
          {fa
            ? "از جلد جیگزا تا اتود پوستر و یک تجربهٔ متحرک. هر اثر را باز کنید تا از نزدیک ببینید."
            : "Open a studio piece to explore our cover design, poster study or motion experiment."}
        </p>
      </div>
      <div
        className="filters"
        role="group"
        aria-label={fa ? "فیلتر آثار" : "Filter work"}
      >
        {[{ id: "all", tag: ["همه", "All"] }, ...pieces].map((p) => (
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
                  <Art id={p.id} fa={fa} />
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
        <h2>{fa ? "پشت صحنهٔ جلد" : "Inside the cover"}</h2>
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
            <small>{fa ? "یادداشت طراحی" : "Design notes"}</small>
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
                  {fa ? ["۱", "۲", "۳"][n] : n + 1}
                </button>
              ))}
            </div>
            <button
              className="stage-next"
              onClick={() => setStage((stage + 1) % stages.length)}
            >
              {fa ? "ورق بعدی" : "Turn the page"}
            </button>
          </div>
        </div>
      </section>
      <a
        className="button"
        href={pageHref(fa ? "fa" : "en", "contact") + "?interest=samples"}
      >
        {fa ? "درخواست نمونهٔ مرتبط" : "Ask about relevant work"}
      </a>
    </div>
  );
}
