const decoderSourcePath = "scene/network.py";
const decoderOutputs = [
  {key: "v", start: 0, end: 3, line: 600, label: "平移相关", detail: "与 w 一起用于计算高斯中心位移。"},
  {key: "w", start: 3, end: 6, line: 601, label: "旋转相关", detail: "与 v 一起构造用于计算中心位移的 SE(3) 变换。"},
  {key: "r", start: 6, end: 10, line: 602, label: "旋转四元数"},
  {key: "s", start: 10, end: 13, line: 603, label: "尺度变化", detail: "这三列分别给出三个轴向的对数尺度变化。"},
];

function jumpFromDecoder(line, keyboard) {
  navigateReader(() => {
    moveToSource(decoderSourcePath, line);
    const panel = reading.querySelector(".decoder-graphic");
    revealVisualization(panel);
    if (keyboard) panel?.querySelector('[data-decoder-line="' + line + '"]')?.focus({preventScroll: true});
  });
}

function decoderStage(svg, line, label, selected, bounds) {
  const group = svgElement(svg, "g", {
    role: "button", tabindex: 0, "aria-label": label + "，跳到源码第 " + line + " 行",
    "aria-pressed": String(selected), "data-decoder-line": line, class: "decoder-stage",
  });
  svgElement(group, "rect", {...bounds, rx: 10, class: "decoder-stage-target"});
  group.addEventListener("click", () => jumpFromDecoder(line, false));
  group.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    jumpFromDecoder(line, true);
  });
  return group;
}
function decoderArrow(svg,x,y,right,color="#7b8fb7") {
  svgElement(svg,"path",{d:"M"+x+" "+y+" H"+right+" m-5 -4 l5 4 -5 4",fill:"none",stroke:color,"stroke-width":1.4,"stroke-linecap":"round","stroke-linejoin":"round"});
}
function drawDecoderArchitecture(panel, line) {
  const svg=svgElement(panel,"svg",{viewBox:"0 0 570 182",class:"network-picture",role:"group","aria-label":"高斯形变解码器的张量流向"});
  const text=(x,y,value,style="",parent=svg)=>svgElement(parent,"text",{x,y,"text-anchor":"middle",class:style},value);
  const wire=(d,color="#8399c9")=>svgElement(svg,"path",{d,fill:"none",stroke:color,"stroke-width":1.35,"stroke-linecap":"round","stroke-linejoin":"round"});
  const feature=(x,y,label,color)=>{
    text(x+30,y-7,label);
    for(let row=0;row<3;row++) {
      for(let col=0;col<5;col++) {
        svgElement(svg,"rect",{x:x+col*12,y:y+row*9,width:9,height:6.8,rx:1.3,fill:color,opacity:.39+((row*3+col*5)%7)*.083});
      }
    }
    text(x+30,y+39,"N × 16","width");
  };
  feature(12,23,"z_t", "#6c8ecd");
  feature(12,100,"l", "#5a9faa");
  wire("M72 35 H96 Q104 35 104 43 V63 Q104 71 112 71 H129");
  wire("M72 112 H96 Q104 112 104 104 V79 Q104 71 112 71 H129");
  decoderArrow(svg,115,71,129);
  const concat = decoderStage(svg, 598, "拼接 z_t 和 l", line === 598, {x: 124, y: 8, width: 58, height: 121});
  text(155,24,"拼接","",concat);
  for(let row=0;row<5;row++) {
    for(let col=0;col<3;col++) {
      svgElement(concat,"rect",{x:137+col*12,y:43+row*11,width:9,height:8,rx:1.4,fill:row<2?"#779add":"#7bb9c8"});
    }
  }
  text(153,119,"N × 32","width",concat);
  decoderArrow(svg,174,71,199);
  const mlp = decoderStage(svg, 591, "两层 Linear 和 GELU", line >= 591 && line <= 594, {x: 207, y: 7, width: 223, height: 131});
  mlp.classList.add("decoder-mlp-stage");
  text(318,27,"MLP","",mlp);
  const ys=[46,63,80,97,114], zs=[53,70,87,104];
  for(const a of ys) for(const b of zs) svgElement(mlp,"line",{x1:264,y1:a,x2:370,y2:b,stroke:"#7895cd","stroke-width":1,opacity:.42});
  for(const [x,values,stroke] of [[264,ys,"#587dc5"],[370,zs,"#536ac3"]]) {
    for(const y of values) {
      svgElement(mlp,"circle",{cx:x,cy:y,r:6,fill:"#f5f9ff",stroke,"stroke-width":1.8});
      svgElement(mlp,"circle",{cx:x,cy:y,r:2.3,fill:stroke});
    }
  }
  text(264,126,"Linear + GELU","light",mlp);
  text(370,126,"Linear + GELU","light",mlp);
  text(318,156,"N × 128   →   N × 128","width");
  decoderArrow(svg,433,71,460);
  const head = decoderStage(svg, 599, "线性输出 13 个分量", line === 595 || line === 599, {x: 460, y: 8, width: 108, height: 121});
  text(510,24,"线性输出","",head);
  const colors=["#6293c2","#6293c2","#6293c2","#5a96a1","#5a96a1","#5a96a1","#6f85d0","#6f85d0","#6f85d0","#6f85d0","#9c7cbb","#9c7cbb","#9c7cbb"];
  for(let row=0;row<3;row++) {
    for(let col=0;col<13;col++) svgElement(head,"rect",{x:468+col*6.5,y:54+row*12,width:4.6,height:8,rx:1,fill:colors[col],opacity:row===1?1:.69});
  }
  text(508,108,"N × 13","width",head);
  text(53,169,"时间特征 · 局部特征","light");
  text(504,150,"每个高斯一行","light");
  return svg;
}

