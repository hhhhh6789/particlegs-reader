
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
    if (node.kind === "call" && (name === undefined ? node.target : node.name === name)
        && (line === undefined || node.at === line) && (column === undefined || node.column === column)) return node;
    const input = !node.arguments ? [] : node.arguments.flatMap(argument => argument[2]);
    const parts = !node.parts ? [] : node.parts.flatMap(part => part[2]);
    const result = findAuditedCall([...(node.receiver || []), ...input, ...parts, ...(node.children || [])], name, line, column);
    if (result) return result;
  }
  return null;
}

function hasExpressionDetails(nodes) {
  return nodes.some(node => {
    if (node.basicBuiltin) {
      return hasExpressionDetails(node.arguments.flatMap(([, , children]) => children));
    }
    return !["container", "and", "or"].includes(node.kind)
      || node.parts.some(([, , children]) => hasExpressionDetails(children));
  });
}

function showExpressionCall(parent, call, outer, written = null, effect = "") {
  const purpose = written?.purpose || call.purpose;
  const result = written?.result ?? [call.result, effect].filter(Boolean).join(" ");
  const nested = [...(call.receiver || []), ...call.arguments.flatMap(argument => argument[2])];
  if (outer) {
    const parts = [];
    const structured = !written?.explainNestedInline && hasExpressionDetails(nested);
    if (structured) {
      parts.push(["这行在做什么", written?.purpose || compoundSummary({effect}, call)]);
      parts.push(["执行顺序", section => showExpressions(section, [call])]);
      if (written?.result && written.result !== written.purpose) parts.push(["结果", written.result]);
    } else {
      if (purpose) parts.push(["作用", purpose]);
      if (result && result !== purpose) parts.push(["结果", result]);
    }
    if (parts.length) showExplanationSections(parent, parts);
    if (structured) return;
  } else {
    if (purpose) appendInlineCode(add(parent, "p"), purpose);
    if (result && result !== purpose) appendInlineCode(add(parent, "p"), result);
  }
  showLaunchConfig(parent, call);
  if (call.target) expressionSourceLink(parent, ...call.target, "查看定义");
}

function showLaunchConfig(parent, call) {
  if (call.launch) {
    const [grid, block, shared, stream] = call.launch.split(",").map(part => part.trim());
    const config = ["网格包含的线程块", "每个线程块的线程布局", "每块动态共享内存字节数", "CUDA 执行流"];
    showParameters(parent, [grid, block, shared, stream].flatMap((part, i) => part ? [[part, config[i] + "。"]] : []));
  }
}

function outcomeText(text) {
  return text ? text.replace(/[。\s]+$/, "") + "。" : "";
}

