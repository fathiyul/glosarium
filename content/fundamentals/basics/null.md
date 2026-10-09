---
title: "Null / None / nil"
summary: "A value meaning \"nothing here\", and the source of countless crashes."
levels: { backend: junior, frontend: junior }
aliases: ["None", "nil", "NULL", "null pointer"]
prereqs: [variable]
related: [undefined, optional-chaining, option-type, null-object-pattern, truthy-falsy]
core: [backend, frontend]
---

**Null** (called `None` in Python, `nil` in Ruby and Go, `null` in JavaScript and SQL) is a
value that means "there is no value here". A user with no middle name, a search with no
result, a field not filled in yet.

The problem is that it looks like any other value until you use it:

```python
user = find_user(42)        # returns None when there's no such user
print(user.name)            # AttributeError: 'NoneType' object has no attribute 'name'
```

```js
const user = findUser(42);  // null
console.log(user.name);     // TypeError: Cannot read properties of null
```

That crash, in one form or another, is one of the most common bugs there is.

## How to handle it

- **Check before you use it**, at the point where nothing is a normal outcome:

```python
user = find_user(42)
if user is None:
    return not_found()
```

- **Use `is None`, not `== False` or `if not user`**, when 0, `""` or an empty list are
  valid values you don't want to treat as "missing".
- **Decide what a function returns when there's no answer**, and document it. Returning an
  empty list is often safer than returning null.
- **In JavaScript**, [optional chaining](/t/optional-chaining) (`user?.name`) avoids the
  crash, but don't use it to hide values that should never be missing. Also see how null
  differs from [undefined](/t/undefined).
- **In SQL**, `NULL` never equals anything, not even itself. Write `WHERE x IS NULL`, not
  `WHERE x = NULL`.

## Null is not zero

`0`, `""` and `[]` are real values. Null means *no value at all*. Mixing them up leads to
bugs like treating a missing price as free.

Some languages make absence explicit in the type system (see the
[option type](/t/option-type)), so the compiler makes you handle it.
