const glossary = {
  "ODE 积分器": "根据状态的变化规律，从起始状态算出指定时刻状态的工具。",
  "等距时间点": "相邻两个时间点之间的间隔相同。",
  "一维张量": "一串按顺序存放的数值。每个元素可以通过一个索引取出。",
  "球谐系数": "描述高斯颜色如何随观察方向变化的一组数值。",
  "球谐颜色系数": "描述高斯颜色如何随观察方向变化的一组数值。",
  "光栅化": "把场景投影到图像上，计算每个像素的值。",
};

const knownNames = {
  torch: "PyTorch 模块，提供张量和神经网络运算。",
  nn: "PyTorch 的神经网络模块，提供网络层和模型容器。",
  np: "NumPy 的常用别名，用于处理数组。",
  self: "当前对象。通过它访问这个对象的属性和方法。",
  __init__: "创建对象时，Python 自动调用的初始化方法。",
  "nn.Sequential": "按给定顺序串起网络层，前一层的输出交给后一层。",
  "nn.ModuleList": "保存并注册一组子模块，调用者决定怎样遍历和使用这些模块。",
  "nn.Linear": "用可学习的权重和偏置，把特征的最后一维映射到指定长度。",
  "nn.GELU": "对每个值做非线性变换，保留输入形状。",
  os: "Python 标准库模块，提供文件、目录和操作系统相关功能。",
  "os.path": "Python 标准库中的路径处理模块。",
  "os.path.join": "把路径的各部分拼成一个路径。",
  "getattr": "按名字读取对象属性。传了默认值时，缺少这个属性就返回默认值。",
  "float32": "用 32 位存储的浮点数类型。",
  "self._features_rest": "每个高斯的其余球谐颜色系数，用于表示颜色随观察方向的变化。",
  "self._features_dc": "每个高斯的零阶球谐颜色系数，表示与观察方向无关的颜色分量。",
};
const typeMeanings = {
  "arguments.ModelParams": "场景和模型的配置类，保存数据路径、模型路径和相机读取等设置。",
  "arguments.PipelineParams": "渲染流程的配置类，控制球谐颜色和协方差在哪里计算，以及是否开启调试。",
  "scene.gaussian_model.GaussianModel": "管理场景中的基础高斯，保存位置、颜色、尺度、旋转和不透明度等参数。",
  "scene.Scene": "组织一个场景的相机和高斯模型，负责从点云初始化或加载已保存的高斯。",
  "scene.cameras.Camera": "保存单个视角的图像、相机位姿、投影矩阵和对应时刻。",
  "utils.graphics_utils.BasicPointCloud": "存放点坐标、颜色和法线的点云记录，用于初始化高斯。",
  "scene.dataset_readers.SceneInfo": "读取场景后得到的记录，包含初始点云、各组相机列表和场景范围。",
  "scene.dataset_readers.CameraInfo": "读取数据时整理出的相机记录，包含图像、位姿、视场和帧时间。",
  "scene.network.ODEFunc": "接收当前时刻和共享状态，预测这个状态的瞬时变化率。",
  "argparse.ArgumentParser": "Python 的命令行参数解析器，用来注册并读取运行选项。",
  "torch.Tensor": "PyTorch 的张量类型，用来保存可进行批量运算的数值数据。",
  "numpy.array": "NumPy 创建数组的函数。这里的类型标注表示这个值按 NumPy 数组来处理。",
  "typing.Optional": "表示这个值可以是方括号里的类型，也可以是 None。",
  "typing.Tuple": "表示由多项值组成的元组，方括号中列出各项的类型。",
  bool: "布尔类型，取值为 True 或 False，常用作开关或判断结果。",
  int: "整数类型，常用于数量、编号或索引。",
  float: "浮点数类型，用来表示时间、尺度等可以带小数的值。",
  str: "字符串类型，用来保存路径、名称等文本。",
  dict: "字典类型，用键来存取对应的值。",
  list: "列表类型，按顺序保存多项内容。",
};

