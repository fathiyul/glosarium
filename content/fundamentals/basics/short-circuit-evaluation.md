---
title: "Short-Circuit Evaluation"
summary: "&& and || stopping as soon as the result is known."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["short circuit", "lazy evaluation of boolean operators", "and or short-circuit"]
prereqs: ["boolean"]
related: ["boolean", "truthy-falsy", "conditional", "operator", "null"]
---

Short-circuit evaluation means that `and` / `&&` and `or` / `||` stop evaluating as soon as the result is known. The right-hand side may never run.

```python
False and expensive()     # expensive() is never called: the result must be False
True or expensive()       # never called: the result must be True
```

## A useful guard

Because the right side is skipped, you can safely check something before using it:

```python
if user and user.is_active:        # user.is_active only runs if user isn't None
    ...

if items and items[0] == "x":      # no IndexError on an empty list
    ...
```

```js
const city = user && user.address && user.address.city;   // the old way; today use user?.address?.city
```

## Providing defaults

`or` / `||` returns the **first truthy value**, and `and` / `&&` returns the **first falsy** one, not just `True`/`False`:

```python
name = given_name or "Anonymous"
```

Careful: `0`, `""` and `[]` are falsy, so `count or 10` replaces a real `0`. In JavaScript, use `??` to replace only `null` and `undefined` ([truthy and falsy](/t/truthy-falsy)).

## Pitfalls

- **Side effects on the right can be skipped.** `ok = check_a() and save()` won't call `save()` if `check_a()` fails. That's usually the point, but don't rely on it for hidden behavior.
- **Order matters.** Put the cheap or safe check first.
- The `&` and `|` operators don't short-circuit. They're bitwise ([bitwise operations](/t/bitwise-operation)).
