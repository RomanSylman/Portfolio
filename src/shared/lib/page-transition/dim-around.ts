const KEEP = "[data-transition-keep]";
const SKIPPED_TAGS = new Set(["SCRIPT", "STYLE", "LINK", "NOSCRIPT"]);

export function collectDimTargets(focus: HTMLElement) {
  const targets: HTMLElement[] = [];
  let node = focus;

  for (;;) {
    const parent = node.parentElement;
    if (!parent) break;

    for (const child of parent.children) {
      if (child === node || !(child instanceof HTMLElement)) continue;
      if (SKIPPED_TAGS.has(child.tagName) || child.matches(KEEP)) continue;
      targets.push(child);
    }

    if (parent === document.body || !(parent instanceof HTMLElement)) break;
    node = parent;
  }

  return targets;
}
