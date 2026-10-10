---
title: "Immutable Infrastructure"
summary: "Replacing servers instead of changing them."
levels: { backend: senior, data-engineer: senior }
aliases: ["immutable infrastructure", "immutable servers", "replace not patch"]
prereqs: ["infrastructure-as-code", "server"]
related: ["pets-vs-cattle", "configuration-drift", "container", "blue-green-deployment", "docker-image"]
---

**Immutable infrastructure** means you never modify a running server once it's deployed. To change it, you build a new version — a new image or machine — and replace the old one. The old instance is destroyed, not patched. Nothing accumulates in place, so every instance is identical to its definition.

It's the server-side version of [pets vs cattle](/t/pets-vs-cattle): instances are disposable and interchangeable. It pairs naturally with images and [containers](/t/container), where you build a new [image](/t/docker-image) and roll it out.

```text
mutable:   deploy v1 → ssh in → patch → patch → unique machine
immutable: build image v2 → replace all v1 → every instance identical
```

The classic mistakes:

- Putting state on the instance. If a machine holds data or uploads locally, replacing it loses them. State belongs on a volume or a managed store, not the instance.
- Long rebuild times. Replacement only works if you can build and launch a new instance quickly. Slow, manual image builds make immutability impractical — automation is what makes it viable.
- Patching out of habit. The instinct to SSH in and fix a running server reintroduces mutability and [drift](/t/configuration-drift). Fix the build instead.
- Forgetting rollback. Replacing is easy to reverse *if* you kept the previous image. Keep the last known-good version ready (see [blue-green deployment](/t/blue-green-deployment)).

The payoff is consistency and predictability: if every instance is built the same way, "works on one, works on all" is true, and a rebuild reproduces production exactly.

**When not to use it:** when state genuinely lives on the machine (a single database node) or when rebuilds are too slow to be practical. In those cases you mutate carefully, but you're accepting drift risk. Most application servers should be immutable; the exceptions are deliberate.
