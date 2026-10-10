---
title: "Macro"
summary: "Code that expands into other code at compile time."
levels: { backend: senior }
aliases: ["macro", "macros", "textual substitution"]
prereqs: ["metaprogramming", "compiler"]
related: ["decorator-syntax", "dsl", "abstract-syntax-tree"]
---

A **macro** is code that **expands** into other code, usually at compile time. You write a short form, the preprocessor or compiler replaces it with a longer form before the real compilation happens. It's the oldest form of [metaprogramming](/t/metaprogramming): a way to avoid repetition and to express things the core language can't, without runtime cost.

Two flavours matter:

- Textual macros — a plain substitution. C's `#define MAX 100` or function-like macros swap tokens before compilation. Simple and fast, but dangerous.
- Syntactic / hygienic macros — operate on the syntax tree, not text, and avoid accidental name capture. Rust's `macro_rules!`, Lisp macros and Scheme's `syntax-rules` are of this kind.

```c
#define SQUARE(x) ((x) * (x))
SQUARE(a++)   // expands to ((a++) * (a++))  ← a is incremented twice!
```

That example is the classic textual-macro trap: because it's substitution, not a function call, arguments can be evaluated multiple times.

The classic mistakes:

- Side effects in macro arguments. `a++` expanded twice runs twice. Prefer functions or inline functions where they exist.
- Missing parentheses. Textual macros need heavy parentheses to survive surrounding operators. Even then, surprises happen.
- Debugging what isn't there. The compiler sees the *expanded* code, so errors and debuggers point at generated text, not your macro. This makes macro-heavy code hard to trace.
- Avoidable macros. A constant or a small function is often clearer and type-checked; use macros when you actually need syntactic power (new control flow, compile-time codegen).
- Hygiene problems in hand-rolled macros. A variable introduced by the macro can collide with the caller's. Hygienic macros exist to prevent exactly this.

Macros trade readability and debuggability for brevity and power. Used sparingly — for genuine syntactic needs — they're effective; overused, they create a language nobody else can read. They're the ancestor of [decorators](/t/decorator-syntax) and a key tool for building [DSLs](/t/dsl) and generated code.
