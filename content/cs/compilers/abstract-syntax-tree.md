---
title: "Abstract Syntax Tree (AST)"
summary: "A tree of code's structure that linters, formatters and compilers work on."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["abstract syntax tree", "AST", "syntax tree"]
prereqs: ["parser", "lexer"]
related: ["compiler", "interpreter", "static-analysis", "reflection"]
---

An **abstract syntax tree (AST)** is a tree that represents the structure of code. Where the raw source is a stream of characters, the AST captures *what the code means structurally*: an `if` node with a condition and two branches, a function-call node with arguments, a binary expression with a left and right operand. The "abstract" part means it drops surface details like parentheses and whitespace, keeping only the meaningful structure.

```text
source:  1 + 2 * 3

AST:       (+)
          /   \
         1    (*)
              / \
             2   3
```

Most tools that understand code operate on an AST, not on text: a linter walks it looking for patterns, a formatter reprints it, a type-checker annotates it, a compiler lowers it into machine code, an interpreter evaluates it. Even editors use it for syntax highlighting, autocomplete and refactoring.

The classic mistakes:

- **Working with text when you need structure.** Regex-based "parsing" of code breaks on strings, nesting and comments. If you need to reason about code reliably, build or obtain an AST.
- Confusing the AST with the parse tree. A parse tree mirrors the grammar exactly (including noise); the AST is the cleaned-up, semantic version. Tools almost always want the AST.
- Forgetting each language's AST differs. They're language-specific; cross-language tooling needs per-language parsers (the reason some linters are slow to support a new language).
- Mutating an AST carelessly. Transforming an AST is powerful code generation, but losing positions/trivia makes error messages and formatting worse. Preserve what you need.
- Assuming it's only for compilers. It's the backbone of formatting, linting, codemods and IDE features too.

The AST is the bridge between [parsing](/t/parser) and everything downstream. It enables [static analysis](/t/static-analysis) without running code, lets [compilers](/t/compiler) and [interpreters](/t/interpreter) work on a clean structure, and, when code can inspect it, edges into [reflection](/t/reflection) and [metaprogramming](/t/metaprogramming).
