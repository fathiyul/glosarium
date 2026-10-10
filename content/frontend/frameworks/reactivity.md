---
title: "Reactivity"
summary: "Automatically updating the UI when data changes."
levels: { frontend: mid-level }
aliases: ["reactivity", "reactive state", "reactive programming ui"]
prereqs: ["state-management", "signals"]
related: ["signals", "proxy-reflect-js", "state-management"]
---

**Reactivity** means the UI updates when state changes — without manual DOM queries or re-render calls. Assign `user.name = "Bo"`, and every binding, computed and effect depending on it refreshes. The framework tracks dependencies (reads during render/computation) and notifies precisely on writes.

```text
state.name = "Bo"  →  dependents (header, greeting, computed fullName) update
```

Implementations vary — virtual-DOM re-render with diffing, fine-grained signals updating exact nodes, Proxy-based tracking — but the contract is the same: declare derivations, mutate state, the view follows.

The classic mistakes:

- Mutating outside the system. Changing untracked copies, raw DOM, or non-reactive fields silently desynchronises UI. All state flows through reactive sources.
- Over-subscription. Components reading whole stores re-render on any change. Select narrowly — subscribe to the fields used, not the store.
- Derived state duplicated. Storing computables (`fullName`) alongside sources invites divergence. Derive (`computed`/`useMemo`/selectors), don't duplicate.
- Effect avalanches. Cascading effects (A updates B updates C…) loop or thrash. Model derivations as computed values; reserve effects for external sync.
- Async staleness. Fetch-then-set races (slow response overwriting fresh state) need cancellation or generation checks. Reactivity propagates values, not correctness.
- Framework-hopping mental models. Signals, observables, and vdom diffing have different granularity and timing. Learn the one you use; don't assume transfer.
- Debugging derived chains. Long computed chains obscure origins. Name derivations well and use devtools that trace dependency graphs.

**The contract:** state in, UI out, derivations declared. Keep sources minimal, derive the rest, mutate through the system — and reactivity stays an asset instead of a mystery.
