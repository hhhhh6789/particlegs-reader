function buildCoreDiagrams(onJump) {
  const network = "scene/network.py";
  const deformation = "scene/deform_model.py";
  const train = "train.py";
  const render = "render.py";
  const cuda = "submodules/depth-diff-gaussian-rasterization/cuda_rasterizer/";
  const forward = cuda + "forward.cu";
  const raster = cuda + "rasterizer_impl.cu";
  const blue = "#6b8acd";
  const cyan = "#5095a0";
  const violet = "#8970b6";
  const amber = "#b8794c";
  const ink = "#2a416f";
  const edge = "#8299c4";
  const svg = svgElement;

  function label(parent, x, y, text, kind = "") {
    return svg(parent, "text", {x, y, "text-anchor": "middle", class: kind}, text);
  }
  function wire(parent, d, opts = {}) {
    return svg(parent, "path", {d, fill: "none", stroke: edge, "stroke-width": 1.7,
      "stroke-linecap": "round", "stroke-linejoin": "round", ...opts});
  }
  function arrow(parent, d, opts = {}) {
    return wire(parent, d, {"marker-end": "url(#figure-arrow)", ...opts});
  }
  function vector(panel, width, height, title) {
    const canvas = svg(panel, "svg", {viewBox: "0 0 " + width + " " + height, role: "group", "aria-label": title});
    const marker = svg(svg(canvas, "defs"), "marker", {id: "figure-arrow", viewBox: "0 0 8 8",
      markerWidth: 6, markerHeight: 6, refX: 7, refY: 4, orient: "auto"});
    svg(marker, "path", {d: "M1 1 L7 4 L1 7", fill: "none", stroke: edge, "stroke-linejoin": "round", "stroke-linecap": "round"});
    return canvas;
  }
  function target(parent, x, y, w, h, path, line, title, caption, end = line) {
    const node = svg(parent, "g", {class: "figure-target", role: "button", tabindex: 0,
      "data-path": path, "data-line": line, "data-end-line": end,
      "aria-label": title + "，源码第 " + line + " 行", "aria-pressed": "false"});
    svg(node, "rect", {x, y, width: w, height: h, rx: 14, class: "figure-hitbox"});
    label(node, x + w / 2, y + 22, title, "target-title");
    if (caption) label(node, x + w / 2, y + h - 11, caption, "hint");
    node.addEventListener("click", () => onJump(path, line, false));
    node.addEventListener("keydown", event => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      onJump(path, line, true);
    });
    return node;
  }
  function matrix(parent, x, y, cols, rows, palette, pitch = 9) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        svg(parent, "rect", {x: x + pitch * col, y: y + pitch * row, rx: 1.4,
          width: pitch - 2.1, height: pitch - 2.1, fill: palette[col % palette.length],
          opacity: .38 + ((row * 3 + col * 5) % 7) * .09});
      }
    }
  }
  function dense(parent, x, y, w, h, color) {
    const first = [0, 1, 2, 3, 4].map(i => y + h * i / 4);
    const second = [0, 1, 2, 3].map(i => y + h * (.12 + i * .25));
    for (const a of first) for (const b of second) svg(parent, "line",
      {x1: x, y1: a, x2: x + w, y2: b, stroke: color, "stroke-opacity": .38, "stroke-width": 1.2});
    for (const [xx, pts] of [[x, first], [x + w, second]]) {
      for (const yy of pts) {
        svg(parent, "circle", {cx: xx, cy: yy, r: 4.9, fill: "#f7fbff", stroke: color, "stroke-width": 1.55});
        svg(parent, "circle", {cx: xx, cy: yy, r: 1.9, fill: color});
      }
    }
  }
  function gaussian(parent, x, y, width, height, angle = 0, color = blue) {
    const shape = svg(parent, "g", {transform: "translate(" + x + " " + y + ") rotate(" + angle + ")"});
    for (const [scale, opacity] of [[1, .13], [.79, .23], [.56, .38]]) {
      svg(shape, "ellipse", {rx: width * scale, ry: height * scale, fill: color, opacity});
    }
    svg(shape, "ellipse", {rx: width * .82, ry: height * .82, fill: "none", stroke: color, "stroke-width": 1.1});
    svg(shape, "circle", {r: 2.65, fill: "#f6fbff", stroke: color, "stroke-width": 1.15});
    return shape;
  }
  function clouds(parent, x, y, scale, mode) {
    const points = [[7,35],[19,17],[25,62],[33,39],[36,26],[42,62],[51,36],[53,11],
      [57,52],[67,20],[70,41],[74,68],[82,56],[89,26],[91,44],[101,63],[112,37],[117,15],[121,58]];
    const picked = new Set([1, 5, 9, 10, 13, 16]);
    const moving = new Set([8, 10, 12, 13, 14, 16, 18]);
    if (mode === "neighbors") {
      const rings = svg(parent, "g", {transform: "translate(" + (x + 70 * scale) + " " + (y + 41 * scale) + ")"});
      svg(rings, "circle", {r: 25 * scale, fill: "#aac3f0", "fill-opacity": .28, stroke: blue, "stroke-dasharray": "3 3"});
      for (const i of [6,8,9,12,14]) wire(rings, "M0 0 L" + (points[i][0] - 70) * scale + " " + (points[i][1] - 41) * scale);
    }
    points.forEach(([a, b], index) => {
      const cx = x + a * scale, cy = y + b * scale;
      const fill = moving.has(index) ? amber : blue;
      const center = mode === "centers" && picked.has(index) || mode === "neighbors" && index === 10;
      svg(parent, "circle", {cx, cy, r: center ? 4 : 2.7, fill, opacity: center ? 1 : .85});
      if (center) svg(parent, "circle", {cx, cy, r: 7.5, fill: "none", stroke: ink, "stroke-width": 1.35});
    });
  }
  function tileImage(parent, x, y, size, phase, kind = "frame") {
    const palette = ["#ebf2fc", "#bacde8", "#7395c8", "#495e99"];
    const n = 7, step = size / n;
    for (let row = 0; row < n; row++) for (let col = 0; col < n; col++) {
      const a = col - 3.1 - phase * .72, b = row - 3.1 + phase * .28;
      const field = (a - b * .58) ** 2 + (b + a * .21) ** 2 * 2.6;
      const q = field < 1.1 ? 3 : field < 3.6 ? 2 : field < 6.5 ? 1 : 0;
      const before = (col - 2.7) ** 2 + (row - 3.15) ** 2 * 2.1;
      const diff = Math.abs((before < 2.7 ? 2 : 0) - (q > 1 ? 2 : 0));
      const fill = kind === "diff" ? (diff ? "#d99a7a" : "#ecf2fc") : palette[q];
      svg(parent, "rect", {x: x + col * step, y: y + row * step,
        width: step - .7, height: step - .7, fill, rx: 1.15});
    }
  }

  const figures = {
    network: {
      name: "网络总览", path: network, line: 655, summary: "l 保留逐高斯信息，g₀ 沿时间演化。两条路径在解码器重新汇合。",
      draw(panel) {
        const pic = vector(panel, 700, 333, "ParticleGS 神经动力学网络的两条特征路径");
        const input = target(pic, 7, 99, 125, 117, train, 227, "高斯特征", "N × 14");
        matrix(input, 31, 137, 9, 4, [blue, blue, cyan, violet, amber], 8);
        const encoder = target(pic, 157, 99, 131, 117, network, 655, "编码器", "产生 l、g₀");
        dense(encoder, 190, 142, 62, 43, blue);
        const local = target(pic, 323, 12, 145, 98, network, 473, "局部特征 l", "N × l_dim");
        matrix(local, 361, 49, 8, 3, [cyan], 8.5);
        const ode = target(pic, 323, 149, 145, 104, network, 659, "ODE 演化", "g₀ → g_t");
        wire(ode, "M350 213 C368 176 402 219 438 183", {stroke: violet, "stroke-width": 2.6});
        for (const [x,y] of [[350,213],[370,194],[398,199],[438,183]]) svg(ode, "circle", {cx:x,cy:y,r:3.8,fill:violet});
        const decoder = target(pic, 514, 99, 174, 117, network, 662, "解码器", "每个高斯输出形变参数");
        gaussian(decoder, 561, 157, 23, 13, 0, blue);
        gaussian(decoder, 641, 155, 25, 11, -28, violet);
        arrow(decoder, "M592 157 H610");
        arrow(pic, "M134 159 H153");
        arrow(pic, "M290 147 H306 V61 H318");
        arrow(pic, "M290 173 H306 V201 H318");
        arrow(pic, "M470 61 H491 V147 H509");
        arrow(pic, "M470 201 H491 V173 H509");
        label(pic, 304, 231, "g₀", "symbol");
        label(pic, 496, 231, "g_t", "symbol");
        wire(pic, "M601 222 V276 H405", {"stroke-dasharray": "4 4"});
        target(pic, 157, 256, 242, 62, network, 664, "返回 v、w、s、r", "交给 DeformModel");
      },
    },
    neighborhood: {
      name: "高斯特征与近邻", path: network, line: 210, summary: "先通过 FPS 选中心，再按空间距离为每个中心收集近邻。点云使用示意坐标。",
      draw(panel) {
        const pic = vector(panel, 700, 325, "从十四维特征到点云采样中心和近邻");
        const pack = target(pic, 8, 9, 684, 96, train, 227, "每个高斯的 14 维特征", "");
        const segments = [[3, blue, "中心"],[3, "#658cb4","零阶球谐"],[4,violet,"旋转"],[3,cyan,"尺度"],[1,amber,"不透明度"]];
        let offset = 28;
        for (const [count, color, title] of segments) {
          for (let i=0;i<count;i++) svg(pack,"rect",{x:offset+43*i,y:46,width:38,height:17,rx:4,fill:color,opacity:.75});
          label(pack, offset + (count * 43 - 5) / 2, 85, title + " " + count, "hint");
          offset += count * 43 + 7;
        }
        const a = target(pic, 8, 138, 200, 164, network, 196, "普通 FPS", "均匀覆盖空间");
        clouds(a, 36, 182, 1.08, "centers");
        const b = target(pic, 250, 138, 200, 164, network, 188, "运动感知 FPS", "有位移时可优先采高运动区", 194);
        clouds(b, 279, 182, 1.08, "motion");
        for (const [x,y] of [[354,226],[375,213],[378,230],[401,222],[409,245]])
          svg(b,"circle",{cx:x,cy:y,r:7,fill:"none",stroke:amber,"stroke-width":1.5});
        const c = target(pic, 491, 138, 200, 164, network, 210, "KNN 取邻点", "每个中心的近邻特征成组");
        clouds(c, 520, 182, 1.08, "neighbors");
        arrow(pic,"M352 110 V125 H108 V133");
        arrow(pic,"M352 110 V133");
        arrow(pic,"M350 311 V319 H591 V307");
        arrow(pic,"M109 310 V319 H350");
      },
    },
    attention: {
      name: "组编码与注意力", path: network, line: 454, summary: "上半图在每组内部聚合邻点，下半图用 Bat 配置显示组数如何压缩。",
      draw(panel) {
        const pic = vector(panel, 700, 353, "组编码、最大池化以及交叉注意力逐步减少组数");
        const conv = target(pic, 8, 13, 194, 115, network, 245, "逐邻点卷积", "组内仍有 K 个邻点");
        matrix(conv, 59, 52, 11, 4, [blue,cyan], 8);
        const pool = target(pic, 250, 13, 205, 115, network, 246, "最大池化再拼回", "把组内摘要拼回每个邻点", 249);
        matrix(pool, 288, 52, 11, 3, [blue,cyan], 8);
        const poolGlyph = svg(pool,"g",{transform:"translate(388 51)"});
        for(let k=0;k<4;k++) svg(poolGlyph,"rect",{x:0,y:9*k,width:35,height:6,rx:2,fill:violet,opacity:.65});
        const result = target(pic, 501, 13, 190, 115, network, 250, "得到组向量", "每组保留一个向量", 251);
        matrix(result, 546, 61, 12, 1, [violet], 8);
        arrow(pic,"M205 70 H246");
        arrow(pic,"M459 70 H497");

        const ladder = target(pic, 8, 156, 684, 107, network, 454, "CrossBlock 逐级压缩组数", "组数示例来自 Bat 配置", 461);
        [2048,1024,256,64,16].forEach((count,i)=>{
          const x=65+137*i, n=[12,10,8,6,4][i];
          for(let j=0;j<n;j++) svg(ladder,"circle",{cx:x-((n-1)*5)/2+j*5,cy:204+Math.sin(j)*4,r:3,fill:blue,opacity:.72});
          label(ladder,x,231,String(count),"symbol");
          if(i<4) arrow(ladder,"M"+(x+36)+" 205 H"+(x+105));
        });
        const heat = target(pic, 8, 276, 326, 67, network, 362, "交叉注意力权重", "", 363);
        matrix(heat, 133, 305, 11, 3, [violet], 7);
        target(pic, 365, 276, 326, 67, network, 493, "交替运行 CrossBlock / SelfBlock", "SelfBlock 更新特征，保留组数");
      },
    },
    ode: {
      name: "ODE 变化率网络", path: network, line: 566, summary: "上半图把当前状态映射成变化率，下半图展示 RK4 如何用变化率推进状态。",
      draw(panel) {
        const pic = vector(panel, 700, 366, "两个带时间输入的 MLP、相加以及 RK4 状态演化");
        const inBox = target(pic, 7, 21, 118, 113, network, 564, "输入 g 和 t", "拼接状态与时间");
        matrix(inBox, 32, 57, 8, 3, [blue,blue,blue,amber], 8);
        const one = target(pic, 153, 21, 136, 113, network, 565, "net1", "输出 h1");
        dense(one, 181, 58, 79, 40, blue);
        const two = target(pic, 327, 21, 142, 113, network, 566, "net2", "拼接 h1 和 t");
        dense(two, 358, 58, 80, 40, violet);
        const out = target(pic, 550, 21, 141, 113, network, 567, "变化率 dg/dt", "与 g 同形状");
        matrix(out, 585, 57, 8, 3, [violet], 8);
        arrow(pic,"M129 79 H149");
        arrow(pic,"M292 79 H323");
        arrow(pic,"M472 79 H496");
        arrow(pic,"M519 79 H546");
        wire(pic,"M307 80 V150 H507 V94",{stroke:blue});
        svg(pic,"circle",{cx:507,cy:79,r:11,fill:"#e1eafa",stroke:edge});
        label(pic,507,84,"+","symbol");
        label(pic,409,169,"h1 跳接到输出","hint");

        const rk = target(pic, 8, 189, 683, 162, network, 643, "RK4 从起始状态推进到目标时刻", "曲线为示意。每个时间步依据多次变化率估计更新状态。");
        wire(rk,"M50 305 H650 M50 305 V232",{stroke:"#a5b4d0"});
        wire(rk,"M65 252 C187 276 302 215 420 242 S580 266 634 228",{stroke:violet,"stroke-width":2.7});
        for(const [x,y] of [[65,252],[163,258],[260,242],[354,231],[449,249],[543,255],[634,228]]) {
          svg(rk,"circle",{cx:x,cy:y,r:4,fill:violet});
        }
        label(rk,66,323,"g_start","symbol");
        label(rk,633,323,"g_t[-1]","symbol");
      },
    },
    transform: {
      name: "形变如何作用到高斯", path: deformation, line: 28, summary: "v、w 先构造逐高斯的刚体变换。中心位移与高斯自身的旋转、尺度变化走不同的计算路径。",
      draw(panel) {
        const pic = vector(panel, 700, 318, "SE(3) 计算中心位移，并分别调整高斯旋转和尺度");
        const params = target(pic, 8, 13, 149, 128, deformation, 23, "v、w", "w 的模长作为 θ");
        arrow(params,"M39 102 L113 54");
        wire(params,"M65 88 A26 26 0 0 0 94 110",{stroke:violet,"stroke-width":2});
        label(params,114,61,"v","symbol");
        label(params,82,116,"w","symbol");
        const transform = target(pic, 188, 13, 180, 128, deformation, 27, "生成 SE(3) 变换", "exp_se3");
        matrix(transform, 250, 53, 4, 4, [violet,violet,blue,cyan], 14);
        const shift = target(pic, 399, 13, 293, 128, deformation, 28, "得到中心位移 d_xyz", "新中心减原中心");
        gaussian(shift,469,104,32,18,0,blue);
        gaussian(shift,627,63,32,18,0,violet);
        arrow(shift,"M490 99 L598 70");
        arrow(pic,"M160 80 H184");
        arrow(pic,"M372 80 H395");
        const rotation = target(pic, 81, 167, 239, 127, "gaussian_renderer/__init__.py", 90, "r 更新朝向", "与基础旋转四元数相乘");
        gaussian(rotation,136,231,34,14,0,blue);
        gaussian(rotation,266,230,34,14,-32,violet);
        arrow(rotation,"M176 231 H217");
        const scale = target(pic, 379, 167, 239, 127, "gaussian_renderer/__init__.py", 85, "s 更新尺度", "在对数尺度上加变化量");
        gaussian(scale,433,231,23,15,0,blue);
        gaussian(scale,563,231,40,22,0,cyan);
        arrow(scale,"M464 231 H511");
      },
    },
    raster: {
      name: "高斯光栅化", path: forward, line: 346, summary: "选中一个像素后，图里突出覆盖它的高斯和颜色合成顺序。",
      draw(panel) {
        const pic = vector(panel, 700, 316, "投影、屏幕分块、深度排序和一个像素的 alpha 合成");
        const project = target(pic, 7, 13, 207, 137, forward, 216, "投影为屏幕椭圆", "三维协方差 → 二维协方差");
        gaussian(project,65,79,30,18,-26,blue);
        gaussian(project,159,94,28,12,18,violet);
        arrow(project,"M98 87 H126");
        const tiles = target(pic, 248, 13, 207, 137, raster, 290, "分配到屏幕小块", "记录此高斯覆盖的 tile", 299);
        for(let i=0;i<6;i++) for(let j=0;j<4;j++) svg(tiles,"rect",{x:307+i*15,y:49+j*15,width:14,height:14,
          fill:i>=1&&i<=4&&j>=1&&j<=2?"#c2d5f1":"#eef3fb",stroke:"#c0cde3","stroke-width":.55});
        gaussian(tiles,351,77,45,20,-20,blue);
        const sort = target(pic, 489, 13, 203, 137, raster, 304, "按 tile 和深度排序", "同一 tile 内近 → 远", 322);
        for(const [i,c] of [[0,blue],[1,cyan],[2,violet]]) gaussian(sort,541+i*47,91-(i%2)*6,23,17,-16,c);
        arrow(pic,"M218 80 H244");
        arrow(pic,"M459 80 H485");

        const alpha = target(pic, 7, 179, 685, 126, forward, 346, "像素按顺序累积颜色和深度", "每个高斯贡献由 α 和剩余透过率 T 决定", 359);
        for(const [i,c] of [[0,blue],[1,cyan],[2,violet]]) {
          gaussian(alpha,113+i*108,245,35,17,0,c);
          if(i<2) arrow(alpha,"M"+(153+i*108)+" 246 H"+(180+i*108));
        }
        arrow(alpha,"M381 246 H464");
        svg(alpha,"rect",{x:486,y:222,width:56,height:48,rx:6,fill:"#8c9cce",stroke:edge});
        svg(alpha,"rect",{x:506,y:236,width:16,height:18,rx:2,fill:"#e5eaff"});
        label(alpha,593,251,"选中像素","hint");
      },
    },
    training: {
      name: "训练与反向传播", path: train, line: 262, summary: "比较同一视角的预测图和真实图。图块表示流程，训练图中的差异并非实测像素误差。",
      draw(panel) {
        const pic = vector(panel, 700, 364, "预测帧、真实帧、图像损失和两个优化器");
        const predicted = target(pic, 8, 14, 173, 142, train, 240, "渲染预测图", "相机 + 高斯 + 形变", 249);
        tileImage(predicted,61,47,70,.9);
        const truth = target(pic, 232, 14, 173, 142, train, 250, "真实图像", "同一训练视角", 251);
        tileImage(truth,284,47,70,-.45);
        const loss = target(pic, 474, 14, 218, 142, train, 252, "图像损失", "L1 + DSSIM 按权重混合", 261);
        tileImage(loss,549,47,70,1.15,"diff");
        arrow(pic,"M184 75 H218 V172 H445 V93 H469");
        arrow(pic,"M409 92 H469");
        target(pic, 265, 196, 179, 63, train, 262, "反向传播", "loss.backward()");
        arrow(pic,"M583 158 V228 H449");
        target(pic, 8, 284, 283, 65, train, 380, "基础高斯优化器", "按训练阶段更新");
        target(pic, 404, 284, 288, 65, train, 383, "动力学网络优化器", "更新网络权重");
        arrow(pic,"M318 262 V273 H152 V280");
        arrow(pic,"M391 262 V273 H548 V280");
      },
    },
    extrapolation: {
      name: "逐时刻外推", path: render, line: 149, summary: "推理读取视角的 fid，同时保留对应相机。时间轴沿用 render.py 的指标分界 0.75。",
      draw(panel) {
        const pic = vector(panel, 700, 302, "加载同一组权重，按视角时间预测并渲染");
        const weights = target(pic, 9, 11, 194, 113, render, 241, "加载模型权重", "基础高斯与形变网络");
        for(let i=0;i<3;i++) {
          svg(weights,"rect",{x:71+i*8,y:68-i*7,width:60,height:25,rx:5,fill:"#d6e3fa",stroke:blue});
        }
        const time = target(pic, 246, 11, 207, 113, render, 149, "用视角时间 fid 预测", "deform.step(feature, fid, True)");
        wire(time,"M281 86 C312 51 342 81 370 69 S401 50 427 56",{stroke:violet,"stroke-width":2.5});
        for(const [x,y] of [[281,86],[330,67],[370,69],[427,56]]) svg(time,"circle",{cx:x,cy:y,r:4.4,fill:violet});
        const frame = target(pic, 497, 11, 195, 113, render, 155, "按相机渲染", "输出该时刻的画面");
        tileImage(frame,570,46,51,.9);
        arrow(pic,"M207 67 H241");
        arrow(pic,"M458 67 H492");
        const frames = target(pic, 9, 144, 683, 143, render, 162, "按 0.75 分别统计指标", "下方图块为时序示意");
        wire(frames,"M61 235 H492",{stroke:blue,"stroke-width":3.7});
        wire(frames,"M492 235 H646",{stroke:violet,"stroke-width":3.7});
        [102,239,385,548,624].forEach((x,i)=>{
          tileImage(frames,x-20,178,40,(i-1)*.9);
          svg(frames,"circle",{cx:x,cy:235,r:3.7,fill:i<3?blue:violet});
        });
        wire(frames,"M492 174 V252",{stroke:violet,"stroke-dasharray":"4 4"});
        label(frames,105,253,"fid ≤ 0.75","symbol");
        label(frames,593,253,"fid > 0.75","symbol");
      },
    },
    divergence: {
      name: "散度正则", path: deformation, line: 226, summary: "以默认 SPH 分支为例。根据相邻高斯的位移变化估计局部散度，取平方均值作为训练中的正则项。",
      draw(panel) {
        const pic = vector(panel, 700, 292, "位移向量、核梯度和局部散度的结构示意");
        const points = target(pic, 7, 12, 347, 232, deformation, 203, "邻域点和位移向量", "中心与近邻的相对位置、相对位移", 217);
        svg(points,"circle",{cx:182,cy:125,r:76,stroke:blue,"stroke-dasharray":"4 6",fill:"#dce9fa","fill-opacity":.65});
        for(const [x,y,dx,dy] of [[130,82,-27,-24],[209,70,14,-32],[246,124,28,0],
          [209,180,15,28],[134,164,-22,21],[182,125,8,-9]]) {
          svg(points,"circle",{cx:x,cy:y,r:5.1,fill:blue,stroke:"#fff","stroke-width":1.1});
          arrow(points,"M"+x+" "+y+" L"+(x+dx)+" "+(y+dy),{stroke:violet});
        }
        const grad = target(pic, 397, 12, 294, 137, deformation, 221, "加权估计局部散度", "位移差 · 核梯度，再按权重求和", 226);
        wire(grad,"M428 108 H659",{stroke:"#b3c2db"});
        wire(grad,"M452 107 C491 106 518 59 548 60 S599 105 637 107",{stroke:violet,"stroke-width":2.8});
        target(pic, 397, 178, 294, 66, deformation, 228, "散度平方取均值", "加入图像损失");
        arrow(pic,"M358 118 H393");
        arrow(pic,"M542 153 V173");
      },
    },
  };

  return figures;
}
