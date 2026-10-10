---
title: "Language Runtime / VM"
summary: "The environment that executes your code: JVM, V8, CPython, CLR."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["runtime", "virtual machine", "VM"]
prereqs: ["bytecode"]
related: ["bytecode", "garbage-collection", "stack-vs-heap", "memory-leak"]
---

A language runtime is the environment that actually executes your program. It loads the code, runs it, manages memory, and provides the standard library. Examples include the JVM for Java, V8 for JavaScript in Chrome and Node.js, CPython for Python, and the CLR for .NET languages.

Runtimes differ in how they run code. CPython interprets [bytecode](/t/bytecode). The JVM also starts from bytecode but can compile hot code to machine code while the program runs. V8 compiles JavaScript with just-in-time techniques. Each choice trades startup time, peak speed and memory use differently.

```
source -> compiler -> bytecode (or machine code) -> runtime executes it
                                                    |- memory management
                                                    |- threads, I/O, libraries
```

The trade-off is convenience against control. A runtime handles memory and portability for you, but it adds startup time, memory overhead and behaviour you don't control directly, such as when [garbage collection](/t/garbage-collection) runs.

The classic mistake is assuming code behaves the same on every runtime. Alternative implementations of the same language, such as PyPy for Python, can differ in speed, memory use and the behaviour of some edge cases. Test on the runtime you deploy, and read the performance notes for it rather than the language's general advice alone.
