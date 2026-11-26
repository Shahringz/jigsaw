import { displayNumber } from "../i18n";
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
  const compactNav = matchMedia("(max-width: 1279px)");
  const resetMenus = () => menus.forEach(menu => menu.open = false);
  if(compactNav.addEventListener) compactNav.addEventListener("change", resetMenus, {signal});
  else if(compactNav.addListener){compactNav.addListener(resetMenus);signal.addEventListener("abort",()=>compactNav.removeListener(resetMenus),{once:true});}
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


function initConnection(signal) {
  const page=document.querySelector("[data-connection]");
  if (!page || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const stage=page.querySelector(".connection-stage");
  const word=page.querySelector(".connection-word");
  const photo=page.querySelector(".connection-photo");
  const card=page.querySelector(".connection-card");
  const letters=[...word.querySelectorAll("span")];
  const clamp=v=>Math.max(0,Math.min(1,v));
  let raf=null;
  const update=()=>{
    raf=null;
    const r=stage.getBoundingClientRect();
    const progress=clamp((80-r.top)/Math.max(1,r.height*.58));
    const compact=innerWidth<=720;
    photo.style.setProperty("--photo-y",(-progress*(compact?12:42))+"px");
    photo.style.setProperty("--photo-r",(-5+progress*3)+"deg");
    card.style.setProperty("--card-y",(-progress*(compact?9:27))+"px");
    card.style.setProperty("--card-r",(5-progress*3)+"deg");
    const w=word.parentElement.getBoundingClientRect();
    // Each letter rises independently from beneath the two hero layers.
    // Finish within the visible scroll range, including smaller screens.
    const reveal=clamp((innerHeight*.95-w.top)/Math.max(150,Math.min(innerHeight*.48,w.height*1.45)));
    word.style.setProperty("--word-y","0px");
    letters.forEach((letter,i)=>{
      const p=clamp((reveal-i*.135)/.325);
      const ease=1-Math.pow(1-p,3);
      letter.style.setProperty("--letter-y",((1-ease)*125)+"%");
      letter.style.setProperty("--letter-opacity",String(clamp(p*5)));
    });
  };
  const queue=()=>{if(raf===null)raf=requestAnimationFrame(update);};
  if ("IntersectionObserver" in window) {
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("contact-visible");observer.unobserve(entry.target);}});
    },{threshold:.08});
    page.querySelectorAll("[data-contact-reveal]").forEach(el=>observer.observe(el));
    signal.addEventListener("abort",()=>observer.disconnect(),{once:true});
  } else page.querySelectorAll("[data-contact-reveal]").forEach(el=>el.classList.add("contact-visible"));
  page.classList.add("connection-ready");
  window.addEventListener("scroll",queue,{passive:true,signal});
  window.addEventListener("resize",queue,{signal});
  signal.addEventListener("abort",()=>{if(raf!==null)cancelAnimationFrame(raf);},{once:true});
  update();
}


