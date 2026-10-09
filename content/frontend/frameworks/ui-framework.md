---
title: "UI Framework"
summary: "Libraries like React, Vue, Svelte and Angular for building interfaces."
levels: { frontend: junior }
aliases: ["frontend framework", "JavaScript framework", "React", "Vue", "Svelte", "Angular"]
prereqs: ["javascript", "dom"]
related: ["component", "virtual-dom", "reactivity", "meta-framework", "framework-choice", "jsx"]
core: [frontend]
---

A **UI framework** (or library) like **React**, **Vue**, **Svelte**, **Angular** or **Solid** helps you build interfaces
from components and keeps the screen in sync with your data, so you don't update the [DOM](/t/dom) by hand.

Compare plain JavaScript:

```js
let count = 0;
const label = document.querySelector("#label");
button.addEventListener("click", () => {
  count++;
  label.textContent = `Clicked ${count} times`;    // you must remember to update the page
});
```

with a framework, where you describe *what the UI looks like for a given state*, and it handles the updates:

```jsx
const [count, setCount] = useState(0);
return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
```

This is **declarative** UI: UI = function of state.

## What they provide

- A [component](/t/component) model for reuse.
- **[Reactivity](/t/reactivity)**: updating exactly what changed, using techniques such as a
  [virtual DOM](/t/virtual-dom) or fine-grained signals.
- Often tools for routing, forms, data and testing, directly or through a
  [meta-framework](/t/meta-framework) (Next.js, Nuxt, SvelteKit...).

## Library or framework?

React is technically a *library* for building UI (you add routing and data tools yourself), whereas
Angular is a full *framework* with those included. In practice people use "framework" for all of them.

## Choosing one

They solve the same problem differently, and none is universally best. Teams usually decide by:

- what the team already knows, and how easy it is to hire for,
- the ecosystem (libraries, tooling, community),
- project size and needs (SEO, server rendering, mobile),
- the maturity and long-term support of the project.

See [choosing a framework](/t/framework-choice). If you're learning: **get JavaScript, HTML, CSS and the
browser basics solid first.** Frameworks change faster than the language underneath them, and the
concepts (components, state, props, data flow) transfer between them.
