---
title: "preventDefault and stopPropagation"
summary: "Cancelling default browser behavior or further event propagation."
levels: { frontend: junior }
aliases: ["preventDefault", "stopPropagation", "event.preventDefault()"]
prereqs: ["event-handling", "event-bubbling"]
related: ["event-bubbling", "event-delegation", "event-handling", "dom-manipulation"]
---

Two methods on the event object that people often confuse.

- **`preventDefault()`** cancels the browser's default action for the event.
- **`stopPropagation()`** stops the event from travelling to other elements ([bubbling](/t/event-bubbling)).

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();               // don't reload the page
  sendWithFetch(new FormData(form));
});

link.addEventListener("click", (e) => {
  e.preventDefault();               // don't navigate
  openModal();
});
```

## Default actions you may want to cancel

| Event | Default |
|---|---|
| `submit` on a form | sends the form and reloads the page |
| `click` on a link | navigates |
| `keydown` | types the character, or triggers a shortcut |
| `contextmenu` | shows the right-click menu |
| `dragover` and `drop` | the browser opens the dropped file (cancel it to handle drops yourself) |
| `wheel`, `touchmove` | scrolling |

## Differences

| | preventDefault | stopPropagation |
|---|---|---|
| Stops the browser's own behavior | **yes** | no |
| Stops other listeners higher up | no | **yes** |
| Other listeners on the same element | still run | still run (use `stopImmediatePropagation` to stop them) |

They are independent: you might need one, both or neither.

## Cautions

- **Not every event is cancelable** (check `e.cancelable`).
- **Passive listeners** (`{ passive: true }`, the default for `touchstart`, `wheel` on some targets) can't call `preventDefault()`. This is for scroll performance.
- **Don't break accessibility**: cancelling a link's click with a `<div>` pretending to be a link loses keyboard behavior. Use real links and buttons.
- **Overusing `stopPropagation`** breaks analytics and "click outside" handlers. Prefer checking `e.target`.
- Return `false` from an inline handler is another way, but avoid inline handlers.
