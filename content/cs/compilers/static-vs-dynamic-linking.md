---
title: "Static vs Dynamic Linking"
summary: "Bundling libraries into the binary vs loading them at runtime."
levels: { backend: senior }
aliases: ["static vs dynamic linking", "static linking", "dynamic linking"]
prereqs: ["linking", "compiler"]
related: ["cross-compilation", "docker-image", "dependency-hell"]
---

When your program uses a library, the linker can either fold it into the executable or leave a reference to load later. That's the choice between **static** and **dynamic** linking.

- Static linking copies the library's code into your binary at build time. The result is self-contained: it carries everything it needs.
- Dynamic linking leaves a reference, and at startup a loader finds the shared library (`.so` on Linux, `.dylib` on macOS, `.dll` on Windows) and connects it.

```text
static:  program + libfoo (all inside)          → one big, self-contained file
dynamic: program ──references──▶ libfoo.so       → smaller, but needs libfoo present
```

The trade-offs cut both ways:

- Static — simpler to ship (no missing-library surprises), no runtime lookup cost, but larger binaries and, crucially, a security patch to a library means *rebuilding every program* that used it.
- Dynamic — smaller binaries, libraries shared in memory across programs, and a patched library fixes everything at once — but the target must have a compatible version, and mismatches cause "not found" or symbol errors.

This is why [container images](/t/docker-image) care: a static binary (`scratch` base) has no library dependencies; a dynamically linked one needs its libraries present in the image. It's also why system updates can fix a library vulnerability everywhere by replacing one `.so`.

The classic mistakes:

- Assuming "compiled" means one file. A dynamically linked binary needs its libraries at runtime; copy it alone and it may fail to start.
- Version skew on the target. Linking against a newer library than the target has causes load failures. Match the build to the deployment environment (see [cross-compilation](/t/cross-compilation)).
- Forgetting to relink after a static-library patch. With static linking, the fix isn't automatic; you must rebuild and redeploy the program.
- Ignoring the "DLL hell" / [dependency hell](/t/dependency-hell) risk. Shared libraries with incompatible versions side by side are a classic source of breakage.
- Choosing by reflex. Static suits self-contained tools and containers; dynamic suits shared system libraries. Pick deliberately.

The choice is a real engineering trade: portability and safety-patch reach versus simplicity and binary size. It shows up most in how you build and ship binaries — and it's a frequent reason containers fail with a missing `.so` that the build machine had.
