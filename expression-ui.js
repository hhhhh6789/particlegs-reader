
const expressionIndex = window.PARTICLE_EXPRESSIONS;

function expressionSourceLink(parent, path, line, label) {
  const button = add(parent, "button", label, "expression-link");
  button.type = "button";
  button.title = path + " · 第 " + line + " 行";
  button.onclick = () => jumpToSource(path, line);
}

function expressionRows(parent, rows) {
  const list = add(parent, "dl", null, "expression-rows");
  for (const [label, detail, children, labelType] of rows) {
    const row = add(list, "div", null, "parameter-row");
    const term = add(row, "dt");
    if (labelType === "label") add(term, "strong", label, "explanation-label");
    else add(term, "code", label);
    const value = add(row, "dd");
    appendInlineCode(value, detail);
    if (children?.length) showExpressions(row, children);
  }
}

function findAuditedCall(nodes, name, line, column) {
  for (const node of nodes || []) {
    if (node.kind === "call" && node.name === name
        && (line === undefined || node.at === line) && (column === undefined || node.column === column)) return node;
    const input = !node.arguments ? [] : node.arguments.flatMap(argument => argument[2]);
    const parts = !node.parts ? [] : node.parts.flatMap(part => part[2]);
    const result = findAuditedCall([...(node.receiver || []), ...input, ...parts, ...(node.children || [])], name, line, column);
    if (result) return result;
  }
  return null;
}

function hasExpressionDetails(nodes) {
  return nodes.some(node => ["container", "and", "or"].includes(node.kind)
    ? node.parts.some(([, , children]) => hasExpressionDetails(children))
    : true);
}

function showExpressionCall(parent, call, outer, written = null, effect = "") {
  const purpose = written?.purpose || call.purpose;
  const result = written?.result ?? [call.result, effect].filter(Boolean).join(" ");
  const nested = [...(call.receiver || []), ...call.arguments.flatMap(argument => argument[2])];
  if (outer) {
    const parts = [];
    if (purpose) parts.push(["作用", purpose]);
    if (!written?.explainNestedInline && hasExpressionDetails(nested)) {
      parts.push(["内部求值", section => showExpressions(section, nested)]);
    }
    if (result && result !== purpose) parts.push(["结果", result]);
    if (parts.length) showExplanationSections(parent, parts);
  } else {
    if (purpose) appendInlineCode(add(parent, "p"), purpose);
    if (result && result !== purpose) appendInlineCode(add(parent, "p"), result);
  }
  if (call.launch) {
    const [grid, block, shared, stream] = call.launch.split(",").map(part => part.trim());
    const config = ["网格包含的线程块", "每个线程块的线程布局", "每块动态共享内存字节数", "CUDA 执行流"];
    showParameters(parent, [grid, block, shared, stream].flatMap((part, i) => part ? [[part, config[i] + "。"]] : []));
  }
  if (call.target) expressionSourceLink(parent, ...call.target, "查看定义");

}

function shortCallName(name) {
  return name.includes("(") ? name.match(/[A-Za-z_]\w*$/)?.[0] || name : name;
}

function showCollectionOverview(card, note) {
  const [summary, ...sections] = typeof note === "string" ? [note] : note;
  appendInlineCode(add(card, "p", null, "statement-summary"), summary);
  if (!sections.length) return;
  showExplanationSections(card, sections.map(([title, content]) =>
    [title, Array.isArray(content) ? part => expressionRows(part, content) : content]));
}

