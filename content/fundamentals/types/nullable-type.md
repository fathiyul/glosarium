---
title: "Nullable Type"
summary: "A type that explicitly allows null, forcing you to handle it."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["optional type", "nullable"]
prereqs: ["null", "data-type"]
related: ["null", "option-type", "optional-chaining", "type-narrowing", "undefined"]
---

A nullable type is a type that explicitly allows `null` as one of its values. In languages that track this, a plain `string` can never be null, while a `string?` can, and the compiler makes you handle that case.

```ts
let name: string = "Ana";
name = null;                  // error under strict null checks

let nickname: string | null = null;   // allowed
nickname.toUpperCase();               // error: it might be null
if (nickname !== null) nickname.toUpperCase();   // fine
```

```kotlin
val a: String = "x"      // never null
val b: String? = null    // nullable
b?.length                // safe call: null if b is null
```

```csharp
string? maybe = null;
```

```python
from typing import Optional
def find(id: int) -> Optional[User]: ...      # may return None
```

## Why it helps

Null errors ("cannot read property of null") are among the most common crashes. When absence is part of the type, the compiler tells you every place that forgets to handle it, before the code runs.

## Handling a nullable value

- **Check first**, then use it (narrowing).
- **Safe-navigation operators**: `user?.address?.city` ([optional chaining](/t/optional-chaining)).
- **Provide a default**: `name ?? "Anonymous"`.
- **Fail loudly** if absence is a bug (`!` or `assert`), knowing you're overriding the safety.

## Habits

- **Make things non-nullable by default**, and nullable only where absence is meaningful.
- **Turn on strict null checking** (`"strict": true` in TypeScript).
- **Don't use null for errors.** Return a result type or throw ([option and result types](/t/option-type)).
- Languages with an [option type](/t/option-type) (Rust, Swift, Scala) do the same job without `null` at all.

See [null](/t/null) for how it fails at runtime.
