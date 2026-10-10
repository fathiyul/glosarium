---
title: "dialog Element"
summary: "The native modal and non-modal dialog."
levels: { frontend: mid-level }
aliases: ["dialog", "dialog element", "native modal"]
prereqs: ["html", "accessibility"]
related: ["accessibility", "focus-management", "javascript"]
---

The **`<dialog>` element** is the browser's built-in modal: `showModal()` opens it in the top layer (above everything, with a `::backdrop`), traps focus inside, closes on Esc, and returns focus on close. Years of hand-rolled modal bugs — focus escaping, background scroll, z-index wars — solved natively.

```html
<dialog id="d"><form method="dialog"><p>Confirm?</p><button>OK</button></form></dialog>
<script>d.showModal();</script>
```

`show()` opens modeless (no trap, page interactive); `showModal()` opens true modal. Forms with `method="dialog"` close and return values without JavaScript.

The classic mistakes:

- Divs instead of dialog. Hand-rolled modals routinely break focus trap, Esc handling, backdrop clicks and screen-reader announcements. The native element does all four.
- Forgetting light-dismiss. `showModal` doesn't close on backdrop click by default — implement it deliberately (click on backdrop, not content) rather than leaving users stuck.
- No focus management. Focus should enter the dialog on open and return to the trigger on close. Native handles the return; set initial focus sensibly.
- Styling the backdrop poorly. An invisible backdrop leaves users confused about modality. Style `::backdrop` visibly.
- Multiple stacked dialogs. Nested modals confuse focus and stacking; prefer sequential flows or a single dialog with steps.
- Closing loses state. `close()` discards nothing but hides — form state persists unless reset. Decide per dialog whether close means cancel or keep.
- Assuming universal support. Older browsers need a polyfill; detect and patch rather than excluding.

**When to use it:** nearly every modal, confirm, and disclosure. It's less code, more correct, and accessible by default — the rare native element that obsoletes a whole category of components.
