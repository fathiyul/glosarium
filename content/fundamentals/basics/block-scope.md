---
title: "Block Scope vs Function Scope"
summary: "Whether a variable lives until the end of its block or of the whole function."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["function scope", "block scoped variables", "scope of a variable"]
prereqs: ["variable", "scope"]
related: ["scope", "var-let-const", "shadowing", "global-variable"]
---

**Scope** is the part of a program where a name can be used. Languages differ in how big that part is.

- **Block scope**: a variable lives only inside the `{ ... }` block (an `if`, a loop, a plain block) where it's declared.
- **Function scope**: a variable lives for the whole function, no matter which block declared it.

```js
function demo() {
  if (true) {
    var a = 1;      // function scope
    let b = 2;      // block scope
  }
  console.log(a);   // 1
  console.log(b);   // ReferenceError: b is not defined
}
```

## By language

- **JavaScript**: `let` and `const` are block-scoped. `var` is function-scoped, which causes surprises ([var, let and const](/t/var-let-const)).
- **Python**: function scope. Variables created inside an `if` or `for` are still visible afterward in the same function. Only functions, classes and modules create new scopes.
- **Java, C, C#, Go**: block scope.

```python
for i in range(3):
    last = i
print(last)       # 2: it still exists after the loop
```

## Why it matters

- **Fewer accidents**: a block-scoped variable can't leak into code that shouldn't see it.
- **Loop bugs**: closures created in a loop capture a shared variable under function scope, but a fresh one under block scope.
- **Use before definition**: knowing where a name exists explains "not defined" errors.

Declare variables in the **smallest scope** that needs them. See [scope](/t/scope) and [shadowing](/t/shadowing).
