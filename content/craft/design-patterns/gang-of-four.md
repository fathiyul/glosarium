---
title: "Gang of Four"
summary: "The 1994 book that catalogued 23 classic patterns."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["GoF", "Design Patterns book", "GoF book"]
prereqs: ["design-pattern"]
related: ["design-pattern", "factory-method", "observer-pattern", "strategy-pattern"]
---

The Gang of Four (GoF) is the name given to the four authors of *Design Patterns: Elements of Reusable Object-Oriented Software*, published in 1994: Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides. The book describes 23 patterns, grouped into three categories: creational patterns for how objects are made, structural patterns for how they're composed, and behavioural patterns for how they interact.

Several entries in this glossary come from that book, including [factory method](/t/factory-method), [observer](/t/observer-pattern), [strategy](/t/strategy-pattern) and [decorator](/t/decorator-pattern). Its descriptions are written in a standard format: name, intent, motivation, structure, and consequences.

The trade-off is that the book was written with C++ and Smalltalk in mind, and some patterns exist mainly to work around limits of those languages. Many languages now provide features that make a pattern unnecessary, such as first-class functions in place of a strategy class. The book's ideas on structure and trade-offs still hold up better than its specific class diagrams.

The classic mistake is treating the 23 patterns as a checklist to implement, rather than as a vocabulary for problems you actually have. Read the intent and the consequences first, and check whether your language already solves the problem. For how patterns fit into design more broadly, see the [design pattern](/t/design-pattern) entry.
