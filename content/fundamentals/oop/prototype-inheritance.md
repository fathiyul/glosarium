---
title: "Prototypal Inheritance"
summary: "JavaScript's model where objects inherit directly from other objects."
levels: { frontend: mid-level , data-scientist: mid-level }
aliases: ["prototype chain", "prototype-based inheritance"]
prereqs: ["object"]
related: ["abstract-class", "class", "this-binding"]
---

In JavaScript, objects inherit directly from other objects, not from classes. Each object has a link to a prototype. When you read a property the object doesn't have, the engine checks the prototype, then the prototype's prototype, and so on up the chain.

```javascript
const animal = { speak() { return `${this.name} makes a sound`; } };
const dog = Object.create(animal);
dog.name = "Rex";

dog.speak();                              // "Rex makes a sound"
Object.getPrototypeOf(dog) === animal;    // true
```

`dog` has no `speak` of its own. The lookup goes to `animal`, and `this` still refers to `dog`, so the method uses `dog`'s name. The `class` syntax in modern JavaScript is a more familiar way to write this, but it compiles down to the same prototype mechanism.

The trade-off is flexibility against surprise. You can change or add methods at runtime, which is powerful, but it's harder to see at a glance where a method came from. Prototypes also hold data that is shared by every object that inherits from them, which causes problems if you're not expecting it.

The classic mistake is storing a mutable value on the prototype. Every object in the chain shares it, so pushing to an array on the prototype affects all of them, and nobody notices until a bug shows up. Put per-object state in the object itself, in the constructor or on the instance. For the wider picture of composing behaviour in JavaScript, see [classes](/t/class) and [`this` binding](/t/this-binding).
