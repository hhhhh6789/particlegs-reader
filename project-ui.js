const projectGuide = window.PARTICLE_GUIDE;
const projectNotes = window.PARTICLE_PROJECT_NOTES;
const projectManual = window.PARTICLE_MANUAL;
const parameterIndex = window.PARTICLE_PARAMETERS;
const excerptLineOffsets = new WeakMap();
let topic = "overview";

function topicFor(path, line) {
  if (path === "scene/network.py") {
    if (line < 522 || (line >= 622 && line <= 632)) return "encoder";
    if (line >= 571 && line <= 606 || line >= 646 && line <= 651) return "decoder";
    return "ode";
  }
  if (path.startsWith("gaussian_renderer/") || path === "scene/deform_model.py" || path === "utils/rigid_utils.py") return "decoder";
  if (["train.py", "render.py", "metrics.py"].includes(path) || path.startsWith("scripts/") || path.startsWith("arguments/")) return "training";
  if (path.startsWith("scene/") || path === "utils/camera_utils.py") return "overview";
  return null;
}

function appendCodeExcerpt(parent, first, last, keepLayout = false) {
  const physical = activeFile.text.split("\n").slice(first - 1, last);
  const comments = activeFile.comments || [];
  keepLayout ||= first < last && comments.some(line => first <= line && line < last);
  const indents = physical.filter(line => line.trim()).map(line => line.length - line.trimStart().length);
  const leading = indents.length ? Math.min(...indents) : 0;
  const excerpt = add(parent, "pre", null, keepLayout ? "line-excerpt structured-excerpt" : "line-excerpt");
  if (activeFile.path.endsWith(".py")) {
    const ranges = [];
    const offsets = [];
    let length = 0;
    const parts = physical.map((line, index) => {
      offsets.push(length);
      const removed = keepLayout ? leading : line.length - line.trimStart().length;
      for (const [start, end] of activeFile.interpolations?.[first + index] || []) {
        ranges.push([length + start - removed, length + end - removed]);
      }
      const text = keepLayout ? line.slice(leading) : line.trim();
      length += text.length + 1;
      return text;
    });
    highlightPython(excerpt, parts.join(keepLayout ? "\n" : " ") || "（空行）", ranges);
    if (first < last) excerptLineOffsets.set(excerpt, offsets);
  } else {
    const text = physical.map(line => keepLayout ? line.slice(leading) : line.trim());
    excerpt.textContent = text.join(keepLayout ? "\n" : " ") || "（空行）";
  }
  return excerpt;
}

function showOverview() {
  sectionTitle("从视频到未来画面");
  const map = add(reading, "div", null, "method-map overview-links");
  const sections = [
    ["准备输入", projectGuide.overview.slice(0, 2)],
    ["预测并渲染", projectGuide.overview.slice(2, 5)],
    ["训练与外推", projectGuide.overview.slice(5)],
  ];
  for (const [label, nodes] of sections) {
    const section = add(map, "section", null, "method-map-band");
    add(section, "h2", label);
    const links = add(section, "ul", null, "method-map-links");
    for (const [path, line, title, description] of nodes) {
      const node = add(links, "li");
      const button = add(node, "button", null, "method-map-node");
      add(button, "strong", title);
      appendInlineCode(add(button, "span"), description);
      button.onclick = () => {
        if (path === odeChapterPath && line === odeEntryLine) openOdeChapter();
        else jumpToSource(path, line);
      };
    }
  }
}