function showExpressions(parent, nodes) {
  if (!nodes.length) return;
  const list = add(parent, "dl", null, "expression-tree expression-steps");
  function row(node, label, labelCode = false, role = "") {
    const entry = add(list, "div", null, "expression-node parameter-row");
    entry.dataset.kind = node.kind;
    entry.dataset.line = String(node.at);
    const name = add(entry, "dt");
    if (role) add(name, "small", role, "parameter-kind");
    add(name, labelCode ? "code" : "strong", label);
    return add(entry, "dd");
  }
  function display(node, role = node.role) {
    switch (node.kind) {
      case "container":
        // A literal groups values. Nested computations already describe what makes the values.
        for (const [label, , children] of node.parts) {
          for (const child of children) display(child, [role, label].filter(Boolean).join(" · "));
        }
        break;
      case "and":
      case "or":
        for (const [, , children] of node.parts) {
          for (const child of children) display(child, role || "参与条件判断");
        }
        break;
      case "comprehension": {
        const detail = row(node, "逐项生成" + node.name, false, role);
        for (const [label, text] of node.parts) {
          appendInlineCode(add(detail, "p"), label + " " + quoteCode(text));
        }
        break;
      }
      case "call": {
        const name = shortCallName(node.name);
        for (const receiver of node.receiver || []) display(receiver, "给 " + name + "() 准备操作对象");
        for (const [, , children] of node.arguments) {
          for (const child of children) display(child, "参与 " + name + "() 的输入计算");
        }
        const detail = row(node, name + "()", true, role);
        showExpressionCall(detail, {...node, receiver: []}, false);
        if (!detail.hasChildNodes()) {
          appendInlineCode(detail, "调用的具体行为待核对。");
        }
        break;
      }
      case "lambda": {
        const detail = row(node, "lambda", true, role);
        appendInlineCode(detail, (node.name ? "绑定参数 " + quoteCode(node.name) + "，再计算 " : "调用时计算 ") + quoteCode(node.text) + "。");
        for (const child of node.children) display(child, "调用时求值");
        break;
      }
      default: {
        const detail = row(node, node.name || (node.kind === "choice" ? "条件表达式" : "表达式"), false, role);
        for (const [label, text, children] of node.parts || []) {
          if (children.length) {
            for (const child of children) display(child, [role, label].filter(Boolean).join(" · "));
          } else {
            appendInlineCode(add(detail, "p"), label + " " + quoteCode(text));
          }
        }
      }
    }
  }
  for (const node of nodes) display(node);
  if (!list.hasChildNodes()) list.remove();
}

function receiverChain(call) {
  const chain = [call];
  let step = call;
  while (step.receiver?.length === 1 && step.receiver[0].kind === "call") {
    step = step.receiver[0];
    chain.unshift(step);
  }
  return chain;
}

