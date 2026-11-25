"use strict";

const {files, revision} = window.PARTICLE_SOURCES;
const {notes} = window.PARTICLE_LESSONS;
const element = (id) => document.getElementById(id);
const byPath = new Map(files.map(file => [file.path, file]));
const code = element("code");
const reading = element("reading");
let activeFile, activeLine, rows = [], highlighted = [], statementEnds = new Map();

function add(parent, tag, text, className) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (className) node.className = className;
  parent.append(node);
  return node;
}

function explanation(path, line) {
  return (notes[path] || []).find(([first, last]) => first <= line && line <= last);
}

function sectionTitle(title, caption) {
  if (caption) add(reading, "div", caption, "eyeline");
  add(reading, "h1", title);
}

function svgElement(parent, tag, attributes = {}, text) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  if (text != null) node.textContent = text;
  parent.append(node);
  return node;
}

function drawODE(svg, stage) {
  svg.dataset.odeStage = stage;
  const axisY = 166;
  const startX = 62;
  const guide = svgElement(svg, "g", {class: "ode-axis"});
  svgElement(guide, "path", {d: "M62 41 V166 H520", fill: "none", stroke: "#a0a9b7", "stroke-width": 1.5});
  svgElement(guide, "text", {x: 49, y: 49, "text-anchor": "end"}, "g");
  svgElement(guide, "text", {x: 529, y: 168}, "t");

  const tickGroup = svgElement(svg, "g", {class: "ode-time-points"});
  const timeMarks = [];
  const statePoints = [];
  const series = svgElement(svg, "g", {class: "ode-states"});
  const curve = svgElement(series, "polyline", {fill: "none", stroke: "#7c9cd0", "stroke-width": 1.8, "stroke-linejoin": "round"});
  for (let i = 0; i < 10; i++) {
    timeMarks.push(svgElement(tickGroup, "circle", {cy: axisY, r: 3.3, fill: "#2858af"}));
    statePoints.push(svgElement(series, "circle", {r: 3.6, fill: "#2858af"}));
  }

  const timeLabels = svgElement(svg, "g", {class: "ode-time-labels"});
  const startLabel = svgElement(timeLabels, "text", {x: startX, y: 187, "text-anchor": "middle"}, "t_start");
  const endLabel = svgElement(timeLabels, "text", {y: 187, "text-anchor": "middle"}, "t_end");
  const timesLabel = svgElement(timeLabels, "text", {y: 210, "text-anchor": "middle"}, "ts");
  const bracket = svgElement(svg, "g", {class: "ode-bracket"});
  const bracketLine = svgElement(bracket, "path", {fill: "none", stroke: "#2858af", "stroke-width": 1.4});
  const bracketText = svgElement(bracket, "text", {y: 20, "text-anchor": "middle"}, "g_t");
  svgElement(series, "text", {x: startX + 7, y: 48}, "g_start");

  const returned = svgElement(svg, "g", {class: "ode-return"});
  const endpoint = svgElement(returned, "circle", {r: 5.7, fill: "#2858af", stroke: "#f1f5ff", "stroke-width": 1.2});
  const pointer = svgElement(returned, "path", {fill: "none", stroke: "#2858af", "stroke-width": 1.4});
  const valueLabel = svgElement(returned, "text", {}, "g_t[-1]");
  const x = t => startX + 442 * t / 2;
  const y = state => axisY - state * 110;

  return fraction => {
    const end = 2 * fraction;
    let state = 1;
    const dt = end / 9;
    const points = [];
    for (let i = 0; i <= 9; i++) {
      if (i > 0) {
        const k1 = -state;
        const k2 = -(state + dt * k1 / 2);
        const k3 = -(state + dt * k2 / 2);
        const k4 = -(state + dt * k3);
        state += dt * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      }
      const px = x(i * dt);
      const py = y(state);
      points.push([px, py]);
      timeMarks[i].setAttribute("cx", px);
      statePoints[i].setAttribute("cx", px);
      statePoints[i].setAttribute("cy", py);
    }
    const [endX, endY] = points.at(-1);
    const compact = endX - startX < 65;

    startLabel.textContent = end === 0 ? "t_start = t_end" : "t_start";
    endLabel.setAttribute("visibility", end === 0 ? "hidden" : "visible");
    endLabel.setAttribute("x", endX);
    endLabel.setAttribute("y", compact ? 202 : 187);
    timesLabel.setAttribute("x", (startX + endX) / 2);
    timesLabel.setAttribute("y", compact ? 217 : 210);
    curve.setAttribute("points", points.map(point => point.join(",")).join(" "));
    bracketLine.setAttribute("d", "M" + startX + " 34 V27 H" + Math.max(startX + 4, endX) + " V34");
    bracketText.setAttribute("x", (startX + endX) / 2);
    endpoint.setAttribute("cx", endX);
    endpoint.setAttribute("cy", endY);
    const direction = endX > 440 ? -1 : 1;
    const stem = endX + direction * 17;
    pointer.setAttribute("d", "M" + endX + " " + (endY - 5) + " L" + stem + " " + (endY - 20));
    valueLabel.setAttribute("x", stem + direction * 4);
    valueLabel.setAttribute("y", endY - 22);
    valueLabel.setAttribute("text-anchor", direction < 0 ? "end" : "start");
    if (end === 0) return "起止时间相同。源码会在第 638 行直接返回 g_start。";
    if (stage === "time") return "ts：从 0.00 到 " + end.toFixed(2) + " 的 10 个等距时间点。";
    if (stage === "return") return "g_t[-1]：在 t_end = " + end.toFixed(2) + " 时取得的示例状态 ≈ " + state.toFixed(3) + "。";
    return "g_t：按 ts 的顺序保存 10 个状态。最后一个示例状态 ≈ " + state.toFixed(3) + "。";
  };
}