const fileFlows = {
  "scene/__init__.py": [
    ["场景初始化", [
      [47, 39, 58, "确定加载迭代"],
      [59, 59, 94, "读取场景数据"],
      [101, 95, 125, "准备相机列表"],
      [126, 126, 133, "加载或初始化高斯"],
    ]],
  ],
  "scene/cameras.py": [
    ["初始化相机", [
      [25, 19, 30, "记录位姿和视场"],
      [38, 31, 46, "准备图像和时间"],
      [47, 47, 55, "计算焦距"],
      [56, 56, 64, "计算相机矩阵"],
    ]],
  ],
  "scene/dataset_readers.py": [
    ["从 JSON 读取相机", [
      [252, 244, 257, "读取并选取帧"],
      [264, 258, 267, "转换相机位姿"],
      [280, 268, 283, "合成图像背景"],
      [288, 284, 292, "整理相机记录"],
    ]],
  ],
  "scene/gaussian_model.py": [
    ["从点云初始化高斯", [
      [94, 92, 101, "准备中心和颜色"],
      [102, 102, 107, "初始化尺度和旋转"],
      [108, 108, 109, "初始化不透明度"],
      [110, 110, 117, "注册可训练参数"],
    ]],
    ["增密与剪枝", [
      [377, 376, 380, "计算平均梯度"],
      [381, 381, 381, "复制高斯"],
      [382, 382, 383, "拆分高斯"],
      [389, 384, 391, "删除不合格高斯"],
    ]],
  ],
  "scene/network.py": [
    ["动力学编码", [
      [473, 464, 474, "编码每个高斯"],
      [478, 475, 484, "获取邻域"],
      [490, 485, 498, "生成或复用共享状态"],
      [499, 499, 499, "返回两类特征"],
    ]],
    ["计算状态变化率", [
      [560, 558, 563, "构造时间输入"],
      [564, 564, 564, "拼接状态和时间"],
      [565, 565, 565, "计算中间向量"],
      [566, 566, 567, "得到变化率"],
    ]],
    ["解码形变参数", [
      [649, 646, 650, "融合两类特征"],
      [598, 597, 598, "转换逐点特征"],
      [599, 599, 603, "预测形变参数"],
      [604, 604, 604, "返回形变参数"],
    ]],
    ["ODE 积分", [
      [637, 633, 638, "检查起止时间"],
      [641, 639, 642, "建立时间网格"],
      [643, 643, 643, "用 RK4 求各时刻的状态"],
      [644, 644, 644, "取出目标时刻的状态"],
    ]],
    ["网络前向计算", [
      [655, 652, 657, "编码高斯"],
      [659, 658, 660, "演化共享状态"],
      [662, 661, 664, "解码形变参数"],
    ]],
  ],
  "scene/deform_model.py": [
    ["生成高斯形变", [
      [44, 43, 54, "预测参数"],
      [23, 21, 25, "角度与归一化"],
      [27, 26, 27, "刚体变换"],
      [28, 28, 29, "中心位移"],
      [41, 30, 41, "返回形变"],
    ]],
  ],
  "gaussian_renderer/__init__.py": [
    ["渲染一帧图像", [
      [49, 31, 66, "配置光栅化"],
      [67, 67, 94, "形变与筛选"],
      [100, 95, 114, "准备颜色"],
      [116, 115, 125, "光栅化成图像"],
      [137, 126, 142, "返回渲染结果"],
    ]],
  ],
  "train.py": [
    ["一次训练迭代", [
      [212, 190, 217, "取图和时间"],
      [230, 218, 239, "准备或预测形变"],
      [240, 240, 249, "渲染预测图"],
      [252, 250, 262, "计算损失和梯度"],
      [380, 375, 388, "更新参数"],
    ]],
  ],
  "metrics.py": [
    ["评估渲染结果", [
      [64, 45, 73, "选择场景和结果"],
      [77, 74, 82, "读取预测图与真值"],
      [88, 83, 100, "计算图像指标"],
      [111, 101, 116, "汇总并保存"],
    ]],
  ],
  "render.py": [
    ["渲染与评估", [
      [241, 216, 247, "加载模型参数"],
      [249, 248, 267, "选择评估视角"],
      [146, 143, 148, "读取视角时间"],
      [149, 149, 154, "预测形变"],
      [155, 155, 174, "渲染、评价和保存"],
    ]],
  ],
};

