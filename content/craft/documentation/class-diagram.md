---
title: "Class Diagram"
summary: "A diagram of classes, their fields and relationships."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["UML class diagram", "class relationship diagram"]
prereqs: ["class"]
related: ["architecture-diagram", "inheritance", "interface", "composition-over-inheritance"]
---

A class diagram shows classes, their main fields and methods, and how they relate: inheritance, interfaces they implement, and which classes hold references to others. It's a UML diagram, and it's most useful for showing the structure of one area of code rather than the whole system.

```
        Shape  (abstract)
          ^
   +------+------+
Circle         Square

Order  *--->  OrderLine     (an order contains many order lines)
```

An arrow with a hollow head means inheritance or interface implementation. A line with a diamond marks ownership, and a plain line with a number shows how many items are involved.

The trade-off is that a diagram of code stays accurate only while the code is stable, and a detailed one becomes noise quickly. Generated diagrams from source are always current, but they include every helper and private field, which hides the design. Hand-drawn ones show the design but can drift.

The classic mistake is drawing every class in the project on one page. Draw one area at a time, with the classes a reader needs to understand a decision, and leave out the rest. For the bigger view of how components connect, see the [architecture diagram](/t/architecture-diagram), and for the relationships themselves, [inheritance](/t/inheritance) and [composition over inheritance](/t/composition-over-inheritance).
