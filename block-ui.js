const projectBlocks = window.PARTICLE_BLOCKS;
const executiveKinds = new Set([
  "块级分支", "嵌套块级分支", "循环", "异常处理", "上下文管理", "多路匹配",
  "匹配子分支", "独立作用域", "条件编译", "构建分支"
]);
const scopedKinds = new Set(["函数或方法定义", "类定义", "嵌套定义", "构建宏", "命名空间"]);
const conditionKinds = new Set(["if", "elif", "else if", "elseif", "while", "for", "with", "except", "catch", "match"]);
const clauseKinds = new Set([...conditionKinds, "else", "try", "finally", "case"]);
const smallBlockLimit = 24;
const auditedSpans = new WeakMap();

function blockCaption(group) {
  const [start, end, kind, title] = group;
  const explicit = activeFile.path === "scene/__init__.py" && start === 47;
  return (explicit ? "选择要加载的迭代" : kind) + " · 第 " + lineRange(start, end) + " 行"
    + (explicit || executiveKinds.has(kind) ? "" : " · " + title);
}

function statementRange(line) {
  const path = activeFile.path;
  if (!path.endsWith(".py") && Array.isArray(projectManual[path]?.[line])) return [line, line];
  const continuation = activeFile.statements?.find(([first, last]) => first <= line && line <= last);
  if (continuation) return continuation;
  const annotations = expressionIndex.files[path];
  if (annotations) {
    let spans = auditedSpans.get(annotations);
    if (!spans) {
      spans = Object.entries(annotations).map(([start, row]) => [Number(start), row.last])
        .filter(([start, end]) => end > start);
      auditedSpans.set(annotations, spans);
    }
    const statement = spans.find(([start, end]) => start <= line && end >= line);
    if (statement) return statement;
  }
  const machine = projectNotes[path]?.[line];
  if (machine) return machine.slice(0, 2);
  // Calls and containers can be recorded even in sources without a Python AST.
  const candidates = blockIndex().groups?.filter(([first, last, kind]) =>
    first <= line && line <= last && (kind === "跨行调用" || kind === "跨行容器"));
  if (candidates?.length) {
    const item = candidates.reduce((best, entry) => entry[1] - entry[0] > best[1] - best[0] ? entry : best);
    return item.slice(0, 2);
  }
  return [line, line];
}

function blockIndex() {
  return projectBlocks[activeFile.path] || {};
}

function compareBlocks(a,b) {
  return (a[1] - a[0]) - (b[1] - b[0]) || b[0] - a[0];
}

function blockPlan() {
  const groups = blockIndex().groups || [];
  const covering = groups.filter(([start, end]) => start <= activeLine && activeLine <= end && end > start);
  const current = covering.filter(([, , kind]) => executiveKinds.has(kind));
  const runnable = current.slice().sort(compareBlocks);
  const enclosingScope = covering.filter(([, , kind]) => scopedKinds.has(kind)).sort(compareBlocks)[0];
  const short = runnable.filter(([start, end]) => end - start < smallBlockLimit).at(-1);
  const useShortScope = !short && !runnable.length && enclosingScope
    && enclosingScope[1] - enclosingScope[0] < 10;
  const panel = short || (useShortScope ? enclosingScope : null);
  const outline = panel
    ? runnable.find(group => group[0] <= panel[0] && group[1] >= panel[1] && group[1] - group[0] > panel[1] - panel[0])
    : runnable[0] || enclosingScope;
  return {groups, panel, outline};
}

function showBlockOutline(group, groups) {
  const [start, end, groupKind, groupTitle, heads] = group;
  const outline = add(reading, "details", null, "block-outline");
  outline.open = executiveKinds.has(groupKind);
  const heading = add(outline, "summary");
  const caption = add(heading, "span", groupKind, "block-outline-caption");
  if (scopedKinds.has(groupKind) && groupTitle) {
    const [first, last] = statementRange(start);
    heading.dataset.sourceFirst = String(first);
    heading.dataset.sourceLast = String(last);
    caption.append(" ");
    add(caption, "code", groupTitle);
  }
  add(heading, "span", "第 " + lineRange(start, end) + " 行", "block-outline-range");
  const list = add(outline, "ul");
  const orderedHeads = (heads || []).slice().sort(([a], [b]) => a - b);
  const available = new Map(orderedHeads.map(([line, label, detail], index) =>
    [line, [label, detail, (orderedHeads[index + 1]?.[0] ?? end + 1) - 1]]));
  const nested = groups.filter(item =>
    item[0] > start && item[0] <= end && item[1] <= end &&
    (executiveKinds.has(item[2]) || scopedKinds.has(item[2])));
  let lastNestedEnd = 0;
  for (const [line, finish, kind, title] of nested) {
    if (line <= lastNestedEnd) continue;
    if (!available.has(line)) available.set(line, [kind, title, finish]);
    lastNestedEnd = finish;
  }
  if (!available.has(start)) available.set(start, [groupKind, groupTitle, orderedHeads.length ? orderedHeads[0][0] - 1 : end]);
  const entries = [...available].sort(([i],[j]) => i - j);
  if (entries.some(([, [kind]]) => clauseKinds.has(kind) && kind.length > 5)) {
    outline.classList.add("block-outline-wide-keywords");
  }
  const current = entries.findLast(([line, [, , finish]]) => line <= activeLine && activeLine <= finish)?.[0];
  for (const [line, [kind, title]] of entries) {
    const li = add(list, "li");
    const [first, last] = statementRange(line);
    li.dataset.sourceFirst = String(first);
    li.dataset.sourceLast = String(last);
    const link = add(li, "button", "第 " + line + " 行", "block-outline-jump");
    link.type = "button";
    if (line === current) link.setAttribute("aria-current", "location");
    link.onclick = () => jumpToSource(activeFile.path, line);
    const clause = clauseKinds.has(kind);
    const entry = add(li, "span", null, clause ? "block-outline-clause" : "block-outline-entry");
    add(entry, "span", kind, clause ? "block-outline-keyword" : "");
    if (title) {
      if (clause) {
        const detail = add(entry, "span");
        if (conditionKinds.has(kind)) add(detail, "code", title);
        else appendInlineCode(detail, title);
      } else {
        entry.append(" ");
        appendInlineCode(entry, title);
      }
    }
  }
}

