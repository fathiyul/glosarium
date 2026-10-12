---
title: "Method Overloading"
summary: "Several methods with the same name but different parameters."
levels: { backend: junior, frontend: mid-level, data-engineer: junior , data-scientist: junior }
aliases: ["function overloading", "overloaded methods", "overloading"]
prereqs: ["method", "parameter-vs-argument"]
related: ["method-overriding", "default-parameter", "polymorphism", "variadic-function"]
---

Method overloading is defining several methods with the same name but different parameters. The compiler picks the right one from the arguments at the call.

```java
class Printer {
    void print(int n)        { System.out.println("int " + n); }
    void print(String s)     { System.out.println("string " + s); }
    void print(String s, int times) { ... }
}

printer.print(5);            // calls the int version
printer.print("hi");         // calls the String version
```

Java, C#, C++ and Kotlin support it. It lets one concept have convenient forms without inventing names like `printInt` and `printString`.

## Languages without it

Python and JavaScript don't have overloading, since a name refers to one function. People use other tools:

```python
def print_value(value, times=1):          # default arguments
    ...

def print_value(*args): ...               # variable arguments
def parse(x):
    if isinstance(x, str): ...            # check types inside
```

TypeScript lets you declare several signatures, with a single implementation.

## Not the same as overriding

- **Overloading**: same class, same name, different parameters, chosen at compile time.
- **Overriding**: a subclass replaces a parent's method with the same signature, chosen at run time ([method overriding](/t/method-overriding)).

## Cautions

- **Too many overloads confuse callers.** Ask whether differently named methods would be clearer.
- **Ambiguous calls** happen when `null` or numeric conversions could match several versions.
- Default parameters or a builder often replace long chains of overloads ([default parameters](/t/default-parameter)).
