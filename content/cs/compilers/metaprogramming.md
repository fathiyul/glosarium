---
title: "Metaprogramming"
summary: "Code that writes or modifies code."
levels: { backend: senior, frontend: senior }
aliases: ["metaprogramming", "code that writes code", "compile-time codegen"]
prereqs: ["macro", "reflection"]
related: ["decorator-syntax", "abstract-syntax-tree", "dsl"]
---

**Metaprogramming** is writing programs that treat code as data — generating, inspecting or modifying code rather than just executing it. It spans a spectrum from compile-time (code generated during the build) to runtime (code inspected and invoked dynamically). Its promise is removing repetition and expressing things the base language can't; its risk is code that's hard to read, trace and debug.

Forms it takes:

- **Compile-time code generation** — [macros](/t/macro), templates, and generators that expand into code before compilation.
- Runtime introspection — [reflection](/t/reflection): inspecting types, fields and methods, and calling them by name.
- Annotations and [decorators](/t/decorator-syntax) — attaching metadata or wrapping behaviour that a framework reads.
- Codegen tools — generating source from a schema (API clients, ORM models, protocol code) — see [code generation tools](/t/code-generation-tools).
- AST manipulation — tools that read and rewrite source trees for linters, formatters and codemods.

```text
generate:  schema → generated client code     (compile-time)
inspect:   obj.getClass().getMethods()        (runtime)
transform: AST → transformed AST              (tooling)
```

The classic mistakes:

- Metaprogramming as a default. Reaching for reflection or macros when ordinary code would do adds indirection and hidden control flow. Use it where it removes real, repeated pain.
- Unreadable "magic". Code that only works because of invisible wrapping or name-based lookup is hard for newcomers and impossible for tools. Prefer explicit where it matters.
- Losing build-time safety. Runtime reflection turns compile errors into runtime crashes. Keep reflection at the edges.
- Debugging generated code. Stepping through macro-expanded or generated code is painful; understand the expansion when something breaks.
- Version drift in codegen. Generated code checked in and never regenerated drifts from its schema. Automate regeneration in the build.

Metaprogramming is powerful precisely because it lets you say more with less — serialization that just works, boilerplate that vanishes, code generated from a single source of truth. It's best kept deliberate and at the boundaries: generate the repetitive parts, reflect for infrastructure, and keep the core plain and explicit.
