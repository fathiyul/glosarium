---
title: "Vibe Coding"
summary: "Accepting AI code without reading it: fine for prototypes, risky in production."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["vibecoding", "AI-generated prototype coding"]
prereqs: ["ai-coding-assistant", "reviewing-ai-code"]
related: ["ai-coding-assistant", "ai-learning-pitfalls", "reviewing-ai-code", "technical-debt", "mvp"]
---

Vibe coding is building software by describing what you want to an AI and accepting what it produces, with little or no reading of the code. You go by feel: run it, see if it looks right, ask for changes, repeat. The term was coined by Andrej Karpathy in early 2025.

It's real and sometimes useful: people with no programming background build working tools, and experienced developers throw together prototypes in an afternoon.

## Where it's fine

- **Throwaway prototypes** and demos.
- **Personal scripts and tools** where only you are affected.
- **Exploring an idea** before committing to build it properly ([MVP](/t/mvp)).
- **Learning what's possible**, as long as you follow up by understanding it.

## Where it's risky

- **Anything real users depend on**: bugs, security holes and data loss hide in code nobody read.
- **Security**: injection flaws, exposed secrets, missing authorization checks ([IDOR](/t/idor), [secrets in Git](/t/secrets-in-git)).
- **Maintenance.** When it breaks, or you need to change it, no one understands it. The code is [technical debt](/t/technical-debt) from day one.
- **Hidden quality problems**: duplicated logic, no tests, fragile behavior.
- **Not learning.** If you never read what you ship, you don't grow ([learning while using AI](/t/ai-learning-pitfalls)).
- **Unaccountable code.** You're still responsible for what you deploy.

## If you start that way

When a prototype is going to become a product:

1. **Read it**, properly ([reviewing AI code](/t/reviewing-ai-code)).
2. **Add tests**, and check the edge cases.
3. **Review for security**: inputs, authentication, secrets.
4. **Remove what you don't understand**, or learn it.
5. **Restructure** before building more on top.

Professional use of AI assistants is different: you stay the author, review each change, and keep the standards you'd apply to a teammate's code ([AI coding assistants](/t/ai-coding-assistant)).
