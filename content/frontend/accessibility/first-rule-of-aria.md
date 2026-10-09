---
title: "First Rule of ARIA"
summary: "Use a native HTML element instead of ARIA whenever possible."
levels: { frontend: mid-level }
aliases: ["first rule of ARIA use", "no ARIA is better than bad ARIA", "native HTML over ARIA", "five rules of ARIA"]
prereqs: ["aria", "semantic-html"]
related: ["aria", "semantic-html", "keyboard-navigation", "accessible-name", "headless-ui", "accessibility"]
core: [frontend]
---

The **first rule of ARIA** (from the W3C's guidance on using ARIA): **if you can use a native HTML element or attribute with the semantics and behavior you need, do that instead of adding ARIA.**

```html
<!-- ARIA workaround: needs a lot of manual work to be accessible -->
<div role="button" tabindex="0" aria-pressed="false"
     onclick="toggle()" onkeydown="if (event.key==='Enter' || event.key===' ') toggle()">
  Mute
</div>

<!-- Native: focusable, keyboard-operable and announced correctly for free -->
<button type="button" onclick="toggle()">Mute</button>
```

The `div` version needs `role`, `tabindex`, a key handler for **both** Enter and Space, focus styles and state attributes, and it's easy to get one wrong. The `<button>` has all of it built in.

## Why it matters

A native element gives you three things at once: **semantics** (what it is), **behavior** (keyboard, focus) and **state handling**. ARIA gives you only the first, as an announcement. If you declare `role="button"` but don't implement the behavior,
you've promised something that isn't true, and users who rely on assistive technology are worse off than with plain text.

## The related rules

The same guidance lists a few more:

1. **Use native HTML when you can.** (The first rule.)
2. **Don't change native semantics** unless you really must (`<h2 role="tab">` is odd. Wrap or choose another element).
3. **All interactive ARIA controls must be keyboard-operable**, and behave as their role promises.
4. **Don't hide focusable elements** from assistive technology (`aria-hidden="true"` or `role="presentation"` on something that can receive focus).
5. **All interactive elements need an accessible name** ([accessible name](/t/accessible-name)).

## In practice

| Instead of... | Use |
|---|---|
| `<div role="button">` | `<button>` |
| `<div role="link" onclick>` | `<a href>` |
| `<span role="checkbox">` | `<input type="checkbox">` |
| `<div role="navigation">` | `<nav>` |
| `<div role="dialog">` | `<dialog>` ([dialog element](/t/dialog-element)) |
| `<div role="heading" aria-level="2">` | `<h2>` |

Use ARIA for what HTML **can't** express: complex widgets and dynamic announcements ([ARIA](/t/aria)). Even then, prefer well-tested accessible component libraries over rolling your own. See [semantic HTML](/t/semantic-html).
