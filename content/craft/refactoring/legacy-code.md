---
title: "Legacy Code"
summary: "Code without tests that you're afraid to change."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["legacy system", "legacy codebase"]
prereqs: ["unit-test"]
related: ["characterization-test", "extract-class", "chestertons-fence", "deterministic-tests"]
---

Legacy code, in Michael Feathers' well-known definition, is code without tests. Age doesn't make code legacy by itself. Code becomes legacy when changing it is risky, because nothing protects you from breaking behaviour you don't fully understand.

The usual first step is to get the code under some protection before you change its structure. A [characterization test](/t/characterization-test) records what the code does now, so a refactoring can be checked against it.

```python
# A dependency makes the function hard to test, so the first change is a seam
def send_invoice(order, mailer=None):
    mailer = mailer or SmtpMailer()   # the seam: tests can pass a fake
    mailer.send(build_invoice(order))
```

Adding a seam is a small, safe change that makes the code testable. Once tests exist, the larger refactoring can start.

The trade-off is time. Adding tests and seams to old code is slow, and the work doesn't show up as new features. Teams often feel pressure to skip it, which is why legacy code keeps getting harder to change.

The classic mistake is rewriting legacy code from scratch because it looks messy. The old code has accumulated fixes for cases nobody remembers, and a rewrite drops them. Before removing anything that looks odd, apply [Chesterton's fence](/t/chestertons-fence). Change the code in small steps, with tests at each step, using techniques such as [extracting a class](/t/extract-class) once the behaviour is protected.
