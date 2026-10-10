---
title: "WebAssembly"
summary: "A portable binary format that runs near-native code in browsers and beyond."
levels: { backend: senior, frontend: senior }
aliases: ["WebAssembly", "wasm", "WASM"]
prereqs: ["instruction-set", "compiler"]
related: ["virtual-machine-runtime", "bytecode", "container"]
---

**WebAssembly** (Wasm) is a **portable binary** format for executable code, designed to run at near-native speed in a sandbox. You compile a program written in C, Rust, Go, or another language *to* WebAssembly, and a runtime executes it on whatever platform you're on. It started in the browser — where it lets languages other than JavaScript run — and has spread to servers, edge platforms and plugins.

Two things make it distinctive:

- It's a compilation target, not a CPU. Like [bytecode](/t/bytecode), it's a portable format an interpreter/JIT runs. Unlike a native binary, one `.wasm` file runs anywhere a Wasm runtime exists — no per-[instruction-set](/t/instruction-set) rebuilds.
- It's sandboxed by design. A Wasm module can only touch what it's explicitly given (memory, imported functions). No filesystem, no network, no host access unless the host provides it — which is why it's attractive for untrusted plugins.

```text
Rust/C/Go source ──▶ compile to .wasm ──▶ runtime (browser / server / edge)
                                          sandboxed, near-native
```

The classic mistakes:

- Expecting it to be as fast as native in all cases. It can be near-native, but boundary crossings (calling in and out of Wasm, copying memory) add cost; micro-modules can be dominated by that overhead.
- Assuming it replaces JavaScript. It complements it — heavy compute, existing native libraries, portability — but DOM and glue are still often JavaScript.
- Treating it as only a browser technology. The same portability makes it useful for server plugins, edge functions and sandboxed extension points.
- Forgetting the sandbox's limits. A Wasm module with no WASI/host imports can't read a file or open a socket by itself; that's a feature for security and a constraint for portability.
- Assuming no rebuild ever. Different runtimes and host capabilities (e.g. threads, WASI) affect what works; "portable" doesn't mean every feature everywhere.

WebAssembly is a portable, sandboxed compilation target — closer to a universal [VM](/t/virtual-machine-runtime) than to a hardware [instruction set](/t/instruction-set). It's a useful tool for running non-JavaScript and existing native code in browsers, and for safe, portable plugins elsewhere. See [bytecode](/t/bytecode) for the general idea it belongs to.
