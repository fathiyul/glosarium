---
title: "Agent Instruction Files"
summary: "Repository files like CLAUDE.md or AGENTS.md that tell AI agents the project's conventions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["AGENTS.md", "project instructions file", "agent rules file"]
prereqs: ["coding-agent"]
related: ["coding-agent", "context-window", "mcp", "api-documentation"]
---

An agent instruction file is a document in a repository that tells AI coding agents how the project works: its layout, commands for building and testing, conventions for code and commits, and the things never to change. Several tools read a file of this kind, with names such as `CLAUDE.md` or `AGENTS.md`, and the idea is the same across them.

A short, useful file covers what an agent can't infer from the code alone:

```markdown
# Project notes for agents
- Run tests with `make test` before proposing a change.
- Migrations live in db/migrations; never edit an applied one.
- Use snake_case for database columns and camelCase in the JSON API.
- Do not commit secrets or .env files.
```

Such a file is typically loaded into the agent's context, so it takes up part of the [context window](/t/context-window). Every line has a cost, so keep it to rules the agent would otherwise get wrong.

The trade-off is maintenance. Instructions that describe a process that no longer exists mislead the agent as much as missing instructions would. Also, instructions are guidance, not enforcement. An agent can still ignore them, so critical rules belong in tests, hooks or [CI](/t/ci-pipeline) as well.

The classic mistake is writing a long, general document about good engineering practice that the agent can't act on. Describe this project's specifics: commands, paths, and decisions that are easy to get wrong. Review the file when the project changes, the same way you would review [API documentation](/t/api-documentation).