const timeGridNames = {
  ts: "存放生成的等距时间点。积分器按这些时间点给出对应的状态。",
  "torch.linspace": "生成等距点的函数。这里从起始时间到目标时间取点，包含两个端点。",
  start: "linspace 的形参，指定第一个时间点。这里传入 t_start。",
  end: "linspace 的形参，指定最后一个时间点。这里传入 t_end。",
  t_start: "起始时间。它是生成的第一个时间点，也是积分开始的时刻。",
  t_end: "目标时间。它是生成的最后一个时间点，也是要取出状态的时刻。",
  steps: "linspace 的形参，指定要生成的时间点总数。",
  num_steps: "这次要生成的时间点总数，传给 linspace 的 steps 参数。",
  device: "linspace 的形参，指定新建的时间点张量放在哪个设备上。",
  "g_start.device": "起始状态所在的设备。用它创建时间点，两个张量就会在同一个设备上。",
  dtype: "linspace 的形参，指定时间点用什么数值类型存储。",
  "g_start.dtype": "起始状态的数值类型，例如 float32。时间点沿用这个类型。",
  g_start: "ODE 积分从这个状态出发。这里读取它的设备和数值类型来创建时间点。",
};

const scopedNames = {
  "scene/network.py": [
    [533, 555, {
      input_dim: "共享状态向量的长度。网络最终输出也回到这个维数。",
      hidden_dim: "中间网络层的特征宽度。",
      time_input_ch: "表示时间所用的特征数，与状态向量拼接后形成网络输入。",
      "self.net1": "变化率网络的第一组串联层，产生供下一步使用的中间向量。",
      "self.net2": "变化率网络的第二组串联层，输出对中间向量的修正。",
    }],
    [633, 644, timeGridNames],
  ],
  "scene/__init__.py": [
    [59, 89, {
      sceneLoadTypeCallbacks: "按数据集类型找到对应读取函数的字典。例如 Colmap 对应 COLMAP 场景读取器。",
      "args.source_path": "传给读取器的数据目录。",
      "args.images": "数据目录下存放 COLMAP 图像的子目录名，通常为 images。",
      "args.white_background": "控制透明区域与白底还是黑底合成。",
      "args.eval": "读取器接收的评估选项。",
      skip_train: "是否跳过训练和初始化视角。",
      skip_val: "是否跳过验证视角。",
      skip_test: "是否跳过测试视角。",
      max_train_cameras: "限制读取或保留的训练相机数量。",
      max_init_cameras: "限制保留的初始化相机数量。",
      max_val_cameras: "限制读取或保留的验证相机数量。",
      max_test_cameras: "限制读取或保留的测试相机数量。",
    }],
    [47, 52, {
      load_iteration: "指定加载哪个迭代。-1 表示选最大编号，None 表示跳过加载。",
      "self.loaded_iter": "记录最终选中的迭代编号，供后面的高斯模型加载使用。",
      "self.model_path": "存放模型、检查点和导出结果的目录。",
      searchForMaxIteration: "从保存目录读取已有的迭代编号，返回最大的一个。",
    }],
    [92, 93, {
      src_file: "用于读取原始 PLY 点云的文件对象。",
      dest_file: "用于写入模型目录下 input.ply 的文件对象。",
    }],
    [101, 106, {
      scene_info: "场景数据记录，包含初始点云和各组相机列表。",
      args: "当前场景配置，包含各组相机的数量上限。",
      "scene_info._replace": "返回一份替换了指定相机列表的新场景记录。",
      _replace: "返回一份替换了指定相机列表的新场景记录。",
      subsample_cam_infos: "在相机列表超过上限时，按列表位置选取其中的一部分。",
      train_cameras: "图像监督阶段使用的相机列表。",
      init_cameras: "初始化阶段使用的相机列表。",
      val_cameras: "验证阶段使用的相机列表。",
      test_cameras: "测试阶段使用的相机列表。",
      skip_train: "为真时跳过训练相机和初始化相机的采样。",
      skip_val: "为真时跳过验证相机的采样。",
      skip_test: "为真时跳过测试相机的采样。",
      max_train_cameras: "训练相机的保留上限。",
      max_init_cameras: "初始化相机的保留上限。",
      max_val_cameras: "验证相机的保留上限。",
      max_test_cameras: "测试相机的保留上限。",
    }],
  ],
};

