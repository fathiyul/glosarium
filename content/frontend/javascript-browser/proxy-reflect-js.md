---
title: "Proxy and Reflect"
summary: "Intercepting operations on objects; how some reactivity systems work."
levels: { frontend: senior }
aliases: ["proxy", "reflect", "javascript proxy"]
prereqs: ["javascript", "reactivity"]
related: ["reactivity", "signals", "javascript"]
---

**Proxy** wraps an object and intercepts its fundamental operations — property get/set, `in`, deletion, function calls, construction — via handler traps; **Reflect** exposes those same operations as functions (the defaults traps delegate to). Together they're JavaScript metaprogramming: reactivity systems, validation layers, and mocks built from interception rather than code generation.

```js
const tracked = new Proxy(state, {
  get(t, k, r) { record(k); return Reflect.get(t, k, r); },
  set(t, k, v, r) { const ok = Reflect.set(t, k, v, r); notify(k); return ok; }
});
```

Frameworks' fine-grained reactivity (Vue, Solid, MobX-style) stands on exactly this: reads tracked, writes notified, views updated surgically.

The classic mistakes:

- Proxies everywhere. Every proxied access pays interception overhead; wrapping entire stores wholesale slows hot paths. Proxy at boundaries (state roots), not per leaf.
- Identity breakage. `proxy !== target` — Maps keyed by target, `instanceof` subtleties, and private-field access (which rejects proxies) all bite. Preserve and compare identities carefully.
- Invariant violations. Traps must respect language invariants (non-configurable properties can't lie); sloppy traps throw TypeErrors in strict paths. Delegate to Reflect for the default.
- Reactivity cascading. Notifying on every set without batching re-renders per keystroke of state change. Batch notifications to transaction/render boundaries.
- Deep vs shallow. Auto-wrapping nested objects recursively surprises (identity churn, perf); shallow proxies with explicit nesting are predictable.
- Debugging opacity. Proxied objects confuse DevTools and logging (getters firing on inspection!). Provide inspection escapes and avoid side-effecting gets.
- Validation as sole enforcement. Client-side traps are UX, not security — the server validates independently. Proxies shape behaviour; they prove nothing.

**How to use them:** reactivity cores, validation/normalisation layers, test doubles and instrumentation — interception at designed boundaries, Reflect-preserving defaults, identities tracked. Power tools for framework authors and targeted application needs.