function conciseCallPurpose(call) {
  const purpose = call.purpose || "";
  // Older method notes repeated the entire expression on the left of the dot.
  return purpose.replace(/^对 `[^`]+`\s*/, "");
}

function shortCallName(name) {
  return name.includes("(") ? name.match(/[A-Za-z_]\w*$/)?.[0] || name : name;
}

function showCollectionOverview(card, note) {
  const [summary, ...sections] = typeof note === "string" ? [note] : note;
  appendInlineCode(add(card, "p", null, "statement-summary"), summary);
  if (!sections.length) return;
  showExplanationSections(card, sections.map(([title, content]) =>
    [title, content?.steps ? part => {
      const list = add(part, "ol");
      for (const step of content.steps) appendInlineCode(add(list, "li"), step);
    } : Array.isArray(content) ? part => expressionRows(part, content) : content]));
}

function showExpressions(parent, nodes, details = {}) {
  if (!nodes.length) return;
  const ordered = /\.(?:py|js|sh|bash)$/.test(activeFile.path);
  const list = add(parent, ordered ? "ol" : "ul", null, "expression-tree expression-steps ordered-expression-steps");
  function row(node, label, labelCode = false, role = "") {
    const entry = add(list, "li", null, "expression-node");
    entry.dataset.kind = node.kind;
    entry.dataset.line = String(node.at);
    if (role) add(entry, "small", role, "parameter-kind");
    add(entry, labelCode ? "code" : "strong", label);
    return add(entry, "div", null, "expression-step-body");
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
      case "or": {
        if (!hasExpressionDetails(node.parts.flatMap(([, , children]) => children))) break;
        const detail = row(node, "按顺序判断条件", false, role);
        appendInlineCode(add(detail, "p"), node.kind === "and" ? "前一项为真时才继续检查下一项。" : "前一项为假时才继续检查下一项。");
        for (const [label, text, children] of node.parts) {
          appendInlineCode(add(detail, "p"), label + " " + quoteCode(children.length ? shortExpression(text) : text));
          showExpressions(detail, children);
        }
        break;
      }
      case "index": {
        for (const child of [...node.receiver, ...node.children]) display(child);
        const detail = row(node, "[" + shortExpression(node.key) + "]", true);
        appendInlineCode(detail, node.children.length ? "用算出的索引取出对应的值。" : "从算出的对象中取出索引对应的值。");
        break;
      }
      case "comprehension": {
        const detail = row(node, "逐项生成" + node.name, false, role);
        for (const [label, text] of node.parts) {
          appendInlineCode(add(detail, "p"), label + " " + quoteCode(text));
        }
        break;
      }
      case "call": {
        const name = shortCallName(node.name);
        for (const receiver of node.receiver || []) display(receiver);
        for (const [, , children] of node.arguments) {
          for (const child of children) display(child);
        }
        if (node.basicBuiltin) break;
        const detail = row(node, stepLabel(node), true, role);
        const method = name.split(".").at(-1);
        const purpose = Object.hasOwn(details, method) ? details[method] : conciseCallPurpose(node) || node.result;
        appendInlineCode(detail, purpose || "调用 " + quoteCode(name) + "，具体用途待核对。");
        showLaunchConfig(detail, node);
        if (node.target) expressionSourceLink(detail, ...node.target, "查看定义");
        break;
      }
      case "lambda": {
        const detail = row(node, "lambda", true, role);
        appendInlineCode(detail, "创建函数供稍后调用" + (node.name ? "，参数为 " + quoteCode(node.name) : "") + "。");
        showExpressions(detail, node.children);
        break;
      }
      default: {
        const detail = row(node, node.name || (node.kind === "choice" ? "条件表达式" : "表达式"), false, role);
        for (const [label, text, children] of node.parts || []) {
          if (children.length) {
            appendInlineCode(add(detail, "p"), label);
            showExpressions(detail, children);
          } else {
            appendInlineCode(add(detail, "p"), label + " " + quoteCode(shortExpression(text)));
          }
        }
      }
    }
  }
  for (const node of nodes) display(node);
  if (!list.hasChildNodes()) list.remove();
}

function shortExpression(text) {
  return text.length > 55 ? text.slice(0, 54) + "…" : text;
}

function stepLabel(node) {
  const name = shortCallName(node.name);
  const args = node.arguments.map(([label, , children, metadata]) => {
    const value = metadata?.value || label;
    if (children.length || value.length > 18 || !/^(?:[\w.]+|-?\d+(?:\.\d+)?|["'][\w./-]+["'])$/.test(value)) return "…";
    return metadata?.kind === "keyword" ? metadata.name + "=" + value : value;
  });
  const text = args.join(", ");
  return shortExpression(name) + "(" + (text.length > 36 ? "…" : text) + ")";
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
    : written?.purpose || compoundSummary(record, last);
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
    : written?.result;

  showExplanationSections(card, [
    ["这行在做什么", purpose],
    ["执行顺序", section => showExpressions(section, [last], detail)],
    ["结果", result]
  ].filter(([, content]) => content));
}

function compoundSummary(record, call) {
  const effect = record.effect?.startsWith("将 `") ? "将计算结果交给调用者。" : record.effect;
  const purpose = conciseCallPurpose(call);
  return [outcomeText(call.result || purpose || "调用 " + quoteCode(shortCallName(call.name))), effect]
    .filter(Boolean).join(" ");
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

