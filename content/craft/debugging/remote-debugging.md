---
title: "Remote Debugging"
summary: "Attaching a debugger to code running somewhere else."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["attach debugger", "remote debugger"]
prereqs: ["debugger"]
related: ["debugger", "container-logs", "heisenbug", "ssh"]
---

Remote debugging means attaching a debugger to a program running on another machine or inside a container, such as a test server, a staging environment or a cloud instance. You get breakpoints and variable inspection without copying the whole environment to your laptop.

Most debuggers that support it work by opening a port the debugger client connects to. The exact commands depend on the language and debugger, so check that tool's documentation for its flags.

The main risk is exposure. A debugger port is effectively a way to run code in the process, so anyone who can reach it can control the program. Never leave one open to the internet. Reach it through an SSH tunnel or a private network, bind it to localhost where possible, and turn it off when you're done.

The trade-off is between convenience and risk. Remote debugging helps with problems that only show up in a real environment, but it pauses the process, which can break live traffic. It can also change timing, just like a local debugger, so bugs such as [heisenbugs](/t/heisenbug) may stop appearing.

The classic mistake is attaching a debugger to a production process that serves customers. A breakpoint stops every request that hits that code path. Prefer a staging environment that mirrors production, use logs and traces for live systems, as in [container logs](/t/container-logs), and only attach to production under a planned, short window with the team aware.