function initContactQuiz(signal) {
  const dialog=document.querySelector("#connection-quiz");
  if (!dialog) return;
  const nativeDialog=typeof dialog.showModal==="function";
  if(!nativeDialog){dialog.classList.add("quiz-fallback");dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");}
  const form=dialog.querySelector("#connection-quiz-form");
  const steps=[...form.querySelectorAll("[data-quiz-step]")];
  const topics=[...form.querySelectorAll("[name=topics]")];
  const error=dialog.querySelector(".quiz-error");
  const success=dialog.querySelector(".quiz-success");
  const counter=dialog.querySelector(".quiz-counter");
  const bars=[...dialog.querySelectorAll(".quiz-progress i")];
  let step=1, opener=null;
  const isOpen=()=>dialog.hasAttribute("open");
  const refreshTopics=()=>topics.forEach(t=>t.closest("label").classList.toggle("is-selected",t.checked));
  const closeQuiz=()=>{if(nativeDialog){if(isOpen())dialog.close();}else{dialog.removeAttribute("open");document.documentElement.classList.remove("connection-quiz-open");opener?.focus?.({preventScroll:true});}};
  const get=name=>form.elements.namedItem(name);
  const normalize=value=>value.trim().replace(/[۰-۹]/g,d=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g,d=>String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  const phoneValue=()=>{
    let value=normalize(get("phone").value).replace(/[\s()-]/g,"");
    const code=get("country").value;
    if(value && !value.startsWith("+") && code && code!=="other") value=code+value.replace(/^0/,"");
    return value;
  };
  function showError(message){error.textContent=message;error.hidden=!message;}
  function showStep(n,focus=true){
    step=n;form.hidden=false;success.hidden=true;showError("");
    steps.forEach((section,i)=>section.hidden=i!==n-1);
    counter.textContent=displayNumber("0"+n+" / 03",document.documentElement.lang);
    bars.forEach((bar,i)=>bar.classList.toggle("is-active",i<n));
    dialog.setAttribute("aria-labelledby","quiz-heading-"+n);
    dialog.scrollTop=0;
    if(focus)steps[n-1].querySelector("h2").focus({preventScroll:true});
  }
  function validStep(n){
    showError("");
    if(n===1){
      if(!topics.some(t=>t.checked)){showError(dialog.dataset.topicRequired);topics[0].focus();return false;}
      return true;
    }
    if(n===2){
      for(const name of ["firstName","lastName"]){
        const field=get(name);field.value=field.value.trim();
        if(!field.reportValidity())return false;
      }
      const email=get("email"),phone=get("phone");
      email.value=email.value.trim();
      if(email.value&&!email.reportValidity())return false;
      const value=phoneValue();
      if((!email.value&&!value)||(value&&!/^\+?[0-9]{7,15}$/.test(value))){
        showError(dialog.dataset.contactRequired);(value?phone:email).focus();return false;
      }
      return true;
    }
    return get("reference").reportValidity();
  }
  function open(topic,source){
    if(topic){const option=topics.find(t=>t.value===topic);if(option)option.checked=true;}
    refreshTopics();
    if(isOpen())return;
    opener=source||document.activeElement;
    showStep(1,false);
    if(nativeDialog)dialog.showModal();else dialog.setAttribute("open","");
    document.documentElement.classList.add("connection-quiz-open");
    steps[0].querySelector("h2").focus({preventScroll:true});
  }
  document.querySelectorAll("[data-open-quiz]").forEach(link=>link.addEventListener("click",event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();open(link.dataset.openQuiz,link);
  },{signal}));
  dialog.addEventListener("click",event=>{
    const button=event.target.closest("button");
    if(!button)return;
    if(button.hasAttribute("data-quiz-close"))closeQuiz();
    else if(button.hasAttribute("data-quiz-next")&&validStep(step))showStep(Math.min(3,step+1));
    else if(button.hasAttribute("data-quiz-back"))showStep(Math.max(1,step-1));
    else if(button.hasAttribute("data-quiz-edit"))showStep(3);
  },{signal});
  dialog.addEventListener("close",()=>{
    document.documentElement.classList.remove("connection-quiz-open");
    opener?.focus?.({preventScroll:true});
  },{signal});
  signal.addEventListener("abort",()=>{
    if(isOpen())closeQuiz();
    document.documentElement.classList.remove("connection-quiz-open");
  },{once:true});
  form.addEventListener("input",()=>{showError("");refreshTopics();},{signal});
  if(!nativeDialog)document.addEventListener("keydown",event=>{if(event.key==="Escape"&&isOpen())closeQuiz();},{signal});
  form.addEventListener("submit",event=>{
    event.preventDefault();
    if(!validStep(step))return;
    if(step<3){showStep(step+1);return;}
    const topicList=topics.filter(t=>t.checked).map(t=>t.closest("label").innerText.trim());
    const label=field=>field.closest("label").firstChild.textContent.trim();
    const lines=[ "JIGSAW — Project brief",topicList.join(" / ") ];
    for(const name of ["firstName","lastName","business","email","phone","brief","reference"]){
      const field=get(name), value=name==="phone"?phoneValue():field.value.trim();
      if(value)lines.push(label(field)+" — "+value);
    }
    const blob=new Blob(["\uFEFF"+lines.join("\n\n")],{type:"text/plain;charset=utf-8"});
    const href=URL.createObjectURL(blob),link=document.createElement("a");
    link.href=href;link.download="JIGSAW-brief.txt";document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(href),1000);
    form.hidden=true;success.hidden=false;counter.textContent=displayNumber("03 / 03",document.documentElement.lang);
    dialog.setAttribute("aria-labelledby","quiz-success-heading");
    const heading=success.querySelector("h2");heading.id="quiz-success-heading";heading.focus({preventScroll:true});
    dialog.scrollTop=0;
  },{signal});
  const params=new URLSearchParams(location.search);
  const interest=params.get("interest"), legacy=params.get("service");
  const preselected=interest?topics.find(t=>t.value===interest):legacy!==null?topics.find(t=>t.dataset.legacyService===legacy&&legacy!==""):null;
  if(preselected)open(preselected.value,null);
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
  initConnection(pageListeners.signal);
  initContactQuiz(pageListeners.signal);
  expandSection(document, location.hash);
});
window.addEventListener("hashchange", () => expandSection(document, location.hash));
