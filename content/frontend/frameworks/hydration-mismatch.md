---
title: "Hydration Mismatch"
summary: "Server and client HTML differing, causing errors or flicker."
levels: { frontend: mid-level }
aliases: ["hydration mismatch", "hydration error", "rehydration mismatch"]
prereqs: ["hydration", "rendering-strategies"]
related: ["hydration", "suspense", "rendering-strategies"]
---

A **hydration mismatch** happens when server-rendered HTML differs from what the client renders on first pass: the framework expected to adopt existing DOM and finds something else — different text, extra nodes, mismatched attributes. Development warns loudly; production either patches (costly, sometimes visibly) or discards server HTML for client rendering (losing SSR's benefit).

```text
server: <p>10:00</p>   client first render: <p>10:01</p>   → mismatch
```

Usual culprits: random values, timestamps and dates rendered per-environment; browser-only APIs (`window`, `matchMedia`) differing from server output; extensions mutating DOM before hydration; and markup invalid enough that server and client parsers disagree.

The classic mistakes:

- Nondeterministic renders. `Math.random()`, `Date.now()`, locale-dependent formatting in render paths guarantee mismatches. Render deterministically; relegate live values to effects after hydration.
- Browser-only branches in render. `typeof window` ternaries that render differently per environment mismatch by construction. Render the server-safe branch first, upgrade in effects.
- Ignoring the warnings. Dev-time mismatch warnings point at real bugs (and real UX flashes). Fix them; don't suppress.
- Extensions blamed on code. Ad-blockers and translators mutating DOM pre-hydration cause mismatches no code change fixes — suppress known-benign cases deliberately, not globally.
- Invalid HTML. Unclosed tags and misnested tables parse differently server vs client. Validate markup; the mismatch often flags genuinely broken HTML.
- Whole-tree client fallback. Letting mismatches cascade into full client re-renders silently forfeits SSR performance. Monitor mismatch rates in production.
- Timezone formatting. Server UTC vs client locale rendering different strings is the perennial mismatch. Format dates consistently (or client-only after mount).

**The discipline:** deterministic first render, environment-specific content deferred to effects, warnings treated as bugs. Hydration assumes agreement — render like it's a contract.
