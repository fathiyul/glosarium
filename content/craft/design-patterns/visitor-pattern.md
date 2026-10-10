---
title: "Visitor"
summary: "Adding operations to a structure without changing its classes."
levels: { backend: senior, frontend: senior }
aliases: ["visitor", "visitor pattern", "double dispatch"]
prereqs: ["design-pattern", "composite-pattern"]
related: ["gang-of-four", "iterator-pattern", "interface", "abstract-class"]
---

**Visitor** lets you add new operations to a set of classes without modifying those classes. You define a visitor with one method per type in the structure; each element has an `accept(visitor)` method that calls back the right visitor method. The operation lives in the visitor, so you can add a new operation by writing a new visitor — not by editing every element class.

```text
element.accept(visitor) → visitor.visitThisElement(this)
```

The mechanism is **double dispatch**: which method runs depends on *two* types — the element's type (via `accept`) and the visitor's type (via the method it calls). That's how a single call routes to the right combination of element and operation, which ordinary single dispatch can't express.

It's most useful with a stable element hierarchy and many operations: an [AST](/t/abstract-syntax-tree) with visitors for type-checking, formatting, and code generation; a [composite](/t/composite-pattern) tree with visitors for rendering, counting and validation. Adding an operation is a new visitor; the element classes stay closed.

The classic mistakes:

- Adding a new element type. Visitor makes *operations* easy to add but *types* hard: a new element class means updating every visitor. If your element set changes often, visitor is the wrong tool. (This is the expression problem, and it cuts both ways — visitor favours stable types, varying operations.)
- Leaking element internals. For the visitor to do its work it often needs the element's data. Expose just enough, or the visitor becomes a backdoor that breaks encapsulation.
- Using it where simple polymorphism works. If each type already has a method that does the job, a visitor is ceremony. Reach for it when operations are many and types are few.
- Forgetting traversal. A visitor often needs a way to walk the structure; that's the [iterator](/t/iterator-pattern)'s or the composite's job. Keep traversal separate from the operation.
- A visitor that mutates the structure while traversing it, causing skips or errors. Either build a new structure or be careful about order.

**When to use it:** when you have a stable set of types and a growing set of operations on them, and you want to keep operations out of the type classes. It's a behavioural [Gang of Four](/t/gang-of-four) pattern, tightly bound to tree-shaped structures like ASTs and composites.
