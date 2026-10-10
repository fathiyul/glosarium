---
title: "Cross-Compilation"
summary: "Building for a platform different from the one you're on."
levels: { backend: senior }
aliases: ["cross-compilation", "cross compile", "target toolchain"]
prereqs: ["compiler", "instruction-set"]
related: ["linking", "static-vs-dynamic-linking", "docker-image"]
---

**Cross-compilation** means building a program for a platform *different from the one doing the build* — compiling on your laptop for a device, a server, or a different CPU architecture. The build machine is the **host**; the platform the output runs on is the **target**. A toolchain set up to do this is a cross-compiler.

The need comes from the [instruction set](/t/instruction-set) and OS being baked into a compiled binary: an x86 build won't run on ARM, a Linux build won't run on Windows. Common triggers:

- shipping a binary to a different architecture (amd64 vs arm64 — the reason [container images](/t/image-tags) are often multi-arch);
- targeting embedded devices and other OSes from a developer machine;
- building in CI on a standard runner for a different target.

```text
host (builder)          target (where it runs)
x86_64 Linux     ──▶    arm64 Linux, x86_64 Windows, embedded MCU, ...
```

The complications are less about the compiler and more about the *environment*: you need the target's headers, libraries and a [linking](/t/linking) setup for that platform, and the code must not assume it's running where it's built (paths, endianness, OS APIs).

The classic mistakes:

- Assuming the build environment matches the target. Different headers, libc versions and OS APIs cause link or runtime failures. Use a proper target toolchain, not just a `--target` flag.
- Hardcoding host assumptions. Paths, endianness, word size and OS-specific calls can differ on the target. Test on the real target.
- Forgetting the target's runtime dependencies. If you link dynamically ([static vs dynamic linking](/t/static-vs-dynamic-linking)), the target needs those libraries; missing them gives "not found" at startup.
- Not testing on the target. A successful cross-build is not proof it runs. Emulation catches some issues, real hardware catches the rest.
- Reinventing it in CI. Cross-compilation is fiddly; use established toolchains or multi-arch build tooling rather than assembling it by hand.

Cross-compilation is the practical consequence of binaries being platform-specific. It's routine for compilers, embedded work and multi-architecture [container images](/t/docker-image), and understanding it explains why "it built fine" doesn't guarantee "it runs there".
