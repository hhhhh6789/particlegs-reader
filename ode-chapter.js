
const odeChapterPath = "scene/network.py";
const odeEntryLine = 633;
const odeCallbackLine = 558;
const odeSteps = [
  {line: 641, from: 640, to: 642, label: "建立时间网格"},
  {line: 643, from: 643, to: 643, label: "用 RK4 求各时刻的状态"},
  {line: 644, from: 644, to: 644, label: "取出目标时刻的状态"},
];

let odeChapter = null;

function openOdeChapter() {
  odeChapter = {step: -1, caller: null};
  jumpToSource(odeChapterPath, odeEntryLine);
  reading.scrollTop = 0;
}

function updateOdeChapter(path, line) {
  if (!odeChapter) return;
  if (path === odeChapterPath && odeChapter.caller && line >= 532 && line <= 567) return;
  if (path !== odeChapterPath || line < odeEntryLine || line > odeSteps.at(-1).to) {
    odeChapter = null;
    return;
  }
  odeChapter.caller = null;
  odeChapter.step = odeSteps.findIndex(step => step.from <= line && line <= step.to);
}

function chapterButton(parent, label, action, className = "chapter-button") {
  const button = add(parent, "button", label, className);
  button.type = "button";
  button.onclick = action;
  return button;
}

function openOdeCallback(event) {
  odeChapter.caller = {
    line: activeLine,
    readingTop: reading.scrollTop,
    codeTop: code.scrollTop,
    codeLeft: code.scrollLeft,
    pageTop: window.scrollY,
  };
  jumpToSource(odeChapterPath, odeCallbackLine);
  reading.scrollTop = 0;
  if (event.detail === 0) reading.querySelector(".ode-callback-return")?.focus({preventScroll: true});
}

function returnFromOdeCallback(event) {
  const caller = odeChapter.caller;
  jumpToSource(odeChapterPath, caller.line);
  reading.scrollTop = caller.readingTop;
  code.scrollTop = caller.codeTop;
  code.scrollLeft = caller.codeLeft;
  window.scrollTo(0, caller.pageTop);
  if (event.detail === 0) reading.querySelector(".ode-callback-link")?.focus({preventScroll: true});
}

function showOdeChapterHeader() {
  if (!odeChapter) return;
  if (odeChapter.caller) {
    const header = add(reading, "div", null, "chapter-callback");
    add(header, "p", "ODE 演化 / " + odeSteps[odeChapter.step].label, "chapter-location");
    chapterButton(header, "返回调用处 · 第 " + odeChapter.caller.line + " 行", returnFromOdeCallback, "chapter-button ode-callback-return");
    return;
  }
  if (odeChapter.step >= 0) {
    chapterButton(reading, "ODE 演化 · 章节入口", openOdeChapter, "chapter-entry-link");
    return;
  }
  const intro = add(reading, "section", null, "chapter-intro");
  add(intro, "h1", "ODE 演化");
  appendInlineCode(add(intro, "p"),
    "由起始状态 " + quoteCode("g_start") + " 出发，从 " + quoteCode("t_start")
      + " 演化到 " + quoteCode("t_end") + "，得到目标时刻的共享状态。");
  const steps = add(intro, "ol", null, "chapter-steps");
  for (const step of odeSteps) {
    chapterButton(add(steps, "li"), step.label, () => jumpToSource(odeChapterPath, step.line));
  }
}

function showOdeCallbackLink(card) {
  if (odeChapter?.step !== 1) return;
  const purpose = card.querySelector(".call-part") || card;
  chapterButton(purpose, "查看变化率网络", openOdeCallback, "chapter-button ode-callback-link");
}

function showOdeChapterFooter() {
  if (!odeChapter || odeChapter.caller || odeChapter.step < 0) return;
  const index = odeChapter.step;
  const nav = add(reading, "nav", null, "chapter-footer");
  nav.setAttribute("aria-label", "ODE 章节步骤");
  const prev = chapterButton(nav, "上一步", () => jumpToSource(odeChapterPath, odeSteps[index - 1].line), "chapter-button chapter-previous");
  prev.disabled = index === 0;
  prev.title = odeSteps[index - 1]?.label || "";
  add(nav, "span", (index + 1) + " / " + odeSteps.length + " · " + odeSteps[index].label, "chapter-progress");
  const next = chapterButton(nav, "下一步", () => jumpToSource(odeChapterPath, odeSteps[index + 1].line), "chapter-button chapter-next");
  next.disabled = index === odeSteps.length - 1;
  next.title = odeSteps[index + 1]?.label || "";
}

