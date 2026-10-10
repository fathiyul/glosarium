---
title: "template and slot"
summary: "Inert HTML fragments and placeholders for components."
levels: { frontend: senior }
aliases: ["template element", "slot element", "html template"]
prereqs: ["dom", "web-components"]
related: ["web-components", "shadow-dom", "dom"]
---

The **`<template>` element** holds inert markup: parsed but not rendered, scripts not run, images not fetched — until cloned into the document. **`<slot>`** marks where, inside shadow DOM, the element's light-DOM children project. Together they're stamping plus composition: define once, instantiate many, customise per use.

```html
<template id="card"><article class="c"><slot name="title">Untitled</slot></article></template>
<script>host.attachShadow({mode:'open'}).append(tpl.content.cloneNode(true));</script>
<my-card><span slot="title">Hello</span></my-card>
```

Templates also power framework-adjacent patterns (client-side rendering from server-provided templates) and the declarative shadow DOM story (server-rendered shadow roots).

The classic mistakes:

- Querying inside templates. Template content isn't in the document — `querySelector` from `document` won't find it. Clone first, then query the clone.
- Assuming scripts run. Inert means inert — template scripts don't execute until instantiated (and even then, only via deliberate handling). Don't hide initialisation there.
- Slot fallback neglect. Empty slots render fallback content — design it, or unfilled slots show confusing defaults (or nothing).
- Styling slotted content wrongly. Slotted nodes keep their light-DOM styles; shadow styles reach them only via `::slotted()` (limited selectors). Style across the boundary deliberately.
- Duplicate-id clones. Cloning a template with ids duplicates them — invalid HTML and broken `getElementById`. Prefer classes and scoped queries in clones.
- Reinventing components. Template+slot without custom elements is a pattern, not a component model. Pair with custom elements (or a framework) for lifecycle and encapsulation.
- Forgetting parser context. Template parsing follows its context (table internals, select options) — markup valid elsewhere may parse unexpectedly inside specialised parents.

**How to use them:** templates for repeatable inert markup, slots for component composition points, both wired through custom elements. Small primitives, but they're the composition layer the component model stands on.
