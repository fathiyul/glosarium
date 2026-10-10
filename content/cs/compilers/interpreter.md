---
title: "Interpreter"
summary: "A program that executes source code directly."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["interpreter", "interpretation", "interpreted language"]
prereqs: ["parser", "abstract-syntax-tree"]
related: ["compiler", "jit-compilation", "bytecode", "virtual-machine-runtime"]
---

An **interpreter** executes a program **directly**, without first producing a separate machine-code artifact. It reads the code (or an [AST](/t/abstract-syntax-tree), or [bytecode](/t/bytecode)) and carries out each operation as it encounters it. There's no compile step to wait for; the program runs immediately.

```text
compiler:    source → [build] → artifact → run
interpreter: source → run (walking the tree or bytecode as it goes)
```

The trade-offs invert the [compiler's](/t/compiler):

- Fast to start — no build phase, ideal for scripts and quick iteration.
- Slower to run — interpreting each step has overhead the compiled code wouldn't pay.
- More flexible — code can be evaluated at runtime, which suits dynamic and interactive languages and REPLs.

In practice the line is blurry. Many "interpreted" languages compile to bytecode and then JIT it (see [JIT compilation](/t/jit-compilation)), and many "compiled" languages have an interpreter for development. The real question is usually *when* the translation happens, not whether.

The classic mistakes:

- Assuming interpreted means slow, always. With JIT and bytecode, well-optimised interpreted languages can be fast; and for I/O-bound work the interpreter overhead is minor.
- Forgetting startup cost. For a long-running server, a fast language's compile step is paid once; for a series of short scripts, an interpreter avoids repeated setup.
- Confusing interpretation with dynamic typing. A language can be interpreted and statically typed, or compiled and dynamically typed. The two axes are independent.
- Ignoring the performance cliff. Interpreted code executing a hot loop is where the difference bites; that's exactly where JIT kicks in, or where you rewrite the hot part.
- Reaching for a compiler for a scripting task. The reverse mistake: a one-off script doesn't need a build.

The interpreter is the model behind shells, scripting languages and REPLs, and the reason "just run it" is possible. It's the counterpart to the [compiler](/t/compiler), and modern runtimes often blend both — interpreter, then JIT — to get fast startup and fast steady state.
