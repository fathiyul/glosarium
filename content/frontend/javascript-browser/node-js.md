---
title: "Node.js"
summary: "A JavaScript runtime for servers and tooling."
levels: { backend: junior, frontend: junior }
aliases: ["Node", "Node.js", "nodejs", "server-side JavaScript"]
prereqs: ["javascript"]
related: ["javascript", "npm-pnpm-yarn", "deno-bun", "js-modules", "event-loop", "commonjs"]
---

Node.js is a runtime that lets JavaScript run outside the browser: on servers, in command-line tools and in build scripts. It uses Chrome's V8 engine, plus APIs for files, networking and processes that browsers don't offer.

```js
import { readFile } from "node:fs/promises";
import http from "node:http";

http.createServer(async (req, res) => {
  const page = await readFile("index.html", "utf8");
  res.setHeader("Content-Type", "text/html");
  res.end(page);
}).listen(3000);
```

```sh
node server.js
node --version
```

## What it's used for

- **Web servers and APIs** (with Express, Fastify, NestJS and others).
- **Tooling**: bundlers, test runners, linters. Most frontend build tools run on Node.
- **Scripts and CLIs.**
- **Server-side rendering** for frameworks like Next.js.

## How it works

Node is single-threaded for your JavaScript, with a non-blocking [event loop](/t/event-loop). I/O (network, disk) is handed off and your code continues, which makes it good at handling many concurrent connections that mostly wait.

## Things to know

- **CPU-heavy work blocks everything.** A long loop stops all requests. Use worker threads or another service.
- **Never block with synchronous calls** (`readFileSync`) inside a request handler.
- **Packages come from npm** ([npm](/t/npm-pnpm-yarn)). Many dependencies means supply-chain risk, so lock versions and audit.
- **Two module systems**: [CommonJS](/t/commonjs) (`require`) and ES modules (`import`) ([JS modules](/t/js-modules)).
- **Use an LTS version** in production, and pin it (`.nvmrc`, `engines`).
- **Handle uncaught errors and unhandled promise rejections**, since they can crash the process.
- **Alternatives**: [Deno and Bun](/t/deno-bun) are newer runtimes.

Node's APIs (`fs`, `path`, `process`) don't exist in the browser, and the browser's (`window`, `document`) don't exist in Node.
