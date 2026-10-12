---
title: "Principle of Least Astonishment"
summary: "Code and APIs should behave the way people expect."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["POLA", "least surprise"]
prereqs: ["function"]
related: ["convention-over-configuration", "solid", "premature-abstraction", "tell-dont-ask"]
---

The principle of least astonishment says that a piece of code or an API should do what its name and surroundings suggest. A reader should be able to guess the behaviour without reading the implementation, and when the behaviour is unusual, the surprise should be small and clearly flagged.

A classic Python surprise is a mutable default argument. The default list is created once, when the function is defined, so every call that uses the default shares it:

```python
def add_item(item, items=[]):
    items.append(item)
    return items

add_item("a")   # ['a']
add_item("b")   # ['a', 'b']  -- the second call sees the first call's list
```

The fix makes the default explicit, so each call gets its own list:

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

The trade-off is that "least astonishment" depends on the reader. What's surprising to a newcomer may be a well-known convention to someone who has used the language for years. Consistency inside one codebase often matters more than matching a general ideal.

The classic mistake is naming a function for one thing and having it do another, such as a `get_user` that also creates the user when it's missing, or a `validate` that changes the data. Names are the first contract a reader sees. Make the name match the effect, and when an effect is unusual, put it in the name or the signature. For the broader idea of conventions a team can rely on, see [convention over configuration](/t/convention-over-configuration), and for querying versus changing state, [command-query separation](/t/command-query-separation).
