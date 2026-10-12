---
title: "Pattern Matching"
summary: "Branching on the shape of data and destructuring it at the same time."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["match expression", "destructuring match"]
prereqs: ["conditional"]
related: ["conditional", "switch-statement", "destructuring", "data-type"]
---

Pattern matching checks whether a value has a particular shape, and pulls out the parts you need in the same step. Instead of testing a condition and then reading fields by hand, you describe the shape you expect and name the pieces in it.

Python 3.10 and later have a `match` statement. Here's a small command parser:

```python
def handle(command):
    match command:
        case ["go", direction]:
            return f"moving {direction}"
        case ["quit"]:
            return "bye"
        case _:
            return "unknown command"

handle(["go", "north"])   # 'moving north'
handle(["quit"])          # 'bye'
```

The first case matches a two-item list whose first item is `"go"`, and binds the second item to `direction`. The `_` case is a catch-all. Other languages, such as Rust and Scala, have their own forms of pattern matching, and many functional languages rely on it heavily.

The classic mistake is treating a match as a faster `if` chain. Its main value is clarity: each case says what shape it handles, and destructuring removes a layer of index-checking code. Order matters, because the first case that matches wins, so put specific patterns before general ones. A catch-all placed first will hide every case after it. Also, pattern matching doesn't replace validating input from outside your program.

[Conditionals](/t/conditional) are the simpler tool for plain true/false checks. Reach for pattern matching when the question is about the structure of the data.
