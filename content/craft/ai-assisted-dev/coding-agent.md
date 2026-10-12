---
title: "Coding Agent"
summary: "An AI that plans, edits across files and runs commands on its own."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["AI coding agent", "agentic coding"]
prereqs: ["context-window"]
related: ["context-window", "agent-instructions-file", "mcp", "ai-code-review"]
---

A coding agent is an AI system that works on a codebase with some autonomy. Given a goal, it reads files, makes a plan, edits several files, runs commands such as tests or the compiler, reads the results, and continues. This is different from a chat that only suggests code for you to paste in.

The loop is the core of the idea:

```
goal -> read code -> plan -> edit files -> run tests -> read the failures -> edit again
```

Because the agent can act, the quality of what it does depends on what it can see and what it's allowed to do. Access to the repository, the shell and external services should be limited to what the task needs.

The trade-off is between speed and oversight. An agent can make a broad change quickly, and that change may touch more than intended or make a plausible but wrong choice. Its output is a proposal that needs the same review as any other code, and it can't be trusted to know the business rules behind the code.

The classic mistake is giving a broad goal and accepting the result without reading it. Ask for small, reviewable steps, have it run the tests, and read the diff before committing. Keep permissions narrow, and for changes that touch data or production systems, confirm before the agent runs. A separate [AI code review](/t/ai-code-review) pass is a useful extra check, not a substitute for a human reading the change.
