---
title: "Bridge"
summary: "Separating an abstraction from its implementation so both can vary."
levels: { backend: senior, frontend: senior }
aliases: ["bridge", "bridge pattern", "handle/body"]
prereqs: ["design-pattern", "abstract-class"]
related: ["adapter-pattern", "strategy-pattern", "decorator-pattern", "interface"]
---

**Bridge** splits a type into two hierarchies — an **abstraction** and an **implementation** — connected by a reference, so each can vary independently. Instead of one class hierarchy that multiplies (every combination of shape *and* rendering backend), you have a shape hierarchy that *holds* a rendering implementation. Adding a new shape doesn't touch the renderers, and adding a new renderer doesn't touch the shapes.

```text
Abstraction:     Shape ──holds──▶ Renderer (implementation)
                 Circle, Square         VectorRenderer, RasterRenderer

without bridge:  CircleVector, CircleRaster, SquareVector, SquareRaster, ...
```

The problem it solves is combinatorial explosion: two independent dimensions of variation, combined in one hierarchy, produce N×M classes. Bridge separates the dimensions so you get N + M.

The distinction from related patterns: an [adapter](/t/adapter-pattern) makes an *existing* interface fit another; bridge is a design *up front* to let abstraction and implementation vary. A [strategy](/t/strategy-pattern) is about swapping an algorithm; bridge is broader — it's about decoupling two entire hierarchies. A [decorator](/t/decorator-pattern) adds responsibilities to one object; bridge composes a whole abstraction over an implementation.

The classic mistakes:

- Confusing it with adapter. Adapter is a retrofit for incompatible interfaces; bridge is a deliberate split. If you're making existing code fit, that's adapter.
- Splitting prematurely. If one dimension never varies, you've added indirection for nothing. Bridge pays off only when both sides genuinely change independently.
- Interfaces for their own sake. Creating an interface with one implementation, "in case", is speculative. Add the bridge when the second dimension actually appears.
- Leaking the implementation. If the abstraction still exposes implementation-specific details, the split isn't real.

**When to use it:** when you can see two axes of change — an abstraction (what it does) and a platform or backend (how it does it) — and you want to extend either without touching the other. That's common for cross-platform rendering, drivers, and abstraction over multiple protocols. It's a structural [Gang of Four](/t/gang-of-four) pattern.
