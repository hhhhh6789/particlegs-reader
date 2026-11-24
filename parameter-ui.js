function argumentMeaning(label, metadata, fallback, written = []) {
  const description = written.find(([key]) =>
    key === label || key === metadata?.value || key === metadata?.field
      || parameterNames(key).some(name => name === metadata?.name || name === metadata?.value));
  return description?.[1] || fallback;
}

function legacyCallArguments(rows, python = activeFile.path.endsWith(".py")) {
  let position = 0;
  let expanded = false;
  return rows.map(([label, detail]) => {
    const bound = python && label.match(/^([A-Za-z_]\w*) ← (.+)$/);
    const keyword = python && label.match(/^([A-Za-z_]\w*)=(?!=)(.*)$/);
    if (bound) return [label, detail, [], {kind: "formal", name: bound[1], value: bound[2], field: String(++position)}];
    if (keyword) return [label, detail, [], {kind: "keyword", name: keyword[1], value: keyword[2], field: keyword[1]}];
    if (python && label.startsWith("*")) {
      if (!label.startsWith("**")) expanded = true;
      return [label, detail, [], {kind: "unpack", name: label.startsWith("**") ? "**" : "*", value: label}];
    }
    return [label, detail, [], {kind: "position", position: expanded ? null : ++position, value: label}];
  });
}
