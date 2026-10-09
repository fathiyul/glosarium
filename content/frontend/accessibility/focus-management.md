---
title: "Focus Management"
summary: "Moving focus sensibly in modals, route changes and dynamic content."
levels: { frontend: mid-level }
aliases: ["managing focus", "focus handling", "focus trap", "moving focus", "focus order"]
prereqs: ["keyboard-navigation", "aria"]
related: ["keyboard-navigation", "focus-visible", "skip-link", "dialog-element", "live-regions", "client-side-routing"]
core: [frontend]
---

**Focus** is the element that currently receives keyboard input. Keyboard and screen reader users depend on it to know where they are. **Focus management** means moving focus deliberately when the page changes in ways the browser won't handle for you, so users don't get
lost.

## When to move focus

**Opening a modal dialog:**

1. Move focus **into** the dialog (to its first control, or the heading or the dialog itself).
2. **Keep focus inside** while it's open (a focus trap), so Tab doesn't wander to the page behind.
3. Close on **Esc**.
4. On close, **return focus to the element that opened it**.

The native `<dialog>` opened with `showModal()` does most of this for you ([dialog element](/t/dialog-element)). Custom modals need all of it implemented, or a well-tested component library.

**After a route change in a single-page app**: a client-side navigation doesn't reload the page, so a screen reader isn't told anything happened and focus stays on the old link. Move focus to the new page's main heading or container, and
update the document title ([client-side routing](/t/client-side-routing)).

```js
const heading = document.querySelector("h1");
heading.setAttribute("tabindex", "-1");     // focusable by script, not in the Tab order
heading.focus();
```

**After deleting an item**: focus would otherwise vanish with the removed element. Move it to a sensible neighbor, or the list heading.

**After a failed form submit**: move focus to the first invalid field, or an error summary ([accessible forms](/t/accessible-forms)).

**Revealing content** (an expanded section, an inline editor): focus the new thing if the user's action calls for it. Don't steal focus otherwise.

## Tools

- `element.focus()` to move it. `tabindex="-1"` to make a non-interactive element focusable by script. `tabindex="0"` to add something to the natural Tab order. Avoid positive `tabindex` values.
- The `inert` attribute makes background content unfocusable and non-interactive while an overlay is open.
- [Live regions](/t/live-regions) announce updates without moving focus (status messages, "3 results found").

## Rules of thumb

- **Don't steal focus** unexpectedly, such as autofocusing a field that scrolls the page or interrupts a screen reader announcement.
- **Never leave focus on an element that disappeared**, because it resets to the top of the page.
- **Keep a visible focus indicator** ([focus-visible](/t/focus-visible)).
- **Test with the keyboard only**, and with a [screen reader](/t/screen-reader). Focus bugs are easy to miss with a mouse.
