---
title: "DOM Manipulation"
summary: "Reading and changing page elements with JavaScript."
levels: { frontend: junior }
aliases: ["manipulating the DOM", "DOM API", "querySelector", "DOM methods"]
prereqs: ["dom", "event-handling"]
related: ["dom", "event-handling", "event-delegation", "html-element", "mutation-observer", "virtual-dom"]
core: [frontend]
---

DOM manipulation is using JavaScript to find, change, add and remove elements on the page. It's what
makes a page dynamic, and what frameworks do for you behind the scenes.

## Finding elements

```js
const title = document.querySelector("h1");              // first match
const items = document.querySelectorAll(".todo-item");   // all matches (a NodeList)
const byId = document.getElementById("app");
```

`querySelector` accepts any CSS [selector](/t/css-selector), and returns `null` if nothing matches, so
check before use.

## Changing them

```js
title.textContent = "Orders";                   // text (safe)
title.classList.add("highlight");               // classes
title.classList.toggle("hidden");
link.setAttribute("href", "/orders");           // attributes
button.disabled = true;
box.style.color = "red";                        // inline style (prefer classes)
```

## Creating and removing

```js
const li = document.createElement("li");
li.textContent = "Buy milk";
list.append(li);                  // add at the end
list.prepend(li);                 // at the start
li.remove();                      // remove it
```

## Habits

- **Use `textContent`, not `innerHTML`, for user-provided text.** Setting `innerHTML` with untrusted input
  lets attackers run scripts (XSS). If you must insert HTML, sanitize it first.
- **Toggle classes** instead of setting many inline styles. The CSS stays in the stylesheet.
- **Store references**: don't query the same element repeatedly inside loops.
- **Batch changes.** Building elements in one go (or in a `DocumentFragment`) and inserting once is
  cheaper than updating the live page repeatedly. Reading layout values (`offsetHeight`) between writes
  forces extra [layout work](/t/layout-reflow).
- **Run it after the DOM exists** (`defer` scripts or `DOMContentLoaded`).
- Add behavior with [event listeners](/t/event-handling), and use [event delegation](/t/event-delegation)
  for lists that change.

In a framework like React or Vue you rarely touch the DOM directly. You change state, and the
framework updates the DOM. Direct manipulation can conflict with that, so use refs for the exceptions.
