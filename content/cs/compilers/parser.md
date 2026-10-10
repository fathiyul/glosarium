---
title: "Parser"
summary: "Turning text into a structured representation."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["parser", "parsing", "syntax analysis"]
prereqs: ["lexer", "abstract-syntax-tree"]
related: ["compiler", "interpreter", "regular-expression", "dsl"]
---

A **parser** turns a flat sequence of tokens into a structured representation — almost always an [abstract syntax tree](/t/abstract-syntax-tree) — that reflects the **grammar** of the language. Where the [lexer](/t/lexer) groups characters into tokens (`if`, `x`, `(`, `1`), the parser figures out how they nest and relate: which tokens form an expression, what's inside the parentheses, where the `if` body ends.

```text
tokens:  if ( x > 0 ) { y }     →    AST: If(condition: x>0, then: y)
```

Parsing is the step that gives text *meaning as structure*. A grammar (often written in a formal notation) defines the legal shapes; the parser accepts those and rejects the rest with an error. Common techniques include recursive descent (hand-written and readable) and parser generators (grammar in, parser out).

The classic mistakes:

- Reaching for regexes to parse nested or quoted structures. Regex can't track nesting or handle strings/comments reliably. For anything with structure, use a real parser. Regex is fine for *lexing* simple tokens, not for parsing.
- Giving vague errors. A parser that just says "syntax error" wastes the user's time. Good parsers point at the exact position and what was expected — a huge usability factor for languages and config formats.
- Confusing lexing and parsing. They're separate stages: lexer makes tokens, parser builds structure. Merging them is possible but usually muddles the code.
- Ignoring error recovery. A parser that stops at the first error is annoying in editors; good tools recover enough to report several problems at once.
- Assuming a parser must be hand-written or generated. Both are valid; hand-written gives better errors, generators give speed of development. Choose based on the language's complexity.

The parser is the first stage that truly *understands* a language's shape, feeding the [AST](/t/abstract-syntax-tree) to compilers, interpreters and tools. It's how compilers, config loaders, query engines and even some validators make sense of text — and a common place to build a small [domain-specific language](/t/dsl).
