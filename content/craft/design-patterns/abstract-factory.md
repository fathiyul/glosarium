---
title: "Abstract Factory"
summary: "Creating families of related objects without naming concrete classes."
levels: { backend: senior, frontend: senior }
aliases: ["abstract factory", "abstract factory pattern", "kit"]
prereqs: ["factory-method", "interface"]
related: ["design-pattern", "gang-of-four", "abstract-class", "dependency-injection"]
---

**Abstract factory** is a creational pattern for building **families** of related objects that must be used together, without the calling code naming any concrete class. You define an abstract factory with one method per product in the family; each concrete factory produces a consistent set — all the buttons, checkboxes and menus for one platform, all the database drivers for one vendor.

```text
AbstractFactory:  createButton(), createCheckbox()
MacFactory:       MacButton, MacCheckbox
WinFactory:       WinButton, WinCheckbox
```

The client holds an `AbstractFactory` and gets matching products from it. Swap the factory and the whole family changes at once — which is the point: you can't accidentally mix a Mac button with a Windows checkbox, because a single factory supplies the whole set.

The distinction from [factory method](/t/factory-method): factory method creates *one* product and is usually overridden in a subclass; abstract factory creates a *family* of products and is usually an injected object. Abstract factory is often built from several factory methods.

The classic mistakes:

- Using it when only one product varies. If there's no family to keep consistent, abstract factory is ceremony. A single [factory method](/t/factory-method) or a plain function is simpler.
- Reaching for it at every "new". Creational patterns earn their keep when the *choice of concrete type* genuinely varies at runtime or must be swapped (platforms, vendors, environments). Otherwise, direct construction is clearer.
- Forgetting configuration. In modern code the "factory" is often just [dependency injection](/t/dependency-injection) wiring one family per environment — you rarely write the class hierarchy. Recognise the pattern, then use the language's tools to express it.
- Over-abstracting the products. If the family is stable, the indirection adds a layer for no real flexibility.
- Confusing it with a single switch. A `switch` producing one type is not a family; abstract factory is about keeping multiple related products consistent.

Use it when you have interchangeable *suites* of objects — cross-platform UI kits, pluggable storage backends, test doubles for a whole subsystem — and you want to guarantee a consistent set. It's a [Gang of Four](/t/gang-of-four) creational pattern, closely tied to [abstract classes](/t/abstract-class) and interfaces.
