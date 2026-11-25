const coreVisualizations = new Map();
let preferredVisualization = null;

function findVisualization(id) {
  return reading.querySelector('[data-visualization="' + id + '"]');
}

function revealVisualization(panel) {
  if (!panel) return;
  const view = reading.getBoundingClientRect();
  const area = panel.getBoundingClientRect();
  const inset = 12;
  if (area.height + inset * 2 > reading.clientHeight || area.top < view.top + inset) {
    reading.scrollTop += area.top - view.top - inset;
  } else if (area.bottom > view.bottom - inset) {
    reading.scrollTop += area.bottom - view.bottom + inset;
  }
}

function visibleVisualizations() {
  const {top, bottom} = reading.getBoundingClientRect();
  return Array.from(reading.querySelectorAll("[data-visualization]"))
    .map(panel => {
      const area = panel.getBoundingClientRect();
      return {
        id: panel.dataset.visualization,
        height: Math.min(bottom, area.bottom) - Math.max(top, area.top),
      };
    })
    .filter(item => item.height > 0)
    .sort((a, b) => b.height - a.height)
    .map(item => item.id);
}

function restoreVisibleVisualization(ids) {
  const panel = ids.map(findVisualization).find(Boolean);
  revealVisualization(panel);
}

function jumpToVisualization(id, path, line, keyboard = false) {
  navigateReader(() => {
    preferredVisualization = coreVisualizations.has(id) ? id : null;
    odeChapter = null;
    moveToSource(path, line);
    const panel = findVisualization(id);
    revealVisualization(panel);
    if (keyboard) panel?.querySelector('.figure-target[aria-pressed="true"]')?.focus({preventScroll: true});
  });
}

function matchesVisualizationTarget(target, path, line) {
  return target.dataset.path === path
    && line >= Number(target.dataset.line)
    && line <= Number(target.dataset.endLine);
}

function appendCoreVisualization(path, line) {
  const matches = [...coreVisualizations.values()].filter(figure =>
    figure.targets.some(target => matchesVisualizationTarget(target, path, line)));
  const figure = matches.find(item => item.id === preferredVisualization) || matches[0];
  if (!figure) {
    preferredVisualization = null;
    return;
  }
  preferredVisualization = figure.id;
  for (const target of figure.targets) {
    target.setAttribute("aria-pressed", String(matchesVisualizationTarget(target, path, line)));
  }
  reading.append(figure.panel);
}

function initializeVisualizations() {
  const figures = buildCoreDiagrams((path, line, keyboard) => {
    jumpToVisualization(preferredVisualization, path, line, keyboard);
  });
  for (const [id, figure] of Object.entries(figures)) {
    const panel = document.createElement("section");
    panel.className = "core-figure";
    panel.dataset.visualization = id;
    add(panel, "h2", figure.name);
    figure.draw(panel);
    add(panel, "p", figure.summary, "figure-note");
    coreVisualizations.set(id, {
      id, panel, targets: Array.from(panel.querySelectorAll(".figure-target")), ...figure,
    });
  }

  const groups = [
    ["编码与动力学", [
      "network", "neighborhood", "attention", "ode",
      {id: "ode-integration", name: "ODE 积分与目标时间", path: decoderSourcePath, line: 643},
    ]],
    ["解码与渲染", [
      {id: "decoder", name: "高斯形变解码器", path: decoderSourcePath, line: 602},
      "transform",
      {id: "gaussian-projection", name: "高斯投影与形变", path: "gaussian_renderer/__init__.py", line: 90},
      "raster",
    ]],
    ["训练与外推", ["training", "divergence", "extrapolation"]],
  ];

  const dialog = element("visualization-index");
  const list = element("visualization-list");
  for (const [label, entries] of groups) {
    const group = add(list, "section");
    add(group, "h3", label);
    const items = add(group, "ul");
    for (const entry of entries) {
      const {id, name, path, line} = typeof entry === "string" ? coreVisualizations.get(entry) : entry;
      const button = add(add(items, "li"), "button");
      button.type = "button";
      button.dataset.figure = id;
      add(button, "strong", name);
      const displayPath = path.startsWith("submodules/") ? path.split("/").at(-1) : path;
      const location = add(button, "code", displayPath + ":" + line);
      location.title = path + ":" + line;
      button.onclick = () => {
        dialog.close();
        jumpToVisualization(id, path, line);
      };
    }
  }
  element("open-visualizations").onclick = () => {
    hideNameTip();
    dialog.showModal();
  };
}
