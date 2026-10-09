---
title: "AI Coding Assistant"
summary: "Tools like Copilot, Cursor or Claude Code that suggest and write code."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["AI assistant", "Copilot", "Cursor", "Claude Code", "coding assistant"]
prereqs: ["ide"]
related: ["reviewing-ai-code", "ai-learning-pitfalls", "hallucination", "prompting-for-code", "vibe-coding", "coding-agent"]
---

An AI coding assistant is a tool that uses a large language model to help you write code. It can complete the line you're typing, answer questions about a codebase, explain errors, write tests, and, in agent mode, make multi-file changes and run commands.

Forms they take:

- **Inline completion** in the editor, suggesting the next lines.
- **Chat** beside your code, for questions and explanations.
- **Agents** that read files, edit several of them, run tests and iterate on a task ([coding agents](/t/coding-agent)).
- **Command-line assistants** that work in your terminal.

Examples include GitHub Copilot, Cursor and Claude Code. The products change quickly.

## Where they help

- Boilerplate, repetitive edits and scaffolding.
- Explaining unfamiliar code or an error message.
- Drafting tests and documentation.
- Translating between languages or formats.
- A quick first version to react to.
- Working through ideas as a rubber duck that talks back.

## Where to be careful

- **They can be confidently wrong**: invented functions, outdated APIs ([hallucination](/t/hallucination)).
- **They don't know your system** unless you tell them. Context and conventions matter ([agent instructions](/t/agent-instructions-file)).
- **Security and privacy**: don't paste secrets or private data into tools you haven't been approved to use. Check your company's policy.
- **Licensing and ownership** questions may apply to generated code.
- **It's easy to stop understanding** what you ship ([learning while using AI](/t/ai-learning-pitfalls)).

## Using one well

- **Be specific** about what you want, with examples and constraints ([prompting for code](/t/prompting-for-code)).
- **Work in small steps**, and review each one.
- **Read and test everything** it produces, as you would a stranger's pull request ([reviewing AI code](/t/reviewing-ai-code)).
- **Ask it to explain**, then verify against the official docs.
- **Stay the author.** You're responsible for what you commit.