function collectBlockStatements(group) {
  const [start, end] = group;
  const source = activeFile.text.split("\n");
  const list = [];
  for (let line = start; line <= end;) {
    const [, last] = statementRange(line);
    const stop = Math.max(line, Math.min(last, end));
    if (source[line - 1].trim() || line <= activeLine && activeLine <= stop) {
      list.push([line, stop]);
    }
    line = stop + 1;
  }
  return list;
}

function showGroupedProjectExplanation() {
  if (activeFile.path === "scene/__init__.py" && activeLine >= 47 && activeLine <= 52) {
    showLoadIterationBlock();
    return true;
  }
  const {groups, panel, outline} = blockPlan();
  if (outline) showBlockOutline(outline, groups);
  if (!panel) return false;
  const context = projectGuide.contexts[activeFile.path]?.find(([start, end]) => start <= activeLine && activeLine <= end);
  add(reading, "p", (context ? context[2] + " · " : "") + blockCaption(panel), "line-group-caption");
  const list = add(reading, "div", null, "line-notes");
  for (const [first, last] of collectBlockStatements(panel)) {
    const isActive = first <= activeLine && activeLine <= last;
    renderProjectStatement(list, first, last, isActive ? activeLine : first, isActive);
  }
  const focus = list.querySelector(".active-note");
  if (focus) {
    const view = reading.getBoundingClientRect();
    const bounds = focus.getBoundingClientRect();
    if (bounds.top > view.bottom - 75) reading.scrollTop += bounds.top - view.top - 18;
  }
  return true;
}

function showLoadIterationBlock() {
  const list = add(reading, "div", null, "line-notes");
  const card = add(list, "article", null, "line-note active-note");
  card.dataset.sourceFirst = "47";
  card.dataset.sourceLast = "52";
  const header = add(card, "div", null, "line-note-header");
  const label = add(header, "button", "第 47–52 行");
  label.setAttribute("aria-pressed", "true");
  label.onclick = () => selectLine(47, true);
  appendCodeExcerpt(card, 47, 52, true);
  showExplanationSections(card, [
    ["这段在做什么", "决定要加载哪一次保存的迭代。"],
    ["分支怎么走", section => expressionRows(section, [
      ["第 47 行", quoteCode("load_iteration") + " 为 " + quoteCode("None") + " 或 " + quoteCode("0")
        + " 时，**跳过整个代码块**。", null, "label"],
      ["第 48–49 行", "传入 " + quoteCode("-1") + " 时，在 " + quoteCode("point_cloud")
        + " 目录中查找**最大的已保存迭代编号**，并记到 " + quoteCode("self.loaded_iter") + "。", null, "label"],
      ["第 50–51 行", "传入具体编号时，**直接记录这个编号**。", null, "label"],
      ["第 52 行", "输出选中的迭代编号。", null, "label"]
    ])]
  ]);
}

function showCameraSelection(item) {
  showExplanationSections(item, [
    ["这段在做什么", "计算四组相机列表，再用结果更新 " + quoteCode("scene_info") + "。"],
    ["执行顺序", section => expressionRows(section, [
      ["1　先看跳过开关", "该组被跳过时，**保留原列表**。初始化和训练两组共用 " + quoteCode("skip_train") + "。", null, "label"],
      ["2　读上限，再选相机", quoteCode("getattr()") + " 读取该组的数量上限，缺省时取 " + quoteCode("-1")
        + "。" + quoteCode("subsample_cam_infos()") + " 接收原列表和上限，只有**上限为正且少于原数量**时才缩减列表。", null, "label"],
      ["3　更新场景记录", "四组列表都算好后，" + quoteCode("_replace()") + " 返回一份**更新了这四个字段**的 "
        + quoteCode("SceneInfo") + "，赋回 " + quoteCode("scene_info") + "。", null, "label"]
    ])]
  ]);
}

function showMixedCall(item, records, manual, audited, selected) {
  const [, , functionName, fields] = records;
  const outer = findAuditedCall(audited?.nodes, functionName);
  showCall(item, {
    purpose: manual?.purpose || outer?.purpose || "先按条件选出实参，再调用 " + quoteCode(functionName) + "。",
    detailTitle: "分支如何取值",
    details: section => expressionRows(section, fields.map(([field, , test, yes, no]) => [
      field,
      "满足 " + quoteCode(test) + " 时计算 " + quoteCode(yes) + "。其余情况取 " + quoteCode(no) + "。"
    ])),
    result: manual?.result || outer?.result
  });
  if (selected && outer) {
    if (!manual?.explainNestedInline) {
      const nodes = outer.arguments.flatMap(argument => argument[2]).flatMap(node => {
        if (node.kind !== "choice") return [node];
        return node.parts.flatMap(([role, , children]) => children.map(child => ({...child, role})));
      });
      if (hasExpressionDetails(nodes)) showExplanationSections(item, [["分支里的计算", section => showExpressions(section, nodes)]]);
    }
    if (outer.target) expressionSourceLink(item, ...outer.target, "查看定义");
  }
}

function quoteCode(text) {
  return String.fromCharCode(96) + text.replaceAll(String.fromCharCode(96), "'") + String.fromCharCode(96);
}







