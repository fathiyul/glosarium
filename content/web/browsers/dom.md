---
title: "DOM"
summary: "The browser's tree of objects representing the page."
levels: { frontend: junior }
aliases: ["Document Object Model", "document object model", "DOM tree"]
prereqs: ["html-element"]
related: ["dom-manipulation", "cssom", "render-tree", "shadow-dom", "browser-devtools", "html-element"]
core: [frontend]
---

The **DOM** (Document Object Model) is the browser's live, in-memory version of your page: a tree
of objects, one for each element, piece of text and attribute. HTML is the text you write; the
DOM is what the browser builds from it, and what your JavaScript reads and changes.

```html
<ul id="todos">
  <li>Buy milk</li>
  <li>Call Ana</li>
</ul>
```

becomes a tree:

```
ul#todos
├── li  → "Buy milk"
└── li  → "Call Ana"
```

## Working with it from JavaScript

```js
const list = document.querySelector("#todos");     // find an element
const item = document.createElement("li");         // make one
item.textContent = "Walk the dog";                 // set its text
list.append(item);                                 // add it: the page updates immediately
item.addEventListener("click", () => item.remove());
```

Changing the DOM changes what the user sees, which is how every interactive page works. Frameworks like
React and Vue exist to manage this for you: you describe the UI, and they update the DOM efficiently.

## Points to remember

- **The DOM isn't your HTML file.** The browser fixes mistakes in the HTML, and scripts modify the DOM
  afterwards. Use the Elements panel in [DevTools](/t/browser-devtools) to see the *current* DOM.
- **`textContent` vs `innerHTML`.** `textContent` inserts plain text safely. `innerHTML` parses HTML, so
  putting user input in it can allow cross-site scripting (XSS).
- **Run your script after the element exists.** Put scripts at the end of the page, use `defer`, or
  wait for `DOMContentLoaded`. Otherwise `querySelector` returns `null`.
- **DOM operations are comparatively slow** when repeated in big loops, because they can trigger layout
  work ([reflow](/t/layout-reflow)). Batch changes.
- Events *bubble* up the tree, so one listener on a parent can handle clicks for many children.

The CSS rules live in a related tree, the [CSSOM](/t/cssom); together they produce what you
see on screen (see [render tree](/t/render-tree)). More in [DOM manipulation](/t/dom-manipulation).
