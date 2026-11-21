(() => {
  const locale = document.documentElement.lang;
  const fa = locale === "fa";
  const language = document.querySelector("[data-language]");
  if (language) {
    const target = new URL(language.href);
    target.search = location.search;
    target.hash = location.hash;
    language.href = target.href;
    window.addEventListener("hashchange", () => {
      target.hash = location.hash;
      language.href = target.href;
    });
  }
  const menu = document.querySelector(".mobile");
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  function expand() {
    const section = document.getElementById(location.hash.slice(1));
    const disclosure = section?.closest("details");
    if (disclosure) disclosure.open = true;
  }
  expand();
  window.addEventListener("hashchange", expand);
  const form = document.querySelector("#enquiry");
  if (!form) return;
  const interest = form.elements.namedItem("interest");
  const params = new URLSearchParams(location.search);
  const interestId = params.get("interest"),
    previousService = params.get("service");
  const selected = [...interest.options].find((option) =>
    interestId
      ? option.value === interestId
      : previousService !== null &&
        option.dataset.legacyService === previousService,
  );
  if (selected) interest.value = selected.value;
  const download = document.querySelector("#download");
  function save(e) {
    e.preventDefault();
    const contact = form.elements.namedItem("contact");
    const value = contact.value
      .trim()
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
    const valid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
      /^\+?[0-9]{7,15}$/.test(value.replace(/[\s()-]/g, ""));
    contact.setCustomValidity(
      valid
        ? ""
        : fa
          ? "یک ایمیل یا شمارهٔ تماس معتبر وارد کنید."
          : "Enter a valid email address or phone number.",
    );
    if (!form.reportValidity()) return;
    const lines = Array.from(form.querySelectorAll("label"))
      .map((label) => {
        const field = label.querySelector("input,textarea,select");
        const answer =
          field.tagName === "SELECT"
            ? field.selectedOptions[0].text
            : field.value.trim();
        return answer ? label.firstChild.textContent + " — " + answer : "";
      })
      .filter(Boolean);
    const blob = new Blob(["\uFEFF" + lines.join("\n\n")], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "JIGSAW-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    document.querySelector("#status").textContent = fa
      ? "شرح پروژه برای دانلود آماده شد."
      : "Your project brief is ready to download.";
  }
  form.addEventListener("submit", save);
  download.addEventListener("click", save);
  form.elements
    .namedItem("contact")
    .addEventListener("input", (e) => e.target.setCustomValidity(""));
})();

(() => {
  const poster = document.querySelector(".hero .poster");
  if (!poster || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const entry = document.querySelector(".entry-space");
  let pending = false;
  const update = () => {
    pending = false;
    const rect = poster.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (80 - rect.top) / rect.height));
    poster.style.setProperty("--tilt", t * 18 + "deg");
    poster.style.setProperty("--shift", t * -16 + "px");
    if (entry) {
      const frame = entry.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (innerHeight - frame.top) / (frame.height * 0.75)),
      );
      entry.style.setProperty("--draw", String(1 - progress));
    }
  };
  const queue = () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();
})();