function fileNavigation(path, title) {
  const panel = add(reading, "nav", null, "diagram file-navigation");
  panel.setAttribute("aria-label", title);
  const caption = add(panel, "small", null, "file-flow-caption");
  caption.append("本文件 · ");
  add(caption, "code", path.split("/").at(-1));
  return {panel, caption};
}

function showFileOutline(path, line) {
  const symbols = activeFile.symbols;
  const {panel, caption} = fileNavigation(path, "本文件定位");
  caption.append(" · 定位代码");
  const picker = add(panel, "select", null, "file-outline-picker");
  picker.setAttribute("aria-label", "跳转到本文件的代码位置");
  const current = symbols.findLast(([first, last]) => first <= line && line <= last);
  if (!current && line !== 1) {
    const prompt = add(picker, "option", "选择本文件中的位置");
    prompt.disabled = true;
    prompt.selected = true;
  }
  if (symbols[0]?.[0] !== 1) {
    const start = add(picker, "option", "第 1 行 · 文件开头");
    start.value = "1";
    start.selected = line === 1;
  }
  for (const [first, , name, kind] of symbols) {
    const option = add(picker, "option", "第 " + first + " 行 · " + kind + " " + name);
    option.value = String(first);
    option.selected = current?.[0] === first;
  }
  picker.onchange = () => jumpToSource(path, Number(picker.value));
}

function showFileFlow(path, line) {
  if (!path.endsWith(".py") || odeChapter) return;

  const flow = fileFlows[path]?.find(([, steps]) =>
    steps.some(([, from, to]) => from <= line && line <= to));
  if (!flow) {
    showFileOutline(path, line);
    return;
  }

  const [title, steps] = flow;
  const {panel, caption} = fileNavigation(path, "本文件流程 · " + title);
  caption.append(" · " + title);

  const list = add(panel, "ol", null, "ode-flow shape-flow");
  for (const [target, from, to, label] of steps) {
    const button = add(add(list, "li"), "button", label);
    button.type = "button";
    button.setAttribute("aria-pressed", String(from <= line && line <= to));
    button.title = "第 " + target + " 行";
    button.onclick = () => jumpToSource(path, target);
  }
  const current = list.querySelector("button[aria-pressed=true]");
  const overflow = current.getBoundingClientRect().right - list.getBoundingClientRect().right;
  if (overflow > 0) list.scrollLeft = overflow + 4;
}

