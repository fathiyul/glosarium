---
title: "C4 Model"
summary: "Diagramming software at four zoom levels: context, containers, components, code."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["C4 model", "c4", "c4 diagrams"]
prereqs: ["architecture-diagram", "writing-clearly"]
related: ["uml", "sequence-diagram", "class-diagram", "diagrams-as-code"]
---

The **C4 model** is a lightweight way to map a software system at four levels of zoom, each aimed at a different audience:

- Context — the system as one box, and the people and other systems it talks to. For everyone, technical or not.
- Containers — the system broken into its separately deployable/runnable pieces: applications, services, databases, message brokers. For technical people.
- Components — one container broken into its major building blocks. For the engineers working on it.
- Code — the internals of a component, usually a class or interface diagram. For the engineer writing that code (and often generated, not hand-drawn).

```text
Context → Containers → Components → Code   (zoom in further each time)
```

The point is *audience-appropriate abstraction*: you don't show a stakeholder the class diagram, and you don't show a developer only the context box. A common failure is drawing everything at one level and mixing audiences. C4 gives each question its own map.

It's notation-independent: you can draw a C4 diagram in any tool, with straightforward boxes and arrows. That's deliberate — it avoids the UML tooling overhead and focuses on the levels, not the symbology.

The classic mistakes:

- Skipping levels. Jumping straight to containers or components leaves newcomers without the context of what the system is and who uses it. Start at context.
- Hand-drawing the code level. Class/interface diagrams go stale instantly. Generate them, or omit them — the first three levels carry most of the value.
- Mixing levels in one diagram. A single diagram with the whole system *and* internal classes is confusing. Keep each diagram at one zoom.
- Decorating instead of informing. Choosing notation is less important than being clear about what each box is and how things connect.
- Never updating it. A diagram that lives only in someone's slides drifts from reality. Keep diagrams with the code and treat them as [diagrams-as-code](/t/diagrams-as-code) where possible.

**When to use it:** any time a team needs shared understanding of a system's shape and boundaries. It complements dynamic views like a [sequence diagram](/t/sequence-diagram) (which shows a flow over time) and traditional [UML](/t/uml). Applied with restraint, C4 turns "let me explain the architecture" into four pictures that each answer one question. See [architecture diagrams](/t/architecture-diagram).
