---
title: "Compiler"
summary: "A program that translates source code into another form."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["compiler", "compilation", "transpiler"]
prereqs: ["lexer", "parser"]
related: ["interpreter", "abstract-syntax-tree", "bytecode", "jit-compilation", "linking"]
---

A **compiler** translates code from one form into another — usually source code into machine code or an intermediate **bytecode**. It doesn't run your program; it produces a new artifact that can be run. Where an [interpreter](/t/interpreter) executes code directly, a compiler does the work up front so the result runs fast.

Most compilers work in phases:

1. Lexing — split the text into tokens.
2. Parsing — build an [abstract syntax tree](/t/abstract-syntax-tree) from the tokens.
3. Semantic analysis / type checking — resolve names, check types, catch errors.
4. Optimisation — transform the tree or IR to run faster or smaller.
5. Code generation — emit machine code, bytecode, or another language.

```text
source → tokens → AST → checked AST → optimised IR → target code
```

The distinction from interpretation has blurred: many languages compile to bytecode and then JIT it ([JIT compilation](/t/jit-compilation)); "transpilers" compile one high-level language to another (TypeScript → JavaScript). The essence is the same: source in, a translated artifact out.

The classic mistakes:

- Confusing compile-time and run-time. A compiler catches errors *before* the program runs (a strength), but can't see data that only exists at runtime. Code that must be flexible at runtime leans on [interpretation](/t/interpreter) or [reflection](/t/reflection) instead.
- Assuming "compiled" means fast, full stop. Optimisation quality, target, and runtime setup matter; a poor compiler or a cold JIT can be slow. Measure.
- Ignoring what the compiler can and can't optimise. It can't optimise through opaque I/O or unknown data. Constant factors and [cache locality](/t/cache-locality) still dominate in real hot paths.
- Treating build errors as annoyances. They're the compiler doing its job — catching type and syntax problems before they reach users.
- Forgetting the build stage exists in "interpreted" languages. Bundlers, transpilers and ahead-of-time steps mean most modern stacks compile something, even if not to machine code.

The compiler is the layer that turns readable code into something the machine can run efficiently, and its error messages are a genuine safety feature of statically typed languages. It connects to [lexing](/t/lexer), [parsing](/t/parser), [linking](/t/linking) and the runtime's [bytecode](/t/bytecode).
