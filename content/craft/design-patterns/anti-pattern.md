---
title: "Anti-Pattern"
summary: "A common solution that looks right but causes problems."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["anti-patterns", "antipattern"]
prereqs: ["design-pattern"]
related: ["design-pattern", "god-object", "singleton", "premature-abstraction"]
---

An anti-pattern is a solution that is common, looks reasonable, and tends to cause more problems than it solves. The term was popularized by a 1998 book that catalogued recurring failures in software projects. Unlike a [design pattern](/t/design-pattern), which is a tested answer to a recurring problem, an anti-pattern is a tempting answer that doesn't hold up.

Some familiar examples:

```
God object        one class that knows and does everything    -> god-object
Singleton abuse   a global instance used for convenience      -> singleton
Copy-paste        the same logic duplicated in many places    -> wet-code
Gold plating      extra features nobody asked for             -> yagni
```

Recognizing one is a skill. A god object appears because one class is convenient to add to. A global instance appears because it saves passing a parameter. Each feels fine when it's written and costs more later.

The trade-off is that calling something an anti-pattern can become a reflex. Context decides. A singleton is a reasonable choice for a logger in a small script, and a large class is fine if it has one clear job. Label the pattern when the cost is real, not when it merely looks unfamiliar.

The classic mistake is avoiding anti-patterns by applying a rule mechanically, such as "never use a global" or "always add an interface", and creating a different problem. Ask what the code is trying to achieve, what it will cost to change, and whether the simpler option would work. The [design pattern](/t/design-pattern) entry covers how to judge whether a pattern fits.
