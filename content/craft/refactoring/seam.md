---
title: "Seam"
summary: "A place where you can change behavior without editing the code there."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["seam", "seam in testing", "enabling point"]
prereqs: ["legacy-code", "dependency-injection"]
related: ["characterization-test", "refactoring", "unit-test", "test-double"]
---

A **seam** is a place in the code where you can change behaviour without editing the code at that point. Michael Feathers introduced the term for working with [legacy code](/t/legacy-code): before you can test or refactor tangled code, you first create seams — **substitution points** — so you can swap one behaviour for another (often a test [double](/t/test-double)) and get a foothold.

A seam usually has two parts: a place where a decision is made (an "enabling point"), and the mechanism that lets you change what that decision picks. Common kinds:

- Object seam — replace a dependency with a test double through [dependency injection](/t/dependency-injection), a constructor parameter, or a factory.
- Link/import seam — substitute a different implementation at link or module-load time.
- Interface seam — swap the concrete implementation behind an interface, which is the dependency-injection form most people mean.

```text
legacy:  order.save(); sendEmail(order);        # can't test without emailing
seam:    order.save(); notifier.send(order);    # inject a fake notifier in tests
```

That one injected `notifier` is the seam: production passes the real one, the test passes a fake, and no email is sent. The code path didn't change; the *decision point* became substitutable.

The classic mistakes:

- Trying to test before there's a seam. If a function reaches out to a database or `new`s up its dependency internally, there's no substitution point, so tests need the real thing. Add the seam first, then test.
- Seams everywhere. Every injection point is also added indirection. Add seams where you need to break a dependency; don't wrap everything "just in case".
- Changing behaviour while adding the seam. Introducing a substitutable point should be a behaviour-preserving refactor. Use [characterization tests](/t/characterization-test) to pin current behaviour before you touch it.
- Confusing a seam with an interface for its own sake. A seam exists to *enable a change* — testing, swapping an implementation. If nothing needs to vary, it's premature abstraction.
- Seams that leak the real thing. A "fake" that still hits the network isn't a seam worth having. Make the substitution clean.

Seams are how you make untestable code testable enough to refactor it safely: create the substitution point, write a [characterization test](/t/characterization-test) that captures the current behaviour, then improve the design behind it. It's the first move in almost every "add tests to legacy code" playbook.