const simpleName = /^[A-Za-z_$][\w$]*(?:(?:\.|::|->)[A-Za-z_$][\w$]*)*$/;
const codeNames = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\`(?:\\.|[^\`\\])*\`|\b(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?[fjLuU]?)\b|[A-Za-z_$][\w$]*(?:(?:\.|::|->)[A-Za-z_$][\w$]*)*/g;
const nativeCodeNames = new RegExp(String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/|${codeNames.source}`, "g");
const glossaryNames = new RegExp(Object.keys(glossary).sort((a, b) => b.length - a.length).join("|"), "g");
const sourceLinesForTerms = new WeakMap();
const pythonKeywords = new Set(("False None True and as assert async await break class continue def del elif else except "
  + "finally for from global if import in is lambda nonlocal not or pass raise return try while with yield").split(" "));
const nativeKeywords = new Set(("if else for while do return break continue try catch finally throw class struct union enum "
  + "namespace import from as in switch case default template typename using new delete static inline const constexpr auto "
  + "public private protected virtual extern friend override final sizeof let var function extends export of then fi done "
  + "esac true false null nullptr NULL undefined").split(" "));
let proseTypes;

function shortMeaning(value) {
  if (typeof value !== "string") return "";
  const text = value.replace(explanationMarkup, (_, code, bold) => code ?? bold.replaceAll(String.fromCharCode(96), ""))
    .replace(/\s+/g, " ").trim();
  if (/^(?:指定同名选项|作为第.*实参传入|候选值|执行.*调用|结果由该函数)/.test(text)) return "";
  const parts = text.match(/[^。！？；]+[。！？；]?/g) || [];
  if (!parts.length) return "";
  const first = parts[0].trim();
  const second = parts[1]?.trim() || "";
  const summary = second && first.length + second.length < 96 ? first + second : first;
  return summary.length <= 125 ? summary : "";
}

