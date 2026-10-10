---
title: "Landmarks"
summary: "Regions like header, nav and main that screen readers can jump between."
levels: { frontend: mid-level }
aliases: ["landmarks", "aria landmarks", "page regions"]
prereqs: ["accessibility", "semantic-html"]
related: ["semantic-html", "skip-link", "screen-reader"]
---

**Landmarks** are the named regions of a page — `header`, `nav`, `main`, `aside`, `footer`, `search`, and labelled `section`s — that screen readers (and other tools) offer as navigation shortcuts. "Jump to main content," "list navigation regions," rotor menus: landmarks make pages skimmable non-visually the way sighted users skim visually.

```html
<header>…</header><nav aria-label="Primary">…</nav>
<main><article>…</article></main><footer>…</footer>
```

Native elements carry implicit landmark roles, so semantic HTML mostly provides them free; ARIA roles (`role="search"`) and labels (`aria-label` distinguishing multiple navs) complete the map. A well-landmarked page lets assistive technology offer the same structural shortcuts sighted users get from layout.

The classic mistakes:

- Div soup. A page of `<div>`s offers zero landmarks — screen-reader users get no map. Semantic elements first, always.
- Missing main. No `<main>` (or multiple) breaks the single most-used shortcut ("skip to content" targets it). Exactly one main per page.
- Unlabelled multiples. Two `<nav>`s without `aria-label` are indistinguishable in landmark lists. Label every repeated region.
- Landmark overload. Wrapping everything in sections-with-labels floods the map with noise. Landmark the major regions; leave prose unmarked.
- Banner/contentinfo duplication. Only the page-level header/footer are landmarks; nested ones aren't. Structure accordingly.
- Skip link without target. "Skip to content" needs the landmark to exist and be focusable. Pair skip links with real mains (see [skip link](/t/skip-link)).
- Assuming visual order equals landmark order. CSS can visually reorder what DOM order presents to assistive tech. Keep DOM order meaningful; landmarks follow the DOM.

**The practice:** semantic regions, exactly one main, labelled multiples, skip links targeting them. The page's table of contents for everyone who navigates structurally.
