---
title: "Di\u00e1taxis"
summary: "Organizing docs into tutorials, how-to guides, reference and explanation."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["diátaxis", "diataxis", "documentation framework"]
prereqs: ["readme", "writing-clearly"]
related: ["readme", "api-documentation", "docs-as-code"]
---

**Diátaxis** is a framework for organising documentation into four distinct kinds, each serving a different user need:

- Tutorials — learning-oriented: a guided lesson that takes a beginner through a working example. "Follow along and build this."
- How-to guides — task-oriented: steps to accomplish a specific goal, for someone who already knows the basics. "How do I deploy to production?"
- Reference — information-oriented: precise, complete descriptions of the API, options, fields. "What are the parameters of this function?"
- Explanation — understanding-oriented: the why, the background, the trade-offs. "How does this part fit together and why is it designed this way?"

```text
learning      → tutorial       (teach)
goal-directed → how-to         (do)
information   → reference      (look up)
understanding → explanation    (discuss)
```

The core insight is that these four serve different contexts, and mixing them serves none well. A reference page is not the place for a tutorial; a tutorial that stops to explain every option loses the beginner; an explanation padded with step-by-step instructions isn't a how-to.

The classic mistakes:

- One giant document trying to do all four. It becomes a tutorial/explanation/reference mush that nobody can navigate for a specific need. Split by intent.
- A "how-to" that's actually a tutorial. If it starts from zero and teaches concepts, it's a tutorial. If it assumes competence and targets a task, it's a how-to. The difference is whether you're teaching or helping someone do.
- Reference that lectures. Reference should be terse and complete, not narrative. Move the reasoning to explanation.
- No explanation at all. Many projects have tutorials and reference but no "why" — leaving users unable to reason about the system and make decisions.
- Following it as a rigid taxonomy. Diátaxis is a toolkit, not a law; it's about *awareness of the four needs*, not tagging every page.

**When to use it:** whenever you maintain docs people rely on — an open-source project, an internal platform, a library. The immediate win is to look at each page and ask "which of the four is this?", then split it where it's trying to be several things. It pairs with [docs as code](/t/docs-as-code) and a clear [README](/t/readme), and applies to API docs (see [API documentation](/t/api-documentation)) just as much as to prose guides.