function drawGaussians(svg) {
  svgElement(svg, "text", {x: 135, y: 29, "text-anchor": "middle"}, "原始投影");
  svgElement(svg, "text", {x: 396, y: 29, "text-anchor": "middle"}, "形变后的投影");
  const gradient = svgElement(svgElement(svg, "defs"), "radialGradient", {id: "gaussian-fade"});
  svgElement(gradient, "stop", {offset: 0, "stop-color": "#2858af", "stop-opacity": .91});
  svgElement(gradient, "stop", {offset: ".55", "stop-color": "#4275be", "stop-opacity": .48});
  svgElement(gradient, "stop", {offset: 1, "stop-color": "#4275be", "stop-opacity": 0});

  function gaussian() {
    const group = svgElement(svg, "g");
    svgElement(group, "ellipse", {rx: 66, ry: 36.96, fill: "url(#gaussian-fade)"});
    svgElement(group, "rect", {x: -3, y: -2, width: 6, height: 4, fill: "#fff"});
    return group;
  }
  gaussian().setAttribute("transform", "translate(135 112)");
  const deformed = gaussian();
  return fraction => {
    const x = 353 + 85 * fraction;
    const y = 133 - 45 * fraction;
    const angle = -0.85 * fraction * 180 / Math.PI;
    const stretch = 1 + 0.36 * fraction;
    deformed.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + angle + ") scale(" + stretch + " 1)");
    return "二维示意 · 形变 " + Math.round(fraction * 100) + "%。中心在移动，椭圆同时缩放与旋转。";
  };
}

let odeSliderValue = "70";

