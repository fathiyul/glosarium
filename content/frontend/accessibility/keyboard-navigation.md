---
title: "Keyboard Navigation"
summary: "Everything must work without a mouse."
levels: { frontend: junior }
aliases: ["keyboard accessibility", "tab order", "focus order", "keyboard support"]
prereqs: ["accessibility", "semantic-html"]
related: ["focus-management", "focus-visible", "skip-link", "screen-reader", "aria", "dialog-element"]
core: [frontend]
---

Everything a mouse user can do must also work with the **keyboard alone**. People rely on it because of motor
disabilities, blindness (screen reader users navigate by keyboard), injuries or simple preference.

## What users expect

| Key | Does |
|---|---|
| **Tab** / **Shift + Tab** | Move focus forward / backward through interactive elements |
| **Enter** | Activate a link or button; submit a form |
| **Space** | Press a button, toggle a checkbox |
| **Arrow keys** | Move within a group (radio buttons, tabs, menus, select lists) |
| **Esc** | Close a dialog, menu or popup |

## How to get it right

**Use real interactive elements.** `<button>`, `<a href>`, `<input>` and `<select>` are focusable and operable by
keyboard automatically. A `<div onclick>` is not, and adding the missing behavior by hand is hard
([semantic HTML](/t/semantic-html)).

**Keep a visible focus indicator.** Users must see where they are. Never write `outline: none` without a replacement
(see [focus-visible](/t/focus-visible)).

**Make the tab order follow the visual order**, which in practice means the HTML source order. Avoid
positive `tabindex` values (`tabindex="3"`). Only two are normal:

- `tabindex="0"`: put a custom element in the natural tab order,
- `tabindex="-1"`: focusable by script (for moving focus), but not by Tab.

**Don't trap focus**, except where intended: while a modal dialog is open, focus should stay inside it, Esc should
close it and focus should return to what opened it ([focus management](/t/focus-management)).

**Offer a [skip link](/t/skip-link)** so keyboard users can jump past the navigation to the main content.

## Test it

Put the mouse aside and use your site with Tab, Shift+Tab, Enter, Space and Esc. Can you reach everything? Can you see where focus is?
Does anything get stuck? This quick check finds many real problems. Custom widgets (menus, tabs, comboboxes) also need
the right [ARIA](/t/aria) roles and arrow-key behavior.
