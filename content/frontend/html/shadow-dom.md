---
title: "Shadow DOM"
summary: "Encapsulated DOM and styles for a component."
levels: { frontend: senior }
aliases: ["shadow dom", "shadow root", "shadow tree"]
prereqs: ["dom", "web-components"]
related: ["web-components", "template-element", "css"]
---

**Shadow DOM** attaches a hidden, encapsulated DOM subtree to an element: markup and styles inside the shadow root are isolated — page CSS doesn't leak in, component styles don't leak out, ids don't collide. It's the **encapsulation** primitive under custom elements, and usable directly for any widget needing style/DOM boundaries.

```text
<my-card>               page sees: one element
  #shadow-root          inside: <style>, <slot>, internal divs (isolated)
    <slot>…</slot>      light-DOM children project into slots
```

Slots project the element's light-DOM children into shadow-defined positions, so users supply content while the component owns structure and styling. `closed` vs `open` roots trade inspectability for privacy.

The classic mistakes:

- Styling across the boundary by accident. Page styles don't pierce shadow (except inherited properties and CSS custom properties, which do by design). Theme via custom properties and `::part`, not expectations of cascade.
- Global CSS resets breaking components. Conversely, components relying on page styles (fonts, resets) break in isolation. Self-contain component styling.
- Accessibility gaps. Encapsulation hides internals from naive queries — test screen-reader and focus behaviour across the boundary; slots and ARIA need deliberate wiring.
- Closed roots for debuggability. `closed` shadow roots block DevTools and testing libraries. Prefer `open` unless hiding internals is a real requirement.
- Event retargeting confusion. Events crossing the boundary retarget to the host, hiding internal origins. Compose event detail deliberately for outside listeners.
- Framework duplication. Rebuilding framework components as shadow widgets doubles the abstraction. Use shadow DOM where encapsulation (embeddable widgets, design systems) justifies it.
- Forgetting form participation. Custom inputs need form-associated APIs to behave as form controls; a shadow input otherwise submits nothing.

**When to use it:** embeddable widgets, design systems consumed across frameworks, and any component needing style/DOM guarantees. It's the browser's component boundary — adopt it where isolation is the requirement.