function plainSourceNote(path, text) {
  const line = text.trim();
  if (!line) return "";
  if (/^(?:\/\/|\/\*|\*\s|#(?:\s|$)|<!--)/.test(line)) return "这里是源码注释。";
  if (path.endsWith(".py")) {
    if (/^else\s*:/.test(line)) return "前面的条件都未满足时，执行这个分支。";
    if (/^finally\s*:/.test(line)) return "离开 **try 块**时执行这里的收尾代码。";
    if (/^@/.test(line)) return "把 " + quoteCode(line) + " 应用到下一条函数或类定义。";
    if (/^[)\]}]+[,;]?$/.test(line)) return "闭合上方的语句。";
    return "";
  }
  const include = line.match(/^#\s*include\s+([<"].*?[>"])/);
  if (include) return "引入头文件 " + quoteCode(include[1]) + " 中声明的接口或类型。";
  const macro = line.match(/^#\s*define\s+([A-Za-z_]\w*)/);
  if (macro) return "定义编译时使用的宏 " + quoteCode(macro[1]) + "。";
  if (/^#\s*(?:if|ifdef|ifndef|endif|elif|else)\b/.test(line)) return "这条指令控制哪些代码**参与编译**。";
  const outcome = line.match(/^(return|throw)\s+(.{1,70}?);?$/);
  if (outcome) return (outcome[1] === "return" ? "返回 " : "抛出 ") + quoteCode(outcome[2]) + "。";
  if (/^(?:else\s+)?if\s*\(/.test(line)) return "括号内的条件成立时，执行对应分支。";
  if (/^while\s*\(/.test(line)) return "只要条件成立，就继续执行循环体。";
  if (/^for\s*\(/.test(line)) return "按括号中声明的循环规则执行循环体。";
  const config = line.match(/^([\w.-]+)\s*:.*$/);
  if (config && /\.(?:yaml|yml)$/.test(path)) return "为配置项 " + quoteCode(config[1]) + " 指定值。";
  if (/\.html?$/.test(path)) {
    const tag = line.match(/^<(\/?)([A-Za-z][\w-]*)\b/);
    if (tag) return (tag[1] ? "结束 " : "写入 ") + quoteCode(tag[2]) + " 元素。";
  }
  if (/\.css$/.test(path)) {
    const property = line.match(/^([\w-]+)\s*:\s*[^;]+;/);
    if (property) return "设置样式属性 " + quoteCode(property[1]) + "。";
  }
  return "";
}

function visibleParameterRecords(path, active, first, last) {
  const records = parameterIndex.files[path] || [];
  return records.filter(([start, end]) => (start >= first && start <= last) || (start <= active && end >= active));
}

function parameterNames(label) {
  return label.split(/\s+\/\s+/).map(fragment =>
    fragment.split(" ← ")[0].trim().replace(/^(\*+)?([A-Za-z_]\w*)\s*:\s.*$/, "$1$2")
  );
}

function renderProjectStatement(list, first, last, line, selected) {
  const {path, text} = activeFile;
  const machine = projectNotes[path]?.[line];
  const manual = projectManual[path]?.[first];
  const structures = blockIndex();
  const mixed = structures.mixed?.[first];
  const cameraSelection = path === "scene/__init__.py" && first === 101;
  const headerNote = structures.headers?.[first];
  const inlineBranch = structures.inline?.[first];
  const comprehension = structures.comprehensions?.[first];
  const directCalls = structures.calls?.[first];
  const structuredCalls = mixed ? [] : collectionCases(path, first, last);
  const audited = expressionIndex.files[path]?.[first];
  const [, , body, call, kind] = machine || [];
  const item = add(list, "article", null, selected ? "line-note active-note" : "line-note");
  item.dataset.sourceFirst = String(first);
  item.dataset.sourceLast = String(last);
  const header = add(item, "div", null, "line-note-header");
  const target = add(header, "button", "第 " + lineRange(first, last) + " 行");
  target.setAttribute("aria-pressed", String(selected));
  target.onclick = () => selectLine(first, true);
  item.onclick = event => {
    if (selected || event.target.closest("button, summary, details") || window.getSelection()?.toString()) return;
    selectLine(first, true);
  };
  appendCodeExcerpt(item, first, last, Boolean((cameraSelection || mixed || structuredCalls.length) && last - first >= 3));
  const focusedNote = audited?.conditionNote || audited?.valueNote;
  if (focusedNote) {
    showExplanationSections(item, [["这行在做什么", focusedNote]]);
    const target = audited.outer && audited.nodes[0]?.target;
    if (target) expressionSourceLink(item, ...target, "查看定义");
    return;
  }
  if (audited?.collectionNote) {
    showCollectionOverview(item, audited.collectionNote);
    return;
  }
  if (audited?.builtinNote) {
    showExplanationSections(item, [["这行在做什么", audited.builtinNote]]);
    const target = findAuditedCall(audited.nodes)?.target;
    if (target) expressionSourceLink(item, ...target, "查看定义");
    return;
  }
  if (kind === "context" || (kind && !manual)) {
    for (const paragraph of body.split("\n")) {
      appendInlineCode(add(item, "p", null, "statement-summary"), paragraph);
    }
    return;
  }
  const useAudit = Boolean(audited && !mixed && !structuredCalls.length
    && (audited.definition || audited.outer) && !Array.isArray(manual));
  const writtenStatement = audited?.statement && !manual;
  if (writtenStatement) {
    appendInlineCode(add(item, "p", null, "statement-summary"), audited.statement);
  }
  if (cameraSelection) {
    showCameraSelection(item);
  } else if (structuredCalls.length) {
    for (const entry of structuredCalls) showCollectionCall(item, entry, entry.first === first ? manual : null);
  } else if (mixed) {
    showMixedCall(item, mixed, manual, audited, selected);
  } else if (useAudit) {
    showExpressionAudit(item, audited, manual, selected);
  } else if (manual && !Array.isArray(manual)) {
    showCall(item, manual);
  } else if (Array.isArray(manual) && manual.length === 1) {
    appendInlineCode(add(item, "p", null, "statement-summary"), manual[0]);
  } else if (Array.isArray(manual)) {
    const terms = [];
    for (let i = 1; i < manual.length; i += 2) terms.push([manual[i], manual[i + 1], "label"]);
    showParameters(item, terms);
  } else if (audited && (inlineBranch || comprehension)) {
    if (body && !audited.statement) appendInlineCode(add(item, "p"), body);
    if (!selected) showInsideAuditedCall(item, audited, null);
  } else if (inlineBranch) {
    const [test, yes, no] = inlineBranch;
    showParameters(item, [
      ["先判断", quoteCode(test), "label"],
      ["条件成立", "只计算 " + quoteCode(yes) + "。", "label"],
      ["条件不成立", "只计算 " + quoteCode(no) + "。", "label"]
    ]);
  } else if (comprehension) {
    const [clauses, value, kind] = comprehension;
    const parts = clauses.map(([target, iterable, tests], index) => [
      "遍历 " + (index + 1),
      "从 " + quoteCode(iterable) + " 依次取值给 " + quoteCode(target)
        + (tests.length ? "，只保留满足 " + tests.map(quoteCode).join(" 且 ") + " 的项。" : "。"),
      "label"
    ]);
    parts.push(["结果", "按所选项计算 " + quoteCode(value) + "，得到" + kind + "。", "label"]);
    showParameters(item, parts);
  } else if (call) {
    if (body) appendInlineCode(add(item, "p"), body);
    showCall(item, {purpose: call[0], result: call[2]});
  } else {
    const fallback = plainSourceNote(path, text.split("\n")[first - 1]);
    const explanation = headerNote || body || fallback;
    const needsReview = !audited?.nodes.length && text.split("\n")[first - 1]?.trim();
    if (!writtenStatement && (explanation || needsReview)) {
      appendInlineCode(add(item, "p"), explanation || "这条语句的具体作用需要结合它引用的定义核对。");
    }
  }
  if (!audited && !manual && !mixed && !structuredCalls.length && directCalls) {
    const [outer, inner] = directCalls;
    const inside = inner.map(quoteCode).join("、");
    appendInlineCode(add(item, "p", null, "note"), "先执行 " + inside + "，再把结果作为参数传给 " + quoteCode(outer) + "。");
  }
  if (selected && !useAudit && audited && !cameraSelection && !mixed && !manual?.explainNestedInline) {
    if (!Array.isArray(manual) || manual.length !== 1) showInsideAuditedCall(item, audited, structuredCalls);
  }

}

function appendRenderDiagram(path, line) {
  if (path === "gaussian_renderer/__init__.py" && line >= 64 && line <= 142) {
    const diagram = add(reading, "div", null, "diagram");
    diagram.dataset.visualization = "gaussian-projection";
    vectorDiagram(diagram, "gaussian");
  }
}

function showProjectExplanation() {
  if (showGroupedProjectExplanation()) return;
  const [first, last] = statementRange(activeLine);
  const list = add(reading, "div", null, "line-notes");
  renderProjectStatement(list, first, last, activeLine, true);
}

function updateTopics() {
  document.querySelectorAll("#examples button").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.topic === topic));
  });
}










