---
title: "structuredClone"
summary: "The built-in deep copy for JavaScript values."
levels: { frontend: mid-level }
aliases: ["structuredclone", "structured clone", "deep clone"]
prereqs: ["javascript", "indexeddb"]
related: ["javascript", "indexeddb", "main-thread"]
---

**`structuredClone()`** deep-clones a value — nested objects, arrays, Maps, Sets, Dates, typed arrays, even cyclic references — in one call, using the same structured-clone algorithm behind `postMessage` and IndexedDB. It retires the `JSON.parse(JSON.stringify(x))` hack with its dropped `undefined`, mangled Dates, blown Maps and cycle crashes.

```js
const copy = structuredClone(state);  // cycles OK, Dates stay Dates
```

Cloning matters wherever mutation must not leak: state snapshots, undo buffers, worker messages, cache inserts. A correct, fast primitive beats hand-rolled recursive cloners that forget a type. Prefer it over serialisation round-trips anywhere the value shapes above apply.

The classic mistakes:

- JSON round-trip cloning. The old hack silently corrupts (Dates→strings, Maps→`{}`, functions/`undefined` dropped, cycles throw). Use the real primitive.
- Cloning what shouldn't clone. Functions, DOM nodes and some host objects throw — clone data, not behaviour or live objects.
- Clone-per-render. Deep-cloning large state on every render wastes more than mutation bugs cost. Clone at boundaries (updates, snapshots), compare by reference elsewhere.
- Assuming infinite depth is free. Enormous graphs still cost time and memory; structuredClone is correct, not magic. Clone subtrees, not worlds.
- Forgetting transferables. For worker handoff, *transferring* buffers (zero-copy) beats cloning them. Clone for copies, transfer for moves.
- Shallow-copy confusion. Spread/`Object.assign` copy one level; nested mutation still leaks. Match the copy depth to the mutation risk.
- Support floors. Older runtimes lack it; a small ponyfill covers them without penalising modern engines.

**The rule:** clone data at trust and mutation boundaries with the platform primitive — correct types, cycles included, no serialisation detour.
