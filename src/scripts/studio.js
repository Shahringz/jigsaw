function initPage(signal) {
  const locale = document.documentElement.lang;
  const fa = locale === "fa";
  const links = document.querySelectorAll("[data-language]");
  const syncLanguageLinks = () => {
    for (const link of links) {
      const target = new URL(link.href);
      target.search = location.search;
      target.hash = location.hash;
      link.href = target.href;
    }
  };
  syncLanguageLinks();
  window.addEventListener("hashchange", syncLanguageLinks, { signal });
  const menus = document.querySelectorAll("header details");
  document.addEventListener("click", (event) => {
    for (const menu of menus) {
      if (!menu.contains(event.target) || event.target.closest("a")) menu.open = false;
    }
  }, { signal });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const menu = event.target.closest("header details[open]");
    if (menu) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  }, { signal });
  const form = document.querySelector("#enquiry");
  if (!form) return;
  const interestField = form.querySelector("[data-interest]");
  const interestLabel = interestField.querySelector("#interest-label");
  const interestValue = interestField.querySelector("#interest-value");
  const picker = interestField.querySelector("details");
  const trigger = picker.querySelector("summary");
  const options = [...picker.querySelectorAll("[data-value]")];
  const interest = form.elements.namedItem("interest");
  function choose(option) {
    interest.value = option.dataset.value;
    interestValue.textContent = option.textContent.trim();
    options.forEach((item) => item.setAttribute("aria-pressed", String(item === option)));
  }
  const params = new URLSearchParams(location.search);
  const interestId = params.get("interest");
  const previousService = params.get("service");
  const selected = options.find((option) =>
    interestId
      ? option.dataset.value === interestId
      : previousService !== null && option.dataset.legacyService === previousService,
  );
  choose(selected ?? options.find((option) => option.dataset.value === interest.value));
  picker.addEventListener("click", (event) => {
    const option = event.target.closest("[data-value]");
    if (!option) return;
    choose(option);
    picker.open = false;
    trigger.focus();
  }, { signal });
  picker.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && picker.open) {
      event.stopPropagation();
      picker.open = false;
      trigger.focus();
    }
  }, { signal });
  picker.addEventListener("focusout", (event) => {
    if (!picker.contains(event.relatedTarget)) picker.open = false;
  }, { signal });
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) picker.open = false;
  }, { signal });
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
          : locale === "ar" ? "أدخل بريداً إلكترونياً أو رقم هاتف صالحاً." : "Enter a valid email address or phone number.",
    );
    if (!form.reportValidity()) return;
    const lines = Array.from(form.querySelectorAll("label, [data-interest]"))
      .map((label) => {
        if (label === interestField) {
          return interestLabel.textContent + " — " + interestValue.textContent;
        }
        const answer = label.querySelector("input, textarea").value.trim();
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
      : locale === "ar" ? "ملخّص مشروعك جاهز للتنزيل." : "Your project brief is ready to download.";
  }
  form.addEventListener("submit", save);
  download.addEventListener("click", save);
  form.elements
    .namedItem("contact")
    .addEventListener("input", (e) => e.target.setCustomValidity(""));
}

function initPoster(signal) {
  const poster = document.querySelector(".hero .poster");
  if (!poster || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const entry = document.querySelector(".entry-space");
  let frameRequest = null;
  const update = () => {
    frameRequest = null;
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
    if (frameRequest === null) frameRequest = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", queue, { passive: true, signal });
  window.addEventListener("resize", queue, { signal });
  signal.addEventListener("abort", () => {
    if (frameRequest !== null) cancelAnimationFrame(frameRequest);
  }, { once: true });
  update();
}

function expandSection(page, hash) {
  const disclosure = page.getElementById(hash.slice(1))?.closest("details");
  if (disclosure) disclosure.open = true;
}

let pageListeners;
document.addEventListener("astro:before-swap", (event) => {
  pageListeners?.abort();
  expandSection(event.newDocument, event.to.hash);
});
document.addEventListener("astro:page-load", () => {
  pageListeners?.abort();
  pageListeners = new AbortController();
  initPage(pageListeners.signal);
  initPoster(pageListeners.signal);
  expandSection(document, location.hash);
});
window.addEventListener("hashchange", () => expandSection(document, location.hash));
