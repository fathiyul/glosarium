---
title: "UML"
summary: "A standard visual language for software diagrams."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Unified Modeling Language", "UML diagrams"]
prereqs: ["class-diagram"]
related: ["class-diagram", "sequence-diagram", "state-diagram", "architecture-diagram"]
---

UML, the Unified Modeling Language, is a standard set of notations for drawing software: classes and their relationships, the messages between objects, the states an object moves through, and how a system is deployed. It was standardized by the Object Management Group, and it's used in many tools and courses.

UML covers several kinds of diagram. A [class diagram](/t/class-diagram) shows structure, a [sequence diagram](/t/sequence-diagram) shows interactions over time, and a [state diagram](/t/state-diagram) shows behaviour in states. Each kind answers a different question, and a good design picks the one that fits.

The trade-off is depth. The full notation has many symbols, and few teams use all of them. Used lightly, UML gives a shared vocabulary for common diagrams. Used heavily, it becomes a documentation effort that needs maintenance and that many readers can't follow.

The classic mistake is drawing UML to be complete rather than to communicate. A diagram with every relationship and attribute is accurate and hard to read. Choose the one or two diagram types that answer the question at hand, show the parts that matter, and keep the rest in the code. For tools that write these diagrams as text, see [diagrams as code](/t/diagrams-as-code).
