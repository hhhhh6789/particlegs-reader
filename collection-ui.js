const collectionIndex = window.PARTICLE_COLLECTIONS;

const crossSchedule = [
  ["num_groups // 2", "把全部邻域组汇总成约一半数量的查询向量。"],
  ["num_groups // 8", "查询向量的数量缩到初始组数的八分之一。"],
  ["num_groups // 32", "将聚合结果继续压缩到初始组数的三十二分之一。"],
  ["self.query", "固定为配置指定的最终查询数，供共享潜在状态的投影使用。"]
];

function collectionCases(path, first, last) {
  return (collectionIndex.cases[path] || []).filter(test =>
    first <= test.first && test.last <= last || test.first <= first && last <= test.last);
}

function inlineArgumentText(node) {
  const plain = node.args.map(text => quoteCode(text));
  const named = node.keywords.map(([key, text]) => quoteCode(key + "=" + text));
  return [...plain, ...named].join("、");
}

function describeLayer(node) {
  const [a, b, c] = node.args;
  switch (node.name.split(".").at(-1)) {
    case "Conv1d":
      return "一维卷积。通道从 " + quoteCode(a) + " 变为 " + quoteCode(b)
        + "，卷积核长度为 " + quoteCode(c) + "。"
        + (c === "1" ? "这里只混合各点的通道，不在不同点之间做窗口合并。" : "");
    case "Linear":
      return "将最后一维从 " + quoteCode(a) + " 映射为 " + quoteCode(b) + "，其余轴保留。";
    case "GELU":
      return "逐元素应用 GELU，加入非线性，张量形状不变。";
    case "ReLU":
      return "将负数置零，张量形状不变。" +
        (node.keywords.length ? "参数 " + inlineArgumentText(node) + " 控制是否就地更新张量。" : "");
    case "Sigmoid":
      return "将每个元素压到 0 到 1 之间，张量形状不变。";
    case "BatchNorm1d":
      return "按 " + quoteCode(a) + " 个通道归一化。训练时更新统计量，推理时使用已保存的统计量。";
    case "Dropout":
      return "训练时以 " + quoteCode(a || "p") + " 的概率随机置零部分元素，推理时关闭。";
    default:
      return "";
  }
}

function describeElement(node) {
  if (node.kind === "条件")
    return "先判断 " + quoteCode(node.test) + "。成立时只计算 " + quoteCode(node.yes) + "；否则只计算 " + quoteCode(node.no) + "。";
  if (node.kind === "推导") {
    const clauses = node.clauses.map(([target, iterable, checks]) =>
      "从 " + quoteCode(iterable) + " 取值给 " + quoteCode(target)
      + (checks.length ? "，只保留 " + checks.map(quoteCode).join(" 且 ") + " 成立的项" : ""));
    return clauses.join("；") + "。再按 " + quoteCode(node.text) + " 生成这一项。";
  }
  if (node.items) return "内嵌" + node.kind + "，各项如下。";
  if (node.kind === "调用") {
    const inferred = describeLayer(node);
    if (inferred) return inferred;
    const values = inlineArgumentText(node);
    return "由 " + quoteCode(node.name) + " 计算这一项" + (values ? "，传入 " + values : "") + "。";
  }
  return "这一项取 " + quoteCode(node.text) + "。";
}

function collectionGroupRows(parent, nodes, notes = []) {
  const definitions = add(parent, "dl", null, "collection-rows");
  function display(items, details, parentLabel = "") {
    for (const [index, node] of items.entries()) {
      const row = add(definitions, "div", null, "parameter-row");
      const key = add(row, "dt");
      const label = node.field ?? (node.kind === "调用" ? node.name : "第 " + (index + 1) + " 项");
      if (parentLabel) add(key, "small", parentLabel, "parameter-kind");
      add(key, "code", label);
      appendInlineCode(add(row, "dd"), details[index] || describeElement(node));
      if (node.items?.length) display(node.items, [], label);
      for (const input of node.inputs || []) {
        if (input.items.length) display(input.items, [], input.field ? label + " · 参数 " + input.field : label);
      }
    }
  }
  display(nodes, notes);
}

function attentionGroupRows(parent, nodes) {
  for (let i = 0; i < nodes.length; i += 2) {
    const stage = i / 2;
    const sub = add(parent, "div", null, "collection-set");
    const n = add(sub, "p", null, "collection-label");
    appendInlineCode(n, "第 " + (stage + 1) + " 组 · " + quoteCode("q = " + crossSchedule[stage][0]));
    const [cross, self] = nodes.slice(i, i + 2);
    showParameters(sub, [
      ["第 " + cross.line + " 行 CrossBlock", crossSchedule[stage][1]],
      ["第 " + self.line + " 行 SelfBlock", "让这组查询向量交换信息，**保留查询数和向量宽度**。"]
    ]);
  }
}

function showCollectionCall(card, caseData, guidance) {
  const specific = collectionDetails[activeFile.path]?.[caseData.first] || {};
  const isAttention = activeFile.path === "scene/network.py" && caseData.first === 454;
  const layers = caseData.callee.endsWith("nn.Sequential");
  const call = {
    purpose: specific.purpose || (!Array.isArray(guidance) && guidance?.purpose)
      || (layers ? "按出现顺序串起网络层。调用这个模块时，前一层的输出交给后一层。"
        : "先逐项构造参数中的集合，再调用 " + quoteCode(caseData.callee) + "。"),
    detailTitle: layers ? "数据依次经过哪些层" : "构造内容",
    details: parent => {
      for (const group of caseData.groups) {
        const section = add(parent, "div", null, "collection-argument");
        if (isAttention) attentionGroupRows(section, group.items);
        else collectionGroupRows(section, group.items, specific.items?.[group.field] || []);
      }
    },
    result: specific.result || (!Array.isArray(guidance) && guidance?.result)
      || (layers ? "构造一个可直接调用的串联模块，初始化时只注册各层。"
        : "")
  };
  const block = add(card, "div", null, "collection-call");
  block.dataset.case = caseData.first + ":" + caseData.column;
  block.dataset.items = String(caseData.groups.reduce((sum, group) => sum + group.items.length, 0));
  showCall(block, call);
}