function showChainExplanation(card, chain, record, written) {
  const {path} = activeFile;
  const last = chain.at(-1);
  const excerpt = activeFile.text.split("\n")[last.at - 1];
  const sh = path === "scene/gaussian_model.py" && excerpt?.match(/^\s*(f_dc|f_rest) = self\._features_(dc|rest)\.detach\(/);
  const shape = sh?.[1] === "f_rest" ? "K" : "1";
  const purpose = sh ? "把每个高斯的" + (shape === "K" ? "其余球谐颜色系数" : "零阶球谐颜色系数")
    + "整理成一行。输入形状为 " + quoteCode("(N, " + shape + ", 3)")
    + "，" + quoteCode("N") + " 是高斯数量，三个颜色通道对应 RGB。"
    + (shape === "K" ? quoteCode("K") + " 是每个颜色通道的非零阶球谐系数数量。" : "")
    : written?.purpose || "从 " + quoteCode(chain[0].name) + " 开始，每次调用的结果交给下一个方法。";
  const detail = sh ? {
    detach: "返回数值相同、**断开梯度跟踪**的张量。",
    transpose: "**交换**第 " + quoteCode("1") + " 轴（系数）和第 " + quoteCode("2") + " 轴（RGB），形状从 " + quoteCode("(N, " + shape + ", 3)") + " 变为 "
      + quoteCode("(N, 3, " + shape + ")") + "。",
    flatten: "从 " + quoteCode("start_dim=1") + " 开始合并到末轴，**保留高斯轴**。每行依次存放 R、G、B 的系数。",
    contiguous: "必要时整理成**连续存储**，形状和数值保持原样。",
    cpu: "把张量移到 CPU，供 NumPy 使用。",
    numpy: "把 CPU 张量转换成 NumPy 数组。",
  } : {};
  const result = sh ? quoteCode(sh[1]) + " 是形状为 " + quoteCode(shape === "K" ? "(N, 3*K)" : "(N, 3)")
    + " 的 NumPy 数组。每行对应一个高斯。"
    : written?.result || [last.result, record.effect].filter(Boolean).join(" ") || "整条语句使用最后一次调用的返回值。";

  showExplanationSections(card, [
    ["这行在做什么", purpose],
    ["执行顺序", section => {
      const list = add(section, "dl", null, "expression-steps");
      for (const [index, step] of chain.entries()) {
        const name = shortCallName(step.name).split(".").at(-1);
        const item = add(list, "div", null, "parameter-row");
        const term = add(item, "dt");
        add(term, "small", String(index + 1), "parameter-kind");
        const signature = step.arguments.map(([label, , , metadata]) =>
          metadata?.kind === "keyword" ? metadata.name + "=" + metadata.value : metadata?.value || label);
        add(term, "code", name + "(" + signature.join(", ") + ")");
        const body = add(item, "dd");
        appendInlineCode(body, detail[name] || [step.purpose, step !== last && step.result].filter(Boolean).join("。")
          || "在上一步得到的对象上调用 " + quoteCode(name) + "。");
        if (!detail[name] && step.arguments.length) {
          const inside = step.arguments.flatMap(argument => argument[2]);
          if (inside.length) showExpressions(body, inside);
        }
        if (step.target) expressionSourceLink(body, ...step.target, "查看定义");
      }
    }],
    ["结果", result]
  ]);
}

function showDefinitionResults(parent, outcomes) {
  const list = add(parent, "ul", null, "definition-results");
  for (const {line, code, meaning} of outcomes) {
    const row = add(list, "li");
    const [first, last] = statementRange(line);
    row.dataset.sourceFirst = String(first);
    row.dataset.sourceLast = String(last);
    expressionSourceLink(row, activeFile.path, line, "第 " + line + " 行");
    const detail = add(row, "div");
    add(detail, "code", code, "definition-return-code");
    appendInlineCode(add(detail, "span", null, "definition-return-meaning"), meaning);
  }
}

function showAuditedDefinition(card, definition) {
  const {purpose, outcomes} = definition;
  const implicitResult = activeFile.path.endsWith(".py")
    ? "执行到函数末尾时返回 " + quoteCode("None") + "。"
    : "无返回值。";
  const details = add(card, "details", null, "definition-details");
  add(details, "summary", "函数详情");
  showExplanationSections(details, [
    ["函数作用", purpose],
    ["返回结果", outcomes.length ? section => showDefinitionResults(section, outcomes) : implicitResult],
  ]);
}

function showExpressionAudit(card, record, manual, selected) {
  const {definition, effect, nodes, outer} = record;
  if (definition && !Array.isArray(manual)) {
    showAuditedDefinition(card, definition);
    const meaningful = nodes.filter(node => node.role !== "默认值" || node.kind !== "container"
      || node.parts.some(([, , children]) => children.length));
    if (selected && meaningful.length) showExpressions(card, meaningful);
    return true;
  }
  if (outer && !Array.isArray(manual)) {
    const chain = receiverChain(nodes[0]);
    if (chain.length > 1) showChainExplanation(card, chain, record, manual);
    else showExpressionCall(card, nodes[0], true, manual, effect);
    if (selected && nodes.length > 1) showExpressions(card, nodes.slice(1));
    return true;
  }
  return false;
}

function showInsideAuditedCall(card, record, structuredCalls) {
  if (!record?.nodes.length) return;
  if (structuredCalls?.length) {
    // The collection card already describes each immediate element. Here show expressions deeper than that first level.
    const list = [];
    const collect = node => {
      if (node.kind === "call") {
        for (const [, , children] of node.arguments) {
          for (const child of children) {
            if (child.kind === "container") child.parts.forEach(([, , items]) => items.forEach(collectItem));
            else if (child.kind !== "call" || !node.name.endsWith("nn.Sequential")) list.push(child);
            else collectItem(child);
          }
        }
      }
    };
    const collectItem = node => {
      if (node.kind === "call") {
        list.push(...(node.receiver || []), ...node.arguments.flatMap(([, , children]) => children));
      } else if (node.kind === "container") {
        node.parts.forEach(([, , children]) => children.forEach(collectItem));
      } else {
        list.push(node);
      }
    };
    record.nodes.forEach(collect);
    if (list.length) showExpressions(card, list);
    return;
  }
  if (!record.outer) showExpressions(card, record.nodes);
  else {
    const [outer, ...remaining] = record.nodes;
    const nested = [...(outer.receiver || []), ...outer.arguments.flatMap(([, , children]) => children)];
    if (nested.length || remaining.length) showExpressions(card, [...nested, ...remaining]);
  }
}

