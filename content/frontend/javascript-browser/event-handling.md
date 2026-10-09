---
title: "Event Handling"
summary: "Responding to clicks, key presses and other user actions."
levels: { frontend: junior }
aliases: ["events", "event listeners", "addEventListener", "DOM events", "handling events"]
prereqs: ["dom", "function"]
related: ["event-bubbling", "event-delegation", "prevent-default", "dom-manipulation", "debounce", "throttle"]
core: [frontend]
---

Pages are interactive because JavaScript can respond to **events**: clicks, key presses, form
submissions, scrolling, the page finishing loading. You attach a function (a *handler* or *listener*)
that runs when the event happens.

```js
const button = document.querySelector("#save");

button.addEventListener("click", (event) => {
  console.log("clicked", event.target);
  save();
});
```

The handler receives an **event object** with details: what was clicked (`event.target`), which key
(`event.key`), the mouse position, and methods to control what happens next.

## Frequent events

| Category | Events |
|---|---|
| Mouse | `click`, `dblclick`, `mouseover`, `pointerdown` |
| Keyboard | `keydown`, `keyup` |
| Form | `submit`, `input` (every change), `change` (on commit), `focus`, `blur` |
| Page | `DOMContentLoaded`, `load`, `scroll`, `resize` |

## Common mistakes

**Calling the function instead of passing it.**

```js
button.addEventListener("click", save());   // runs save() right now; registers its result
button.addEventListener("click", save);     // correct: pass the function itself
button.addEventListener("click", () => save(id));   // wrap when you need arguments
```

**Forgetting to stop the default.** A form submit reloads the page, and a link navigates, unless you call
[`event.preventDefault()`](/t/prevent-default).

**Adding listeners over and over**, for example inside a function called repeatedly. Add once, or
remove with `removeEventListener` (which needs the *same* function reference).

**Using non-interactive elements.** A `div` with a click handler isn't reachable by keyboard. Use a
real `<button>` (see [semantic HTML](/t/semantic-html)).

## Events travel through the tree

An event **bubbles** up from the element to its ancestors ([event bubbling](/t/event-bubbling)), so a
parent can listen for clicks on all its children, an approach called
[event delegation](/t/event-delegation). For fast-firing events such as `input` and `scroll`, see
[debounce](/t/debounce) and [throttle](/t/throttle).

In React and similar frameworks, you write `onClick={handler}` instead, but the same ideas apply.
