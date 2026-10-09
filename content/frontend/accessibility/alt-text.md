---
title: "Alt Text"
summary: "Text describing an image for people who can't see it."
levels: { frontend: junior }
aliases: ["alt attribute", "alternative text", "image alt text", "img alt"]
prereqs: ["semantic-html"]
related: ["accessibility", "accessible-name", "screen-reader", "image-optimization", "wcag"]
core: [frontend]
---

**Alt text** is a short text alternative for an image, set in the `alt` attribute. Screen readers read it
aloud, and browsers show it when the image fails to load. Search engines use it too.

```html
<img src="chart.png" alt="Line chart: signups rose from 200 in January to 950 in June">
```

## Write for what the image does

| Kind of image | What to do |
|---|---|
| **Informative** (photo, chart, diagram) | Describe what matters in context, briefly |
| **Decorative** (flourishes, backgrounds) | `alt=""` (empty), so screen readers skip it |
| **Functional** (an icon in a button or link) | Describe the **action**: `alt="Search"`, not `alt="magnifying glass"` |
| **Image of text** (a logo) | The same words: `alt="Acme Hardware"` |
| **Complex** (graph, infographic) | A short alt, plus a longer description or data table nearby |

```html
<a href="/cart"><img src="cart.svg" alt="Cart (3 items)"></a>
<img src="divider.png" alt="">
```

## Guidelines

- **Be concise**, a sentence or two at most. Say what someone who can't see it needs to know.
- **Don't start with "image of" or "picture of."** Screen readers already announce it's an image.
- **Don't repeat nearby text.** If the caption says everything, the alt can be short or empty.
- **Don't stuff keywords** for SEO. Write for humans.
- **Never omit the attribute.** With no `alt`, a screen reader may read the file name
  (`IMG_4032.jpg`). An empty `alt=""` is a deliberate choice; a missing one is a bug.
- **Consider context.** The same photo needs different alt text on a news article and on a product page.
- In content from users or a CMS, make alt text a field that editors fill in.

Icon fonts and CSS background images carry no alt text. If they convey meaning, add text another way (visually
hidden text or an `aria-label`). More in [accessible names](/t/accessible-name) and
[accessibility](/t/accessibility).
