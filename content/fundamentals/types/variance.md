---
title: "Covariance and Contravariance"
summary: "How subtyping of generic types follows their type parameters."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["variance", "covariant", "contravariant"]
prereqs: ["generics", "type-system"]
related: ["interface", "type-inference", "structural-vs-nominal-typing", "abstract-class"]
---

If `Dog` is a subtype of `Animal`, is `List<Dog>` a subtype of `List<Animal>`? **Variance** answers how subtyping of a generic type follows from its type parameters, and the answer is "it depends on what the container does".

- Covariant — follows the parameter in the same direction: `Producer<Dog>` is a `Producer<Animal>`, because a producer of dogs is a producer of animals. You can safely read from it.
- Contravariant — follows in the opposite direction: `Consumer<Animal>` is a `Consumer<Dog>`, because something that accepts any animal can accept a dog. You can safely write to it.
- Invariant — neither: `List<Dog>` is not related to `List<Animal>` at all.

A useful rule is "producers covariant, consumers contravariant". It's often written **PECS** — *Producer Extends, Consumer Super* — for languages that express variance at the use site.

The classic mistakes:

- Assuming mutable containers are covariant. They can't be. If `List<Dog>` were a `List<Animal>`, you could add an `Animal` that isn't a dog, and a later reader expecting a dog would break. This is the unsound hole in old languages' array covariance.
- Fighting the compiler. Error messages about "expected `Animal`, found `Dog`" are usually the compiler stopping you from an unsound assignment. The fix is the right annotation (or a call-site wildcard), not a cast that defeats the check.
- Mixing up the directions. Covariance and contravariance are easy to swap. Anchor with the producer/consumer rule: reading narrows (covariant), writing widens (contravariant).
- Over-tuning. Most code never needs explicit variance. Reach for it when designing library types or generic APIs; otherwise let the language's defaults do their job.

Variance is why [interfaces](/t/interface) and function types behave the way they do in [structural type systems](/t/structural-vs-nominal-typing), and why the same generic class can accept different parameter types depending on whether you'll pass values in or read them out.
