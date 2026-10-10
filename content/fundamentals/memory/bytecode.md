---
title: "Bytecode"
summary: "An intermediate instruction format run by a virtual machine."
levels: { backend: mid-level, frontend: senior }
aliases: ["byte code", "intermediate representation"]
prereqs: ["compiler"]
related: ["virtual-machine-runtime", "garbage-collection", "stack-vs-heap"]
---

Bytecode is a compact set of instructions, between source code and machine code, that a virtual machine runs. A compiler or the language's own tooling turns source into bytecode once, and the runtime executes those instructions. Python, Java and many other languages do this.

Python's `dis` module shows the bytecode for a function:

```python
import dis

def add(a, b):
    return a + b

dis.dis(add)
```

The output is a list of instructions, roughly like this (the exact names vary between Python versions):

```
  LOAD_FAST  a
  LOAD_FAST  b
  BINARY_OP  +
  RETURN_VALUE
```

Each instruction is simple, and the virtual machine runs them one after another, usually using a stack for intermediate values.

The trade-off is portability against speed. The same bytecode runs on any machine that has the virtual machine, which is why Java programs run on different operating systems. Interpreting bytecode has overhead, though, and some runtimes add a just-in-time compiler that turns hot bytecode into machine code.

The classic mistake is relying on bytecode details in production code. The instruction set changes between language versions, so code that inspects or patches bytecode can break on the next upgrade. If you need that kind of speed or access, look for a documented API, or use a profiler to find the real bottleneck first. [The runtime](/t/virtual-machine-runtime) is what executes the bytecode, and the [garbage collector](/t/garbage-collection) manages the memory it uses.
