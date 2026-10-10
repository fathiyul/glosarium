---
title: "Mutation Observer"
summary: "Watching for changes to the DOM."
levels: { frontend: senior }
aliases: ["mutation observer", "mutationobserver", "dom observer"]
prereqs: ["javascript", "dom"]
related: ["javascript", "dom", "main-thread"]
---

**Mutation Observer** reports DOM changes — added/removed nodes, attribute edits, text changes — as async, batched records. Third-party embeds reacting to page changes, editors tracking content, devtools and test harnesses all use it where polling the DOM would be wasteful and synchronous callbacks (the deprecated Mutation Events) were catastrophic.

```js
new MutationObserver(records => records.forEach(apply))
  .observe(root, {childList: true, subtree: true, attributes: true});
```

Callbacks arrive microtask-delayed with the whole **batch**, letting handlers process many mutations at once instead of reacting per change.

The classic mistakes:

- Observing `document` with `subtree: true`. Every DOM change anywhere fires your callback — crushing overhead on dynamic pages. Observe the smallest subtree that matters, with the narrowest options.
- Mutating inside the callback. Changes you make re-trigger observation — infinite loops unless guarded (disconnect-then-reconnect, or filter your own mutations out).
- Assuming synchronous delivery. Records arrive after the mutation batch, not during. Logic needing pre-change state must capture it earlier.
- Over-broad options. `attributes: true` without a filter reports every class toggle; `characterData` on huge text nodes copies content. Request exactly the record types needed.
- Leaking observers. Observers hold their targets; forgotten ones on removed subtrees leak memory and fire pointlessly. Disconnect on teardown.
- Using it for framework state. Frameworks own their DOM; external mutation-watching fights the renderer. Observe third-party and foreign subtrees, not your own framework's output.
- Forgetting performance budgets. Heavy callbacks on hot subtrees (infinite feeds, editors) still cost. Filter fast, defer work, batch updates.

**When to use it:** reacting to DOM you don't control — embeds, editors, integrations, tooling. For your own rendering, state-driven updates beat DOM-watching every time.
