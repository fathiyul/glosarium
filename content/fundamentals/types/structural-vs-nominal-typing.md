---
title: "Structural vs Nominal Typing"
summary: "Compatible by shape vs compatible by declared name."
levels: { backend: senior, frontend: mid-level, data-engineer: senior , data-scientist: senior }
aliases: ["structural typing", "nominal typing"]
prereqs: ["interface"]
related: ["duck-typing", "interface", "intersection-type", "type-inference"]
---

Typing systems differ in how they decide whether two types are compatible. Under structural typing, a value fits a type if it has the required members, whatever it's declared as. Under nominal typing, the value must be declared to be that type, by name.

TypeScript is structural:

```typescript
interface HasId { id: number }

function show(x: HasId) {
  console.log(x.id);
}

const order = { id: 7, total: 40 };   // never declared as HasId
show(order);                           // fine: it has an id of the right type
```

Java is nominal. A class must say `implements HasId` to be accepted where `HasId` is required, even if its methods match exactly.

Structural typing lets you describe what a function needs without coupling code to a class hierarchy, which suits many small functions. Nominal typing makes intent explicit: a `Celsius` and a `Fahrenheit` with the same shape stay distinct types, so you can't pass one where the other is expected by accident.

The trade-off is between flexibility and accidental compatibility. Structural typing can let two unrelated types pass because they happen to share field names, which can hide a real mismatch. Nominal typing needs more declarations and can make it harder to adapt code you don't own. Many languages mix the two, and TypeScript supports a nominal-like pattern with branded types when that matters.

The classic mistake is assuming structural typing guarantees meaning. A `{ id: number }` from a database row and a `{ id: number }` from a payment ID look identical to the type checker, but they aren't interchangeable. Name the distinct concepts, or use nominal wrappers, where the difference matters. See [duck typing](/t/duck-typing) for the runtime version of the same idea.