function collectNameMeanings(file, first, last) {
  const {path} = file;
  const names = new Map(path.endsWith(".py") ? Object.entries(knownNames) : []);
  const local = new Map();
  const ambiguous = new Set();
  const entries = expressionIndex.files[path] || {};
  const scope = file.symbols?.findLast(([from, to, , kind]) => kind === "函数" && from <= first && first <= to);
  const put = (name, value) => {
    const meaning = shortMeaning(value);
    if (simpleName.test(name || "") && meaning) names.set(name, meaning);
  };
  const remember = (name, value) => {
    const meaning = shortMeaning(value);
    if (!meaning || !simpleName.test(name || "") || ambiguous.has(name)) return;
    if (local.has(name) && local.get(name) !== meaning) {
      local.delete(name);
      ambiguous.add(name);
    } else local.set(name, meaning);
  };
  const definitionAt = scope?.[0] ?? first;
  const definitionEnd = scope ? Math.min(scope[1], scope[0] + 7) : last;
  for (let line = definitionAt; line <= definitionEnd; line++) {
    for (const [label, detail, , metadata] of entries[line]?.definition?.rows || []) {
      put(metadata?.name || label, detail);
    }
    for (const [name, detail] of projectManual[path]?.[line]?.parameters || []) put(name, detail);
    if (entries[line]?.definition) break;
  }

  function readArguments(arguments_, written) {
    for (const [label, fallback, children, info] of arguments_) {
      const meaning = argumentMeaning(label, info, fallback, written);
      remember(info?.name, meaning);
      if (info?.value && info.value !== info.name && simpleName.test(info.value)) {
        const description = shortMeaning(meaning);
        if (description) {
          const bind = info.name ? "传给 " + info.name + "。" : "";
          remember(info.value, bind + description);
        }
      }
      children.forEach(child => readNode(child));
    }
  }

  function readNode(node, written) {
    if (node.kind === "call") {
      const name = shortCallName(node.name);
      remember(name, node.purpose || node.result);
      if (node.target && !names.has(name)) {
        const [origin, definitionLine] = node.target;
        const detail = shortMeaning(node.purpose || node.result);
        names.set(name, {
          description: detail || "调用这里链接的实现来完成对应操作。",
          source: origin + " · 第 " + definitionLine + " 行",
        });
      }
      const member = name.split(/\.|::|->/).at(-1);
      if (member !== name && node.receiver?.length) remember(member, node.purpose || node.result);
      readArguments(node.arguments, written);
    }
    node.receiver?.forEach(child => readNode(child));
    node.children?.forEach(child => readNode(child));
    node.parts?.forEach(([, , children]) => children.forEach(child => readNode(child)));
  }

  let lines = sourceLinesForTerms.get(file);
  if (!lines) {
    lines = file.text.split("\n");
    sourceLinesForTerms.set(file, lines);
  }
  for (let line = first; line <= last; line++) {
    const entry = entries[line];
    const written = projectManual[path]?.[line];
    const example = lineGroup(path, line)?.[3].find(([start]) => start === line)?.[4];
    const parameterGuidance = written?.parameters || example?.parameters;
    entry?.nodes.forEach((node, index) => readNode(node, index === 0 && entry.outer ? parameterGuidance : undefined));
    const assignment = lines[line - 1]?.match(/^\s*([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)\s*=(?!=)/);
    if (assignment) remember(assignment[1], written?.result || (entry?.outer && entry.nodes[0].result));
    for (const [name, detail] of written?.parameters || []) remember(name, detail);
  }
  if (!entries[first]?.nodes.some(node => node.kind === "call")) {
    for (const [, , kind, , rows] of visibleParameterRecords(path, first, first, last)) {
      if (kind === "call") readArguments(legacyCallArguments(rows), projectManual[path]?.[first]?.parameters);
      else if (kind === "definition") {
        for (const [label, detail, key] of rows) remember(key || parameterNames(label)[0], detail);
      }
    }
  }
  for (const [name, detail] of local) if (!names.has(name)) names.set(name, detail);
  if (path.endsWith(".py")) {
    for (const [type, meaning] of projectTypeNames()) if (!names.has(type)) names.set(type, meaning);
    addLocalBindings(file, lines, names, first, last);
  }
  const scoped = scopedNames[path]?.find(([start, end]) => start <= first && last <= end);
  for (const [name, meaning] of Object.entries(scoped?.[2] || {})) names.set(name, meaning);
  for (let line = first; line <= last; line++) {
    for (const [name, [canonical, path, definitionLine]] of Object.entries(file.types?.[line] || {})) {
      const description = Object.hasOwn(typeMeanings, canonical) ? typeMeanings[canonical] : "";
      if (path || description) {
        names.set(name, {
          description: description || "项目中的类。在这里用作类型标注。",
          source: path ? path + " · 第 " + definitionLine + " 行" : "",
        });
      }
    }
  }
  return names;
}

function projectTypeNames() {
  if (proseTypes) return proseTypes;
  proseTypes = new Map(Object.entries(typeMeanings).filter(([name]) => !name.includes(".")));
  for (const file of files) {
    for (const [start, , name, kind] of file.symbols || []) {
      const [canonical, origin, line] = file.types?.[start]?.[name] || [];
      if (kind !== "类" || !origin || !typeMeanings[canonical]) continue;
      proseTypes.set(name, {description: typeMeanings[canonical], source: origin + " · 第 " + line + " 行"});
    }
  }
  return proseTypes;
}

function addLocalBindings(file, lines, names, first, last) {
  const visible = lines.slice(first - 1, last).join(" ").matchAll(codeNames);
  const symbols = new Set();
  for (const [token] of visible) {
    if (!simpleName.test(token)) continue;
    symbols.add(token);
    symbols.add(token.split(".")[0]);
  }
  for (let line = first; line <= last; line++) {
    for (const [start, end] of file.interpolations?.[line] || []) {
      symbols.add(lines[line - 1].slice(start, end));
    }
  }
  for (const name of symbols) {
    if (names.has(name) || !Object.hasOwn(file.bindings || {}, name)) continue;
    const bindings = file.bindings[name].filter(([at, from, to]) =>
      at >= first && at <= last || (!from || from <= first && first <= to) && at <= last
      || name.startsWith("self."));
    bindings.sort(([a, aFrom], [b, bFrom]) => (b <= last) - (a <= last) || bFrom - aFrom || b - a);
    if (!bindings.length) continue;
    const [at, from, , role, origin] = bindings[0];
    const records = expressionIndex.files[file.path] || {};
    const row = records[at];
    let description = "";
    if (role === "assignment" || role === "attribute") {
      description = shortMeaning(row?.outer && row.nodes[0].result)
        || shortMeaning(projectManual[file.path]?.[at]?.result)
        || shortMeaning(projectNotes[file.path]?.[at]?.[2]);
    } else if (role === "function" || role === "class") {
      description = shortMeaning(row?.definition?.purpose);
    }
    const roles = {
      parameter: "这个函数接收的参数，由调用者传入。",
      assignment: from ? "保存对应语句算出的值，供当前作用域使用。" : "文件级变量，保存对应语句算出的值。",
      attribute: "对象的一个属性，保存该对象后续操作会使用的值。",
      unpack: "接收右侧解包后对应位置的一个值。",
      iteration: "保存本轮循环取到的值或其中的一项。",
      exception: "保存这一分支捕获到的异常对象。",
      resource: "接收进入当前资源管理块时得到的对象。",
      function: "本文件在这里定义的函数。",
      class: "本文件在这里定义的类。",
      module: "导入的模块 " + origin + "，用来访问该模块提供的成员。",
      import: "从 " + origin + " 导入的名称，供当前文件使用。",
    };
    names.set(name, {
      description: description || roles[role],
      source: file.path + " · 第 " + at + " 行",
    });
  }
}

function insertTerm(parent, text, label, meaning, prose) {
  const token = add(parent, "button", text, prose ? "name-term text-term" : "name-term");
  token.type = "button";
  token.dataset.name = label;
  token.dataset.meaning = typeof meaning === "string" ? meaning : meaning.description;
  if (meaning.source) token.dataset.definition = meaning.source;
}

function sourceNameRole(token, qualified, index, count, rest) {
  if (index < count - 1) return "用它访问后面的成员。";
  if (/^\s*\(/.test(rest)) return "这里调用 " + qualified + "，将括号内提供的值传给它。";
  if (index > 0) return "从 " + qualified.slice(0, -token.length).replace(/(?:\.|::|->)$/, "") + " 读取的成员。";
  if (/^\s*=(?!=)/.test(rest)) return "保存右侧表达式的结果。";
  if (/^\s*\[/.test(rest)) return "这里按方括号里的索引或键取它的一部分。";
  return "代码在这里引用的名称。它的值由对应的定义或赋值提供。";
}

function splitCodeTerms(node, meanings, prose, source = false, language = "") {
  const text = node.nodeValue;
  const parts = document.createDocumentFragment();
  const native = Boolean(source && /^(?:c|cc|cpp|cu|cuh|h|hpp|inl|js|css)$/.test(language));
  const keywords = language === "py" ? pythonKeywords : nativeKeywords;
  const formatAsCode = prose && !node.parentElement.closest("code");
  const shell = language === "sh" || language === "bash";
  if (source && shell && text.trimStart().startsWith("#")) return;
  let offset = 0;
  for (const match of text.matchAll(native ? nativeCodeNames : codeNames)) {
    const token = match[0];
    if (source && ((shell && /^[\$"]/.test(token)) || (language === "js" && token.startsWith(String.fromCharCode(96))))) {
      const fields = shell ? /(?<!\\)\$(?:\{([A-Za-z_]\w*)(?=[}:])|([A-Za-z_]\w*))/g : /(?<!\\)\$\{([^{}]+)\}/g;
      const substitutions = [...token.matchAll(fields)];
      if (substitutions.length) {
        parts.append(text.slice(offset, match.index));
        let last = 0;
        for (const field of substitutions) {
          const value = field[1] || field[2];
          const start = field.index + (field[1] ? 2 : 1);
          parts.append(token.slice(last, start));
          const interpolation = add(parts, "span", value, "interpolation-name");
          splitCodeTerms(interpolation.firstChild, meanings, prose, true, language);
          last = start + value.length;
        }
        parts.append(token.slice(last));
        offset = match.index + token.length;
        continue;
      }
    }
    if (!simpleName.test(token) || keywords.has(token)) continue;
    const keys = [...token.matchAll(/[A-Za-z_$][\w$]*/g)];
    const meaning = meanings.get(token);
    const rest = text.slice(match.index + token.length);
    if (!source && !keys.some(key => meanings.has(token.slice(0, key.index + key[0].length)))) continue;
    parts.append(text.slice(offset, match.index));
    const target = formatAsCode ? add(parts, "code") : parts;
    if (meaning && (keys.length === 1 || prose)) {
      insertTerm(target, token, token, meaning, prose);
    } else {
      let start = 0;
      for (const [index, {[0]: key, index: column}] of keys.entries()) {
        target.append(token.slice(start, column));
        const qualified = token.slice(0, column + key.length);
        const detail = meanings.get(qualified) || (source && sourceNameRole(key, qualified, index, keys.length, rest));
        if (detail) insertTerm(target, key, qualified, detail, prose);
        else target.append(key);
        start = column + key.length;
      }
    }
    offset = match.index + token.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function splitGlossaryTerms(node) {
  const text = node.nodeValue;
  const matches = [...text.matchAll(glossaryNames)];
  if (!matches.length) return [node];
  const parts = document.createDocumentFragment();
  const remaining = [];
  function appendText(value) {
    if (value) {
      const part = document.createTextNode(value);
      parts.append(part);
      remaining.push(part);
    }
  }
  let offset = 0;
  for (const match of matches) {
    const term = match[0];
    appendText(text.slice(offset, match.index));
    insertTerm(parts, term, term, glossary[term], true);
    offset = match.index + term.length;
  }
  appendText(text.slice(offset));
  node.replaceWith(parts);
  return remaining;
}

function splitMarkupTerms(node) {
  const text = node.nodeValue;
  const parts = document.createDocumentFragment();
  const tags = /<!--[\s\S]*?(?:-->|$)|<(\/?)([A-Za-z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  const attributes = /([A-Za-z_:][\w.:-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g;
  const meanings = {
    id: "这个元素在页面中的标识，可供样式、脚本或页内链接定位。",
    class: "为元素指定样式类，CSS 和 JavaScript 也可以用它找到这类元素。",
    href: "链接指向的地址。",
    src: "图像、视频或脚本等资源的来源地址。",
    alt: "描述图片内容的替代文本。",
    rel: "描述当前页面与链接资源的关系。",
    type: "说明此控件或资源的类型。",
  };
  let offset = 0;
  for (const match of text.matchAll(tags)) {
    const [whole, ending, name, body] = match;
    if (!name || (body && !/^[\s/]/.test(body))) continue;
    parts.append(text.slice(offset, match.index), "<" + ending);
    insertTerm(parts, name, name, (ending ? "结束" : "声明") + " " + name + " 元素。", false);
    let index = 0;
    for (const attribute of body.matchAll(attributes)) {
      const key = attribute[1];
      parts.append(body.slice(index, attribute.index));
      insertTerm(parts, key, key, Object.hasOwn(meanings, key) ? meanings[key] : name + " 元素的属性。", false);
      index = attribute.index + key.length;
    }
    parts.append(body.slice(index), ">");
    offset = match.index + whole.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function addExplanationTerms(panel, file, line) {
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (/[\w\u3400-\u9fff]/.test(node.nodeValue)) nodes.push(node);
  }
  const scopeMeanings = new Map();
  const language = file.path.split(".").at(-1).toLowerCase();
  const sourceLanguage = /^(?:py|cu|cuh|c|cc|cpp|h|hpp|inl|js|sh|bash|css|yml|yaml|cmake|in)$/.test(language)
    || /(?:^|\/)CMakeLists\.txt$/.test(file.path);
  for (const node of nodes) {
    const text = node.parentElement;
    if (!text || text.closest("button, a, input, select, svg, .kw, .comment, .line-note-header, .file-flow-caption")) continue;
    const locator = text.closest("[data-source-first], .expression-node[data-line]");
    const snippet = text.closest(".line-excerpt");
    const code = text.closest("code");
    const paragraph = text.closest(".line-note p, .line-note dd, .definition-return-meaning");
    if (snippet && /^html?$/.test(language)) {
      splitMarkupTerms(node);
      continue;
    }
    if (snippet || code || paragraph) {
      const first = Number(locator?.dataset.sourceFirst || locator?.dataset.line || line);
      const last = Number(locator?.dataset.sourceLast || first);
      const key = first + ":" + last;
      if (!scopeMeanings.has(key)) scopeMeanings.set(key, collectNameMeanings(file, first, last));
      const meanings = scopeMeanings.get(key);
      if (text.closest(".lit")) {
        const literal = node.nodeValue.match(/^["']([A-Za-z_]\w*)["']$/);
        if (literal && meanings.has(literal[1])) {
          const parts = document.createDocumentFragment();
          parts.append(node.nodeValue.at(0));
          insertTerm(parts, literal[1], literal[1], meanings.get(literal[1]), !snippet);
          parts.append(node.nodeValue.at(-1));
          node.replaceWith(parts);
        }
      } else {
        const source = Boolean(sourceLanguage && (snippet || code?.closest(".block-outline, .definition-return-code")));
        const fragments = paragraph && !code ? splitGlossaryTerms(node) : [node];
        for (const fragment of fragments) splitCodeTerms(fragment, meanings, !snippet, source, language);
      }
    }
  }
}

let nameTip;
let activeNameTerm;

function hideNameTip() {
  activeNameTerm?.removeAttribute("aria-describedby");
  activeNameTerm = null;
  if (nameTip) nameTip.hidden = true;
}

function showNameTip(term) {
  if (activeNameTerm === term) return;
  hideNameTip();
  if (!nameTip) {
    nameTip = add(document.body, "div", null, "name-tip");
    nameTip.id = "name-tip";
    nameTip.setAttribute("role", "tooltip");
    add(nameTip, "code");
    add(nameTip, "p");
    const origin = add(nameTip, "div", null, "name-tip-definition");
    add(origin, "span", "定义于");
    add(origin, "code");
  }
  activeNameTerm = term;
  nameTip.querySelector("code").textContent = term.dataset.name;
  nameTip.querySelector("p").textContent = term.dataset.meaning;
  const origin = nameTip.querySelector(".name-tip-definition");
  origin.hidden = !term.dataset.definition;
  origin.querySelector("code").textContent = term.dataset.definition || "";
  term.setAttribute("aria-describedby", nameTip.id);
  nameTip.hidden = false;
  const anchor = term.getBoundingClientRect();
  const excerpt = term.closest(".line-excerpt")?.getBoundingClientRect();
  const room = document.documentElement.clientWidth - nameTip.offsetWidth - 12;
  const x = Math.max(12, Math.min(room, anchor.left + (anchor.width - nameTip.offsetWidth) / 2));
  const below = (excerpt?.bottom ?? anchor.bottom) + 8;
  const above = (excerpt?.top ?? anchor.top) - nameTip.offsetHeight - 8;
  const y = below + nameTip.offsetHeight < innerHeight ? below : Math.max(8, above);
  nameTip.style.left = x + "px";
  nameTip.style.top = y + "px";
}

for (const event of ["pointerover", "focusin", "click"]) {
  document.addEventListener(event, action => {
    const term = action.target.closest?.(".name-term");
    if (term) showNameTip(term);
    else if (event === "click") hideNameTip();
  });
}
document.addEventListener("pointerout", event => {
  if (event.target === activeNameTerm && !activeNameTerm.matches(":focus-visible")) hideNameTip();
});
document.addEventListener("focusout", event => {
  if (event.target === activeNameTerm) hideNameTip();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideNameTip();
});
window.addEventListener("scroll", hideNameTip, {capture: true, passive: true});
window.addEventListener("resize", hideNameTip);
