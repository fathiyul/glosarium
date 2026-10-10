---
title: "Deno and Bun"
summary: "Newer JavaScript runtimes with built-in tooling."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["deno", "bun", "deno and bun"]
prereqs: ["javascript", "commonjs"]
related: ["javascript", "npm-pnpm-yarn", "babel-swc"]
---

**Deno** and **Bun** are modern alternatives to Node.js for running JavaScript/TypeScript outside the browser. Deno emphasises security (explicit **permissions** per program) and web standards (native TypeScript, URL imports, built-in tooling); Bun emphasises speed (fast startup, bundler/test/package-manager in one binary) with broad Node compatibility.

```text
Deno: secure by default (ask for net/fs/env), TS out of the box, web APIs
Bun:  drop-in speed (npm compat), all-in-one toolchain, fast installs
```

Both run the same language with different trade-offs — and both now chase Node compatibility, because the ecosystem (npm, existing servers) is the moat. The practical question is rarely "which runtime is best" but "which constraints matter here": locked-down execution, startup latency, or ecosystem fidelity.

The classic mistakes:

- Choosing by benchmark alone. Startup and throughput crowns change quarterly; ecosystem compatibility, deployment support and team knowledge dominate real outcomes.
- Assuming npm just works. Compatibility is broad but not total — native modules, exotic APIs and tooling hooks differ. Verify your actual dependencies, not the marketing matrix.
- Ignoring permission models. Deno's permissions are a feature only if you configure them; running `--allow-all` discards the advantage. Design the permission set per app.
- Fragmented toolchains. Runtime + package manager + bundler + test runner from four vendors multiplies version skew. All-in-one toolchains trade choice for coherence — decide which you want.
- Production without observability. Newer runtimes have thinner APM/profiling ecosystems. Confirm you can monitor, profile and debug before committing critical paths.
- Rewriting to switch. Migrating a working Node service for runtime fashion is a rewrite in disguise. Switch for a concrete need (startup, sandboxing, tooling), measured.
- Forgetting deployment targets. Edge, serverless and PaaS support specific runtimes; the "best" runtime you can't deploy is no runtime at all.

**How to evaluate:** run your app and its tests on the candidate, measure what matters (cold start, throughput, memory), confirm the deployment story, and weigh ecosystem fit over raw speed. They're maturing fast — re-evaluate periodically, commit deliberately.
