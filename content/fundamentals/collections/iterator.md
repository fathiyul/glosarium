---
title: "Iterator"
summary: "An object that yields items one at a time from a sequence."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["iterator protocol", "iterable"]
prereqs: ["loop"]
related: ["generator", "lazy-evaluation", "list"]
---

An iterator is an object that gives you the items of a sequence one at a time. It exposes a way to ask for the next item, and it signals when there are none left. Many languages have this protocol, and it's what a `for` loop uses behind the scenes.

In Python, an iterator defines `__iter__` (returns itself) and `__next__` (returns the next item, or raises `StopIteration`):

```python
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

list(Countdown(3))   # [3, 2, 1]
```

An iterable is different from an iterator: it can produce an iterator (through `__iter__`), and so it can be looped over more than once. A list is iterable. An iterator is usually single-pass, so once it's exhausted, looping over it again gives nothing. With `c = Countdown(2)`, the first `list(c)` gives `[2, 1]` and a second `list(c)` gives `[]`.

Writing an iterator class by hand is verbose. A [generator](/t/generator) gives you the same behaviour with much less code, and that's usually the better choice. Write a class-based iterator when you need extra methods, such as a `reset` or a way to peek ahead, or when the object has to be both the sequence and the cursor over it.

The classic mistake is modifying a collection while iterating over it, such as removing items from a list in a `for` loop. Items get skipped, and the result looks almost right. Build a new collection instead, or iterate over a copy.
