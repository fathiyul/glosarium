---
title: "Design Pattern"
summary: "A named, reusable solution to a recurring design problem."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["design patterns", "software pattern"]
prereqs: ["interface"]
related: ["gang-of-four", "anti-pattern", "strategy-pattern", "observer-pattern"]
---

A design pattern is a named, reusable approach to a problem that comes up again and again in software design. It describes the forces involved, the shape of a solution, and the trade-offs of using it. The value of the name is shared vocabulary: "this is an observer" tells a team what to expect without a long explanation.

A pattern is a description, not a library. You adapt it to your code. Two projects can both use a strategy pattern with completely different classes, and both are right.

The trade-off is that patterns add structure, and structure has a cost. Each one introduces types, indirection and a way of thinking the next developer has to learn. A pattern used where the problem doesn't exist makes the code harder to read. The name can also become a reason to skip the simpler design.

The classic mistake is starting with a pattern and forcing the problem to fit it. Begin with the problem and the pressure it creates, such as code that must change in several places for one rule, and then ask whether a known pattern describes a good answer. Patterns that are known to cause trouble when misused are described as [anti-patterns](/t/anti-pattern). The best-known catalogue is the [Gang of Four](/t/gang-of-four) book, and [strategy](/t/strategy-pattern) is a common example of a pattern that fits a varying rule.
