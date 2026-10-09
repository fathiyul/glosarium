---
title: "ARIA"
summary: "Attributes that add accessibility information when HTML alone isn't enough."
levels: { frontend: mid-level }
aliases: ["WAI-ARIA", "ARIA attributes", "aria-label", "role attribute", "Accessible Rich Internet Applications"]
prereqs: ["semantic-html", "accessible-name"]
related: ["first-rule-of-aria", "accessible-name", "live-regions", "landmarks", "focus-management", "keyboard-navigation"]
core: [frontend]
---

**ARIA** (Accessible Rich Internet Applications) is a set of HTML attributes that **add accessibility information** for assistive technology, when native HTML can't express what a custom widget is or does. It has three kinds of attributes:

| Kind | What it says | Examples |
|---|---|---|
| **Roles** | *What* an element is | `role="dialog"`, `role="tablist"`, `role="alert"` |
| **Properties** | Relationships and labels | `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-controls` |
| **States** | Current condition (changes with interaction) | `aria-expanded="true"`, `aria-selected`, `aria-checked`, `aria-busy`, `aria-invalid` |

```html
<button aria-expanded="false" aria-controls="menu">Account</button>
<ul id="menu" hidden> … </ul>
```

When the menu opens, your JavaScript sets `aria-expanded="true"`, so a screen reader user hears "Account, button, expanded".

## What ARIA does *not* do

- **It changes only what's announced**, not behavior. A `div role="button"` still has no keyboard support, no focus and no Enter or Space handling. You have to build all that yourself ([keyboard navigation](/t/keyboard-navigation)).
- It adds no styling, and no actual semantics for the browser's own behavior.

## Use native HTML first

The most important guidance: **don't use ARIA when a native element does the job.** `<button>`, `<a>`, `<input type="checkbox">`, `<dialog>`, `<nav>` and `<select>` come with correct roles, keyboard behavior and states built in
([first rule of ARIA](/t/first-rule-of-aria), [semantic HTML](/t/semantic-html)). Incorrect ARIA can make a page *worse* than no ARIA, because it tells assistive technology something untrue.

## When ARIA is the right tool

- **Custom widgets** with no HTML equivalent (tabs, comboboxes, tree views, menus), where you need roles, states and keyboard patterns. Follow the published patterns in the W3C's ARIA Authoring Practices Guide instead of inventing your own.
- **Dynamic updates** that should be announced ([live regions](/t/live-regions): `aria-live`, `role="status"`, `role="alert"`).
- **Labels and descriptions** where there's no visible text ([accessible name](/t/accessible-name)).
- **Landmarks** labeling when you have several of the same kind ([landmarks](/t/landmarks)).
- **Hiding decorative things** from assistive technology (`aria-hidden="true"`). Never on focusable elements.

## Habits

- **Keep states in sync** with the real UI state.
- **Don't override native semantics** (`<h2 role="button">` is a mess).
- **Test with a screen reader** and keyboard. ARIA that looks right in the HTML can still misbehave.
- Prefer libraries of accessible components ([headless UI](/t/headless-ui)) over writing complex widgets from scratch.
