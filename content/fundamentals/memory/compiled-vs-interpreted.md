---
title: "Compiled vs Interpreted"
summary: "Translating to machine code ahead of time vs executing source at runtime."
levels: { backend: junior, frontend: junior }
aliases: ["compiled language", "interpreted language", "JIT", "bytecode"]
prereqs: ["function"]
related: ["static-vs-dynamic-typing", "javascript-engine", "build-tool", "stack-overflow"]
---

Programs written in a high-level language have to end up as instructions the CPU can run. There are two broad ways to get there.

- **Compiled**: a compiler translates the whole program into machine code **ahead of time**. You run the resulting executable. C, C++, Go, Rust.
- **Interpreted**: an interpreter reads and executes the source (or an intermediate form) **while the program runs**. Older Python, Ruby, shell scripts.

```
Compiled:     source ──compile──► machine code ──► run (fast, no source needed at runtime)
Interpreted:  source ──────────► interpreter reads and runs it, line by line
```

## Trade-offs

| | Compiled ahead of time | Interpreted |
|---|---|---|
| Speed at runtime | usually fastest | usually slower |
| Startup | fast | slower (needs the interpreter) |
| Development loop | a compile step | run directly, quick experiments |
| Errors | many caught at compile time | found when that line runs |
| Portability | one binary per platform | the same source runs wherever the interpreter does |

## It's blurrier than the labels suggest

- **Bytecode**: Java and C# compile to bytecode, which a virtual machine runs. Python compiles source to bytecode too, then interprets that.
- **JIT (just-in-time) compilation**: JavaScript engines, the JVM and others watch which code runs often and compile it to machine code on the fly.
- **Transpiling**: TypeScript and others compile to JavaScript.

So "Python is interpreted" and "Java is compiled" are simplifications. Whether a language is compiled or interpreted is a property of its implementation, not the language itself.

## Why you'd care

- **Deployment**: a compiled binary can be shipped alone, while an interpreted app needs the runtime and its dependencies installed.
- **Performance tuning**: knowing a language is JIT-compiled explains warm-up times and why benchmarks need repeated runs.
- **Error timing**: compile errors stop you early, while runtime errors may reach users.
- It's separate from static vs dynamic typing ([static vs dynamic](/t/static-vs-dynamic-typing)).
