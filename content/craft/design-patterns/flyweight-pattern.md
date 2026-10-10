---
title: "Flyweight"
summary: "Sharing common state among many small objects to save memory."
levels: { backend: senior, frontend: senior }
aliases: ["flyweight", "flyweight pattern", "interning"]
prereqs: ["design-pattern", "object-pool"]
related: ["gang-of-four", "singleton", "composite-pattern"]
---

**Flyweight** reduces memory when you have a huge number of similar objects by sharing the part they have in common. The pattern splits each object's state into:

- intrinsic state — the same across many instances, stored once and shared.
- extrinsic state — the part that differs, passed in from outside when it's needed.

A text editor is the classic example. A character's *glyph* (the shape for the letter "e") is intrinsic and identical for every "e" on the page; its *position* is extrinsic and differs per character. Instead of one object per character holding its own glyph, you share one glyph object among thousands of character references.

```text
shared flyweights:  Glyph('e'), Glyph('a'), Glyph(' ')   ← one each
per instance:       Character { glyph → shared, x, y }   # keeps only the position
```

The pattern shows up wherever there are many small items: characters in a document, tiles in a map, bullets in a game, repeated node types in a large tree. It also underlies *interning* — sharing equal immutable values (common in strings and symbols).

The classic mistakes:

- Sharing mutable state. Flyweights must be immutable; if one instance changes the shared part, every instance sees it. Keep intrinsic state read-only.
- Premature optimisation. Flyweight adds an indirection (a lookup to get the shared object) and complexity. Reach for it when memory is genuinely the problem, measured — not by default.
- Confusing it with [object pooling](/t/object-pool). A pool reuses whole objects over time for performance; a flyweight shares a *part* of many live objects to save memory. Different goals.
- Sharing the wrong part. If the "shared" state is actually unique per instance, you save nothing and add overhead.
- Forgetting the lifetime. Flyweights usually live as long as the whole structure; a factory or a [singleton](/t/singleton)-style cache supplies them. Manage that cache so it doesn't grow without bound.

**When to use it:** when you've measured that many objects dominate memory and a large part of each is identical. It's a structural [Gang of Four](/t/gang-of-four) pattern that trades a lookup for memory, and it pays off only at scale.
