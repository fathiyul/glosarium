---
title: "Linking"
summary: "Combining compiled code and libraries into an executable."
levels: { backend: senior }
aliases: ["linking", "linker", "link step"]
prereqs: ["compiler", "static-vs-dynamic-linking"]
related: ["cross-compilation", "docker-image"]
---

**Linking** is the build step that turns separately compiled pieces into a runnable program. A [compiler](/t/compiler) usually produces object files plus references to functions and variables that live elsewhere — in other object files or in libraries. The **linker** takes all of those, resolves the references, arranges them in memory, and produces an executable (or a shared library).

```text
main.o + util.o + libfoo.a (or libfoo.so) ── linker ──▶ program
                          resolves symbols like printf, my_func
```

Two things the linker does:

- Symbol resolution — match each *reference* (`call my_func`) to a *definition* (where `my_func` actually is). An unresolved reference is the classic "undefined symbol" error.
- Relocation — assign final addresses now (static) or arrange for the dynamic loader to fix them at startup ([dynamic linking](/t/static-vs-dynamic-linking)).

The classic mistakes:

- Reading "undefined reference" as a code bug. It usually means a missing library, wrong link order, or a name mismatch (e.g. C++ name mangling). Read the symbol name carefully.
- Getting link order wrong. For static libraries, the order on the command line matters: libraries are searched in order, so a library must come after the code that uses it.
- Forgetting the difference between compile and link errors. A compile error is about syntax/types in one file; a link error is about missing or duplicate definitions across files. They're different stages with different fixes.
- Assuming a successful compile means a runnable program. Compiling each file can succeed and linking still fail. It's a separate step worth understanding.
- Ignoring the target's libraries with [cross-compilation](/t/cross-compilation). The target may lack or have different versions of the libraries you linked against, so it fails at load time.

Linking is where separate translations become one program, and where many "mysterious" build errors actually live. It connects [compilation](/t/compiler) to the runtime via [static or dynamic linking](/t/static-vs-dynamic-linking), and it's why container builds sometimes fail with missing `.so` files the platform lacked.
