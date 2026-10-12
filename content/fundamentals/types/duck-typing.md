---
title: "Duck Typing"
summary: "If it has the right methods, it's the right type."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["duck typing", "structural duck typing"]
prereqs: ["variable"]
related: ["structural-vs-nominal-typing", "interface", "static-vs-dynamic-typing"]
---

Duck typing means you decide whether an object fits a role by what it can do, not by what class it comes from. The name comes from the saying: if it walks like a duck and quacks like a duck, treat it as a duck.

```python
import io

def read_all(source):
    return source.read()       # works for anything with a read() method

read_all(open("notes.txt"))    # a file
read_all(io.StringIO("hi"))    # an in-memory buffer
```

`read_all` never checks the type. It just calls `read`. A file and a `StringIO` share no base class, yet both work, which makes code flexible and easy to test with fakes.

The trade-off is that mistakes appear at runtime. If you pass something without `read`, the error comes from deep inside the function, possibly long after the call. Dynamic languages accept this to keep code short. Static checkers can catch it in advance: Python's `typing.Protocol` describes the required methods, and a type checker verifies them without requiring inheritance. TypeScript does the same with [structural typing](/t/structural-vs-nominal-typing).

The classic mistake is relying on duck typing for objects that only look compatible. A method named `read` might return bytes in one class and text in another, and the code still "works" until the data is wrong. Check the behaviour, not only the method names, and write the role down with a [protocol or interface](/t/interface) when more than one team depends on it.
