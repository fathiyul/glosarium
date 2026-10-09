---
title: "Event Delegation"
summary: "One listener on a parent handling events for many children."
levels: { frontend: junior }
aliases: ["delegated events", "delegate event listener"]
prereqs: ["event-bubbling"]
related: ["event-bubbling", "dom", "data-attributes", "event-handling", "javascript"]
---

Event delegation means attaching one event listener to a parent element, instead of one to each child, and using event bubbling to handle events from the children.

```js
// Instead of this: a listener per item
document.querySelectorAll("#todo li").forEach((li) =>
  li.addEventListener("click", () => toggle(li))
);

// Use one on the parent
document.querySelector("#todo").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;                       // the click was elsewhere
  toggle(li.dataset.id);
});
```

It works because a click on an `<li>` bubbles up to the `<ul>` ([event bubbling](/t/event-bubbling)). `e.target` tells you which child it came from.

## Why use it

- **Works for elements added later.** New items inserted into the list are handled automatically, with no need to attach listeners again.
- **Fewer listeners**, so less memory and setup for long lists.
- **Simpler cleanup**: one listener to remove.

## Details to get right

- **Use `closest()`**, not `e.target` alone. The target may be a child inside your item (an icon in a button), and `closest` finds the item you care about.
- **Check the match is inside your container** when nested structures are possible.
- **Identify items with [data attributes](/t/data-attributes)**: `data-id`, `data-action`.
- **Pick events that bubble.** `click`, `input`, `keydown`, `submit` do. `focus`, `blur` and `mouseenter` don't, so use `focusin`, `focusout` or `mouseover`.
- **Don't delegate to `document`** for everything. Choose the closest sensible parent.
- **`stopPropagation()` in a child** will prevent the parent from seeing the event.

```html
<ul id="todo">
  <li data-id="1">Buy milk <button data-action="delete">x</button></li>
</ul>
```

In frameworks like React, delegation happens under the hood, and you attach handlers on elements normally. But it's still the right tool in plain JavaScript for dynamic lists.
