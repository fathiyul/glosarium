---
title: "Domain-Specific Language"
summary: "A small language built for one problem, like SQL or regex."
levels: { backend: senior, frontend: senior }
aliases: ["domain-specific language", "DSL", "internal DSL"]
prereqs: ["parser", "compiler"]
related: ["regular-expression", "interpreter", "yaml", "json"]
---

A **domain-specific language (DSL)** is a small language designed for one problem area rather than general programming. SQL for queries, regular expressions for text patterns, YAML for configuration, a query builder for a reporting tool — each is **narrow** by design, which makes expressing that domain's ideas concise and hard to get subtly wrong.

There are two broad kinds:

- External DSLs — have their own syntax and a dedicated [parser](/t/parser)/[interpreter](/t/interpreter). SQL and regex are external: you write them as text, and a tool understands them.
- Internal (embedded) DSLs — expressed in the host language, using its syntax cleverly (method chaining, operator overloading). A query builder like `users.where(active: true).order(:name)` is an internal DSL.

```text
external: SELECT name FROM users WHERE active = true;   # its own grammar
internal: users.where(active: true).order(:name)        # host language syntax
```

The pay-off is expressiveness for the target domain and safety for the user: a configuration DSL can validate what a hand-written parser wouldn't, and a query DSL can prevent injection. The cost is building and maintaining a language.

The classic mistakes:

- Building a DSL when a library would do. DSLs are expensive — grammar, parser, error messages, tooling. If a well-designed API gets you 90% there, prefer it.
- Making it too general. A DSL that grows into a general-purpose language has all the costs and fewer of the benefits; you've built a worse programming language.
- Ignoring error messages. The whole value of a dedicated syntax is guidance; a DSL that reports "invalid" without location or context is worse than the library it replaced.
- Overusing internal DSL magic. Clever method-missing or operator tricks can make an internal DSL unreadable and impossible to debug. Clarity first.
- Forgetting security. A DSL that evaluates user input (a query language, a template language) needs careful sandboxing; that's how injection bugs creep in.

Good DSLs — SQL, regex, CSS, configuration formats — earn their keep because the domain is narrow and repeated. When you build one, treat it as a real language: grammar, parser, good errors, and tests (see [parsing](/t/parser) and [compilers](/t/compiler)). It sits between a simple config [format](/t/yaml) and a full language, and is often implemented over an internal [AST](/t/abstract-syntax-tree).
