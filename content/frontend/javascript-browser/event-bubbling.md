---
title: "Event Bubbling and Capturing"
summary: "Events travelling up (and down) the DOM tree."
levels: { frontend: junior }
aliases: ["event propagation", "capturing phase", "stopPropagation"]
prereqs: ["dom", "event-handling"]
related: ["event-delegation", "dom", "event-handling", "javascript"]
---

When an event happens on an element, it doesn't stay there. It travels through the DOM tree in three phases:

1. **Capturing**: from the window down to the target's parent.
2. **Target**: the element itself.
3. **Bubbling**: back up from the target through its ancestors to the window.

By default, listeners run during the bubbling phase. So a click on a button also triggers click handlers on its parent, grandparent and so on.

```html
<div id="card">
  <button id="buy">Buy</button>
</div>
```

```js
card.addEventListener("click", () => console.log("card"));
buy.addEventListener("click", () => console.log("button"));
// click the button -> "button" then "card"
```

## Useful consequences

- **[Event delegation](/t/event-delegation)**: attach one listener to a parent, and handle events from many children.
- **`event.target`** is the element that was actually clicked. **`event.currentTarget`** is the element the listener is attached to.

```js
list.addEventListener("click", (e) => {
  const item = e.target.closest("li");
  if (item) select(item.dataset.id);
});
```

## Controlling propagation

```js
e.stopPropagation();    // stop it travelling further
e.preventDefault();     // cancel the default action (like following a link); doesn't stop bubbling
el.addEventListener("click", handler, { capture: true });   // listen in the capture phase
```

## Cautions

- **Don't overuse `stopPropagation()`.** It breaks other code that relies on seeing the event, such as analytics and "click outside to close" menus.
- **`preventDefault` and `stopPropagation` are different things**, and are often confused.
- **Not all events bubble.** `focus`, `blur`, `mouseenter` and `load` don't (`focusin` and `focusout` do).
- **Nested clickable elements** (a button inside a clickable card) cause double actions. Check the target, or stop propagation deliberately.
- Frameworks wrap events, but the same ideas apply.