function vectorDiagram(parent, type) {
  const isODE = type === "ode";
  const caption = add(parent, "label", isODE ? "目标时间 t_end" : "形变程度");
  const slider = add(caption, "input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 100;
  slider.value = isODE ? odeSliderValue : 65;
  const svg = svgElement(parent, "svg", {viewBox: isODE ? "0 0 560 223" : "0 0 560 210", "aria-hidden": "true"});
  const summary = add(parent, "small");
  const stage = activeLine === 644 ? "return" : activeLine >= 640 && activeLine <= 642 ? "time" : "states";
  const redraw = isODE ? drawODE(svg, stage) : drawGaussians(svg);
  function update() {
    summary.textContent = redraw(Number(slider.value) / 100);
  }
  slider.oninput = () => {
    if (isODE) odeSliderValue = slider.value;
    update();
  };
  update();
}

const lineLessons = window.PARTICLE_LINE_LESSONS || {};

function lineGroup(path, line) {
  return (lineLessons[path] || []).find(([first, last]) => first <= line && line <= last);
}

const explanationMarkup = /\x60([^\x60]+)\x60|\*\*((?:\x60[^\x60]+\x60|[^*\x60\n]|\*(?!\*))+)\*\*/g;
const emphasisFacts = [
  /(?:包括|包含|保留)(?:起点和终点|两个端点|原有形状|批次轴|高斯轴)/,
  /(?:共享原存储|共用同一份数据|就地修改|停止跟踪梯度|切断梯度|不会回传梯度|不记录梯度)/,
  /(?:非线性变换|保持形状不变|形状保持不变|保持维数不变|去掉批次轴|保留最后一维)/,
  /(?:[BNGHK0-9]+(?:\s*×\s*[A-Za-z_0-9]+)+)/,
  /(?:条件成立才|只计算被选中的分支|跳过整个代码块|选择最大的迭代编号|保留原列表)/,
];

function appendInlineCode(parent, text) {
  const inNote = Boolean(parent.closest(".line-note"));
  const formatted = [...text.matchAll(explanationMarkup)];
  const emphasize = inNote && !formatted.some(match => match[2]);
  let emphasized = false;
  const unquotedCode = /\b(?:[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+|[A-Za-z]\w*_[A-Za-z_0-9]+|_[A-Za-z]\w*)(?:\[-?\d+\]|\(\))?(?![\w.])/g;

  function plain(target, part) {
    let offset = 0;
    for (const match of part.matchAll(unquotedCode)) {
      target.append(part.slice(offset, match.index));
      add(target, "code", match[0]);
      offset = match.index + match[0].length;
    }
    target.append(part.slice(offset));
  }

  function textPart(target, part, allowEmphasis) {
    if (allowEmphasis && emphasize && !emphasized) {
      const match = emphasisFacts.map(pattern => pattern.exec(part)).find(Boolean);
      if (match) {
        plain(target, part.slice(0, match.index));
        plain(add(target, "strong", null, "explanation-keyword"), match[0]);
        plain(target, part.slice(match.index + match[0].length));
        emphasized = true;
        return;
      }
    }
    plain(target, part);
  }

  function format(target, input, allowEmphasis) {
    let offset = 0;
    for (const match of input.matchAll(explanationMarkup)) {
      textPart(target, input.slice(offset, match.index), allowEmphasis);
      if (match[1]) add(target, "code", match[1]);
      else if (inNote) format(add(target, "strong", null, "explanation-keyword"), match[2], false);
      else format(target, match[2], false);
      offset = match.index + match[0].length;
    }
    textPart(target, input.slice(offset), allowEmphasis);
  }

  const lines = [];
  if (inNote && text.length > 76 && parent.matches("p, dd")) {
    const protectedRanges = formatted.map(match => [match.index, match.index + match[0].length]);
    let offset = 0;
    for (const {index} of text.matchAll(/[。！？]/g)) {
      if (protectedRanges.some(([start, end]) => start <= index && index < end)) continue;
      lines.push(text.slice(offset, index + 1));
      offset = index + 1;
    }
    if (offset < text.length) lines.push(text.slice(offset));
  }
  if (lines.length > 1) {
    for (const line of lines) format(add(parent, "span", null, "explanation-line"), line, true);
  } else {
    format(parent, text, true);
  }
}

function showParameters(parent, parameters) {
  const definitions = add(parent, "dl");
  for (const [name, meaning, labelType] of parameters) {
    const entry = add(definitions, "div", null, "parameter-row");
    const term = add(entry, "dt");
    if (labelType === "label") add(term, "strong", name, "explanation-label");
    else add(term, "code", name);
    appendInlineCode(add(entry, "dd"), meaning);
  }
}

function showCall(item, call) {
  showExplanationSections(item, [
    ["作用", call.purpose],
    [call.detailTitle, call.details],
    ["结果", call.result]
  ].filter(([label, content]) => label && content));
}

function showExplanationSections(item, parts) {
  const details = add(item, "div", null, "call-details");
  for (const [label, content] of parts) {
    const section = add(details, "section", null, "call-part");
    add(section, "h2", label);
    if (typeof content === "function") content(section);
    else appendInlineCode(add(section, "p"), content);
  }
}

function lineRange(first, last) { return first === last ? String(first) : first + "–" + last; }

function showLineGroup(group) {
  const [first, , title, items] = group;
  if (items.length > 1) add(reading, "p", title, "line-group-caption");
  const list = add(reading, "div", null, "line-notes");
  for (const [line, , body, parameters, call] of items) {
    const last = statementEnds.get(line) || line;
    const isActive = line <= activeLine && activeLine <= last;
    const item = add(list, "article", null, isActive ? "line-note active-note" : "line-note");
    item.dataset.sourceFirst = String(line);
    item.dataset.sourceLast = String(last);
    item.addEventListener("click", event => {
      if (isActive || event.target.closest("button") || window.getSelection()?.toString()) return;
      selectLine(line, true);
    });
    const header = add(item, "div", null, "line-note-header");
    const button = add(header, "button", "第 " + lineRange(line, last) + " 行");
    button.setAttribute("aria-pressed", String(isActive));
    button.onclick = () => selectLine(line, true);
    const excerpt = appendCodeExcerpt(item, line, last);
    excerpt.setAttribute("aria-label", "本行代码");
    const paragraph = body ? add(item, "p") : null;
    if (paragraph) appendInlineCode(paragraph, body);
    if (parameters) showParameters(item, parameters);
    const audited = expressionIndex.files[activeFile.path]?.[line];
    if (audited?.definition) showAuditedDefinition(item, audited.definition);
    else if (call && audited?.outer) showExpressionCall(item, audited.nodes[0], true, call);
    else if (call) showCall(item, call);
    if (isActive && line === 643) showOdeCallbackLink(item);
  }
  if (first === 643 || first === 640) {
    const diagram = add(reading, "div", null, "diagram");
    diagram.dataset.visualization = "ode-integration";
    vectorDiagram(diagram, "ode");
    add(diagram, "small", "示意用 dg/dt = −g。实际源码由 ODEFunc 预测变化率。");
  }
}


function showExplanation() {
  hideNameTip();
  const visibleDiagrams = visibleVisualizations();
  reading.replaceChildren();
  reading.scrollTop = 0;
  if (activeFile.text == null) {
    sectionTitle(activeFile.kind, activeFile.path);
    add(reading, "p", "此条目记录在项目文件清单中，体积 " + activeFile.bytes.toLocaleString() + " 字节。");
    return;
  }
  showOdeChapterHeader();
  const group = lineGroup(activeFile.path, activeLine);
  if (group) showLineGroup(group);
  else showProjectExplanation();
  appendDecoderDiagram(activeFile.path, activeLine);
  appendRenderDiagram(activeFile.path, activeLine);
  appendCoreVisualization(activeFile.path, activeLine);
  showFileFlow(activeFile.path, activeLine);
  showOdeChapterFooter();
  addExplanationTerms(reading, activeFile, activeLine);
  restoreVisibleVisualization(visibleDiagrams);
}

function jumpToSource(path, line) {
  if (activeFile?.path === path) {
    code.scrollLeft = 0;
    selectLine(line, true);
  } else {
    loadFile(path, line);
  }
  const heading = reading.querySelector(".active-note .line-note-header");
  if (!heading) return;
  const viewport = reading.getBoundingClientRect();
  const rowTop = heading.getBoundingClientRect().top;
  reading.scrollTop += rowTop - viewport.top - 18;
  const position = heading.getBoundingClientRect();
  if (position.top < 0 || position.bottom > window.innerHeight) {
    heading.scrollIntoView({block: "center", inline: "nearest"});
  }
}

function selectLine(line, scroll) {
  if (!rows.length) return;
  const current = rows[Math.min(rows.length, Math.max(1, Math.trunc(line))) - 1];
  activeLine = Number(current.dataset.line);
  updateOdeChapter(activeFile.path, activeLine);
  topic = odeChapter ? "ode" : topicFor(activeFile.path, activeLine);
  updateTopics();
  highlighted.forEach(row => row.classList.remove("selected", "current"));
  highlighted = [];
  const [start, end] = lineGroup(activeFile.path, activeLine) || statementRange(activeLine);
  for (let i = start; i <= end && i <= rows.length; i++) {
    rows[i - 1].classList.add("selected");
    highlighted.push(rows[i - 1]);
  }
  current.classList.add("current");
  if (scroll) code.scrollTop += current.getBoundingClientRect().top - code.getBoundingClientRect().top - code.clientHeight * 0.27;
  element("line").value = activeLine;
  showExplanation();
}

function highlightPython(span, line, ranges = []) {
  const token = /#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:class|def|if|elif|else|for|while|return|from|import|as|in|not|and|or|with|try|except|continue|pass|raise|assert|True|False|None)\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g;
  let cursor = 0;
  for (const match of line.matchAll(token)) {
    span.append(line.slice(cursor, match.index));
    const value = match[0];
    const style = value.startsWith("#") ? "comment" : /^["'\d]/.test(value) ? "lit" : "kw";
    const end = match.index + value.length;
    const embedded = style === "lit" ? ranges.filter(([first, last]) => match.index <= first && last <= end) : [];
    if (embedded.length) {
      let start = match.index;
      for (const [first, last] of embedded) {
        if (start < first) add(span, "span", line.slice(start, first), "lit");
        add(span, "span", line.slice(first, last), "interpolation-name");
        start = last;
      }
      if (start < end) add(span, "span", line.slice(start, end), "lit");
    } else add(span, "span", value, style);
    cursor = match.index + value.length;
  }
  span.append(line.slice(cursor));
}

function loadFile(path, line = 1) {
  activeFile = byPath.get(path);
  statementEnds = new Map(activeFile.statements || []);
  rows = []; highlighted = [];
  code.replaceChildren();
  code.scrollTop = 0;
  code.scrollLeft = 0;
  element("path").textContent = path;
  document.querySelectorAll("#tree [data-path]").forEach(button => {
    const active = button.dataset.path === path;
    button.setAttribute("aria-current", String(active));
    if (active) {
      for (let details = button.closest("details"); details; details = details.parentElement.closest("details")) details.open = true;
    }
  });

  element("jump").hidden = activeFile.text == null;
  if (activeFile.text == null) {
    element("status").textContent = activeFile.kind;
    add(code, "div", "此条目仅提供文件信息。", "binary");
    showExplanation();
    return;
  }
  const sourceLines = activeFile.text.split("\n");
  const detailed = Boolean(lineLessons[path] || projectManual[path]);
  const semantic = Boolean(projectNotes[path] && Object.keys(projectNotes[path]).length);
  const status = detailed ? "含重点代码讲解" : semantic ? "含自动语句说明" : "文件与结构说明";
  element("status").textContent = sourceLines.length + " 行 · " + status;
  element("line").max = sourceLines.length;
  const fragment = document.createDocumentFragment();
  rows = sourceLines.map((text, index) => {
    const row = add(fragment, "div", null, "row");
    const number = index + 1;
    row.dataset.line = number;
    if (projectManual[path]?.[number] || lineGroup(path, number)) row.classList.add("has-note");
    add(row, "span", number, "num");
    const span = add(row, "span", null, "src");
    if (path.endsWith(".py")) highlightPython(span, text);
    else span.textContent = text;
    return row;
  });
  code.append(fragment);
  selectLine(line, true);
}

function fileButton(parent, path, title) {
  const button = add(parent, "button", null);
  if (lineLessons[path] || projectManual[path]) add(button, "span", "●", "annotated").setAttribute("aria-label", "含重点讲解");
  button.append(title);
  button.dataset.path = path;
  button.setAttribute("aria-current", String(activeFile?.path === path));
  button.onclick = () => {
    odeChapter = null;
    loadFile(path, notes[path]?.[0][0] || 1);
  };
}

const tree = element("tree");
const hierarchy = {dirs: new Map(), leaves: []};
for (const {path} of files) {
  const parts = path.split("/");
  const name = parts.pop();
  let branch = hierarchy;
  for (const part of parts) {
    if (!branch.dirs.has(part)) branch.dirs.set(part, {dirs: new Map(), leaves: []});
    branch = branch.dirs.get(part);
  }
  branch.leaves.push({name, path});
}
function drawTree(parent, node) {
  node.leaves.forEach(({name, path}) => fileButton(parent, path, name));
  for (const [name, sub] of node.dirs) {
    const details = add(parent, "details");
    add(details, "summary", name + "/");
    details.addEventListener("toggle", () => {
      if (details.open && details.childElementCount === 1) drawTree(details, sub);
    });
    if (name === "scene" || name === "gaussian_renderer") {
      drawTree(details, sub);
      details.open = true;
    }
  }
}
function filterFiles() {
  const value = element("filter").value.trim().toLowerCase().replaceAll("\\", "/");
  tree.replaceChildren();
  if (!value) return drawTree(tree, hierarchy);
  let count = 0;
  for (const {path} of files) {
    if (!path.toLowerCase().includes(value)) continue;
    if (++count <= 200) fileButton(tree, path, path);
  }
  if (!count) add(tree, "p", "没有匹配文件。");
  if (count > 200) add(tree, "p", "共 " + count + " 项。请缩小搜索范围。");
}

function initializePaneSplitter() {
  const splitter = element("reader-splitter");
  if (!splitter) return;
  const panes = splitter.parentElement;
  const lessonPane = element("lesson-pane");
  const sourcePane = element("source-pane");
  const swap = element("swap-panes");
  const storageKey = "particlegs-lesson-width";
  const orderKey = "particlegs-source-first";
  const min = Number(splitter.getAttribute("aria-valuemin"));
  const max = Number(splitter.getAttribute("aria-valuemax"));
  let share = null;
  let drag = null;
  let sourceFirst = false;

  function defaultShare() {
    return Number.parseFloat(getComputedStyle(panes).getPropertyValue("--lesson-default")) || 44;
  }

  function updateValue() {
    const value = Math.round(share ?? defaultShare());
    splitter.setAttribute("aria-valuenow", String(value));
    splitter.setAttribute("aria-valuetext", "讲解区 " + value + "%，源码区 " + (100 - value) + "%");
  }

  function setShare(value) {
    share = value === null ? null : Math.min(max, Math.max(min, value));
    if (share === null) {
      panes.style.removeProperty("--lesson-width");
      panes.style.removeProperty("--source-width");
    } else {
      panes.style.setProperty("--lesson-width", share + "fr");
      panes.style.setProperty("--source-width", (100 - share) + "fr");
    }
    updateValue();
  }

  function saveShare() {
    try {
      if (share === null) localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, String(share));
    } catch {
      // Resizing also works in browsers that block storage on local files.
    }
  }

  function setPaneOrder(value) {
    sourceFirst = value;
    const scrollTop = code.scrollTop;
    const scrollLeft = code.scrollLeft;
    const noteTop = reading.scrollTop;
    panes.classList.toggle("source-first", value);
    panes.insertBefore(value ? sourcePane : lessonPane, splitter);
    panes.append(value ? lessonPane : sourcePane);
    code.scrollTop = scrollTop;
    code.scrollLeft = scrollLeft;
    reading.scrollTop = noteTop;
    swap.setAttribute("aria-pressed", String(value));
    swap.title = value ? "当前代码在左，点击恢复讲解在左" : "当前讲解在左，点击将代码放到左侧";
    hideNameTip();
  }

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null && Number.isFinite(Number(saved))) setShare(Number(saved));
    if (localStorage.getItem(orderKey) === "true") setPaneOrder(true);
  } catch {
    // The CSS default is used when this page cannot access storage.
  }
  swap.addEventListener("click", () => {
    setPaneOrder(!sourceFirst);
    try {
      localStorage.setItem(orderKey, String(sourceFirst));
    } catch {
      // The order can still be changed when storage is unavailable.
    }
  });
  updateValue();
  window.addEventListener("resize", updateValue);

  splitter.addEventListener("pointerdown", event => {
    if (event.button !== 0 || drag) return;
    event.preventDefault();
    hideNameTip();
    splitter.focus({preventScroll: true});
    splitter.setPointerCapture(event.pointerId);
    drag = {id: event.pointerId, x: event.clientX, start: share ?? defaultShare(), original: share};
    document.body.classList.add("reader-resizing");
  });
  splitter.addEventListener("pointermove", event => {
    if (event.pointerId !== drag?.id) return;
    const width = panes.clientWidth - splitter.offsetWidth;
    if (width > 0 && (event.clientX !== drag.x || share !== drag.original)) {
      const direction = sourceFirst ? -1 : 1;
      setShare(drag.start + direction * 100 * (event.clientX - drag.x) / width);
    }
  });
  splitter.addEventListener("lostpointercapture", event => {
    if (event.pointerId !== drag?.id) return;
    if (share !== drag.original) saveShare();
    drag = null;
    document.body.classList.remove("reader-resizing");
  });
  splitter.addEventListener("dblclick", () => {
    setShare(null);
    saveShare();
  });
  splitter.addEventListener("keydown", event => {
    const key = event.key;
    if (!["ArrowLeft", "ArrowRight", "Home", "End", "Enter"].includes(key)) return;
    event.preventDefault();
    const leftShare = sourceFirst ? 100 - (share ?? defaultShare()) : share ?? defaultShare();
    let next = null;
    if (key === "Home") next = min;
    if (key === "End") next = max;
    if (key === "ArrowLeft") next = leftShare - 2;
    if (key === "ArrowRight") next = leftShare + 2;
    setShare(sourceFirst && next !== null ? 100 - next : next);
    saveShare();
  });
}
for (const [id, label, path, line] of projectGuide.topics) {
  const button = add(element("examples"), "button", label);
  button.dataset.topic = id;
  button.onclick = () => {
    if (id === "ode") {
      openOdeChapter();
      return;
    }
    odeChapter = null;
    jumpToSource(path, line);
    topic = id;
    updateTopics();
    if (id === "overview") {
      hideNameTip();
      reading.replaceChildren();
      reading.scrollTop = 0;
      showOverview();
    }
  };
}
element("coverage").textContent = files.filter(file => file.text != null).length + " 个文本文件可浏览";
element("coverage").title = "源码提交 " + revision;
element("toggle").onclick = () => {
  const hidden = element("bench").classList.toggle("closed");
  element("toggle").textContent = hidden ? "展开文件" : "收起文件";
  element("toggle").setAttribute("aria-expanded", String(!hidden));
};
element("filter").oninput = filterFiles;
element("jump").onsubmit = event => {
  event.preventDefault();
  jumpToSource(activeFile.path, Number(element("line").value) || 1);
};
code.onclick = event => {
  const line = event.target.closest("[data-line]");
  if (line && !window.getSelection()?.toString()) selectLine(Number(line.dataset.line), false);
};
code.onkeydown = event => {
  if (!["ArrowUp", "ArrowDown"].includes(event.key) || !rows.length) return;
  event.preventDefault();
  selectLine(activeLine + (event.key === "ArrowUp" ? -1 : 1), true);
};
filterFiles();
initializePaneSplitter();
initializeVisualizations();
element("examples").querySelector("button").click();


















