import { assetHref, pageHref } from "../i18n";
export function Mark() {
  return (
    <span className="brand" dir="ltr">
      <img src={assetHref("media/mark.webp")} width="42" height="28" alt="" />
      <b>JIGSAW</b>
    </span>
  );
}
export function Cover({ fa }: { fa: boolean }) {
  return (
    <span className="cover-frame">
      <picture>
        <img
          className="cover"
          width="900"
          height="1200"
          fetchPriority="high"
          src={assetHref("media/jigsaw-600.webp")}
          srcSet={[360, 600, 900]
            .map(
              (width) =>
                assetHref("media/jigsaw-" + width + ".webp") +
                " " +
                width +
                "w",
            )
            .join(", ")}
          sizes="(max-width: 720px) min(72vw, 325px), (max-width: 1050px) 35vw, 410px"
          alt={
            fa
              ? "جلد جیگزا؛ دو شخصیت قطعه‌های زرد و قرمز پازل را کنار هم می‌گذارند. شعار جلد «هر قطعه، در جای درست» است."
              : "JIGSAW cover. Two figures assemble yellow and red puzzle pieces above the line “Every piece in its place.”"
          }
        />
      </picture>
      <span className="cover-ink" aria-hidden="true" />
      <svg
        className="joining-mark"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 150 98"
      >
        <g className="yellow-hand">
          <path
            fill="#eab41a"
            d="M5 24H27C20 1 50 -2 46 24H75V47C54 38 48 73 75 73V94H39Q5 94 5 60Z"
          />
          <path
            fill="currentColor"
            d="M20 64Q22 87 39 92Q24 81 20 64ZM34 64Q36 85 54 92Q40 81 34 64Z"
          />
        </g>
        <g className="red-hand">
          <path
            fill="#b64847"
            d="M75 24H112Q145 24 145 61V94H75V73C48 73 54 38 75 47Z"
          />
          <path
            fill="currentColor"
            d="M88 25Q101 33 106 54Q106 36 96 25ZM102 25Q117 35 121 55Q122 37 111 25Z"
          />
        </g>
      </svg>
    </span>
  );
}
export function Orbit() {
  return (
    <span className="orbit-space" aria-hidden="true">
      <span className="orb">
        <i />
        <i />
        <i />
        <b />
      </span>
    </span>
  );
}
export function Trace() {
  return (
    <svg
      className="trace"
      viewBox="0 0 600 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        pathLength="1"
        d="M-10 86 H92 Q114 86 114 108 V181 Q114 202 136 202 H220 L260 242 H339"
      />
      <path
        pathLength="1"
        d="M618 451 H480 Q459 451 459 430 V334 L369 244 H339"
      />
      <circle cx="339" cy="243" r="6" />
    </svg>
  );
}
export function ProjectEntry({ fa }: { fa: boolean }) {
  return (
    <section className="motion-entry">
      <a
        className="entry-inner wrap"
        href={pageHref(fa ? "fa" : "en", "work") + "#motion"}
      >
        <div>
          <small>{fa ? "تجربهٔ موشن جیگزا" : "JIGSAW motion study"}</small>
          <h2>{fa ? "مدار اتصال" : "Orbit in motion"}</h2>
          <span className="entry-cta">
            {fa ? "ورود به پروژه" : "Enter the project"}
          </span>
        </div>
        <div className="entry-space">
          <Trace />
          <Orbit />
        </div>
      </a>
    </section>
  );
}
