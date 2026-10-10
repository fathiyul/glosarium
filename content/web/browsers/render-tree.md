---
title: "Render Tree"
summary: "The combination of DOM and CSSOM that actually gets drawn."
levels: { frontend: mid-level }
aliases: ["render tree", "render object tree", "frame tree"]
prereqs: ["dom", "cssom"]
related: ["layout-reflow", "cssom", "critical-rendering-path"]
---

The **render tree** is what the browser actually draws: the DOM filtered to visible elements, each annotated with computed styles. `display: none` nodes are excluded (they take no space); `visibility: hidden` nodes stay (space without paint); pseudo-elements and anonymous boxes the CSS requires get materialised.

```text
DOM (all nodes) + CSSOM (all rules) → render tree (visible, styled boxes)
→ layout (geometry) → paint (pixels)
```

It's rebuilt or updated when DOM or styles change, feeding layout and paint. Its size tracks the DOM's — a 10,000-node DOM means a ~10,000-box render tree, with layout and style-matching costs to match.

The classic mistakes:

- Enormous DOMs. Thousands of nodes slow style matching, render-tree construction, layout and paint together. Virtualise lists, paginate, collapse — DOM size is a budget spanning the whole pipeline.
- Hiding with display:none for toggles. Each toggle rebuilds layout for the subtree. For frequently toggled UI, toggling visibility or transform avoids repeated layout work (at the cost of reserved space or paint).
- Style recalc across the tree. A class change on `body` can re-match selectors against every element. Scope changes low in the tree; avoid universal selectors and deep descendant chains in hot paths.
- Forgetting pseudo-elements cost. `::before`/`::after` on thousands of elements are thousands more boxes. They're cheap individually, meaningful in aggregate.
- Confusing it with the DOM. Scripts see the DOM; painting uses the render tree. "It's in the DOM but invisible" usually means excluded here (display, `hidden`, zero-size without overflow).
- Ignoring it in frameworks. Virtual-DOM diffs still produce real DOM churn, which rebuilds real render trees. Fewer, lower mutations win regardless of abstraction.

**How to use it:** keep the DOM small, scope style changes narrowly, and remember that everything visible costs construction, layout and paint. The render tree is where DOM size becomes frame time.
