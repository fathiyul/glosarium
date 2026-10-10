---
title: "Canvas"
summary: "A drawable bitmap surface controlled from JavaScript."
levels: { frontend: mid-level }
aliases: ["canvas", "canvas element", "2d canvas"]
prereqs: ["dom", "javascript"]
related: ["svg", "accessibility", "javascript"]
---

**Canvas** (`<canvas>`) is a bitmap surface you draw on with JavaScript: paths, shapes, images, pixels — in **immediate mode**, meaning each frame is painted and forgotten, with no retained objects to restyle or inspect. Games, charts, visualisers and photo editors live here.

```text
retained (DOM/SVG): objects persist → style/inspect/animate individually
immediate (canvas): paint pixels → gone → repaint next frame
```

That buys performance (tens of thousands of entities per frame) at the cost of everything the DOM gives free: hit-testing, accessibility, text selection, styling. You reimplement what you need — object lists, hit regions, keyboard models.

The classic mistakes:

- Canvas for document UI. Buttons and forms as canvas pixels lose accessibility, focus, zoom and inspection for zero benefit. DOM for UI; canvas for visual scenes.
- No accessibility fallback. A canvas chart with no text alternative, table, or ARIA description excludes screen-reader users entirely. Provide the data another way.
- Redrawing everything every frame. Full-scene repaint at 60fps wastes battery; dirty-region or layered canvases repaint only what changed.
- Ignoring devicePixelRatio. A canvas sized in CSS pixels renders blurry on retina displays. Scale the backing store by DPR.
- Text in canvas. Canvas text doesn't select, search, scale or read aloud. Keep text in the DOM; draw only what must be pixels.
- Blocking the main thread. Heavy per-frame computation janks the page. Offload to workers or simplify the scene.
- Forgetting export/printing. Canvas content doesn't print or copy like DOM. Offer downloads where the output matters.

**When to choose it:** dynamic pixel scenes — games, dense charts, image manipulation — where retained objects would choke. For diagrams and icons with interaction, SVG keeps DOM benefits; for documents, plain HTML. Match the mode to the content.