function appendDecoderDiagram(path, line) {
  const inDecoder = line >= 588 && line <= 604;
  const inFusion = line >= 646 && line <= 650;
  if (path !== decoderSourcePath || (!inDecoder && !inFusion)) return null;

  const panel = add(reading, "section", null, "decoder-graphic");
  panel.dataset.visualization = "decoder";
  const header = add(panel, "div", null, "diagram-head");
  add(header, "h2", "高斯形变解码器");
  add(header, "small", "Bat 配置 · N 为高斯个数");
  drawDecoderArchitecture(panel, line);

  add(panel, "h3", "13 个输出分量");
  const output = add(panel, "div", null, "decoder-output");
  for (const group of decoderOutputs) {
    const button = add(output, "button");
    button.type = "button";
    button.dataset.decoderLine = group.line;
    button.setAttribute("aria-pressed", String(group.line === line));
    add(button, "code", group.key + " ");
    button.append(group.label);
    const cells = add(button, "span", null, "decoder-cells");
    for (let index = group.start; index < group.end; index++) add(cells, "span", String(index));
    button.onclick = event => jumpFromDecoder(group.line, event.detail === 0);
  }

  const selected = decoderOutputs.find(group => group.line === line);
  if (selected?.key === "r") {
    drawDecoderRotation(panel);
  } else if (selected) {
    add(panel, "p", selected.detail, "decoder-detail");
  } else if (line === 604) {
    const detail = add(panel, "p", "函数返回顺序 ", "decoder-detail");
    add(detail, "code", "v, w, s, r");
  } else if (inFusion) {
    const detail = add(panel, "p", null, "decoder-detail");
    add(detail, "code", "z_t = l @ g_t.T");
    detail.append(" 把目标时刻的共享状态与每个高斯的局部特征结合。");
  }
  return panel;
}
function drawDecoderRotation(panel) {
  const demo=add(panel,"section",null,"shape-demo");
  const title=add(demo,"header");
  add(title,"h3","r 如何改变高斯朝向");
  add(title,"code","r = out[:, 6:10]");
  const svg=svgElement(demo,"svg",{viewBox:"0 0 570 102",role:"img","aria-label":"同一个高斯的投影在旋转前后呈现不同朝向"});
  const grad=svgElement(svgElement(svg,"defs"),"radialGradient",{id:"showcase-fade"});
  svgElement(grad,"stop",{offset:"0%","stop-color":"#547bd0","stop-opacity":.88});
  svgElement(grad,"stop",{offset:"60%","stop-color":"#7a9be9","stop-opacity":.56});
  svgElement(grad,"stop",{offset:"100%","stop-color":"#8faeec","stop-opacity":.015});
  const stamp=(x,angle,label)=>{
    svgElement(svg,"path",{d:"M"+(x-65)+" 47 H"+(x+65)+" M"+x+" 12 V82",stroke:"#b6c5df","stroke-width":1,"stroke-dasharray":"3 5"});
    const g=svgElement(svg,"g",{transform:"translate("+x+" 47) rotate("+angle+")"});
    svgElement(g,"ellipse",{rx:64,ry:28,fill:"url(#showcase-fade)"});
    svgElement(g,"ellipse",{rx:43,ry:18,fill:"none",stroke:"#7292d3","stroke-opacity":.65,"stroke-width":1});
    svgElement(g,"path",{d:"M-49 0 H50 m-5 -4 l5 4 -5 4",fill:"none",stroke:"#3f68b6","stroke-width":1.55});
    svgElement(g,"circle",{r:3.1,fill:"#355daf",stroke:"#eaf3ff","stroke-width":1.15});
    svgElement(svg,"text",{x,y:98,"text-anchor":"middle",class:"light"},label);
  };
  stamp(144,0,"原朝向");
  stamp(430,-34,"施加旋转后");
  decoderArrow(svg,237,47,334);
  svgElement(svg,"text",{x:285,y:37,"text-anchor":"middle",class:"light"},"旋转示意");
}
