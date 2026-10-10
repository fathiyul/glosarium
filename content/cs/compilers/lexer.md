---
title: "Lexer / Tokenizer"
summary: "Splitting source text into tokens."
levels: { backend: senior, frontend: senior }
aliases: ["lexer", "tokenizer", "lexical analysis"]
prereqs: ["parser", "compiler"]
related: ["abstract-syntax-tree", "regular-expression", "interpreter"]
---

A **lexer** (tokenizer) is the first stage of most language processing: it reads raw text and groups characters into **tokens** — the meaningful units a [parser](/t/parser) then arranges. It discards what doesn't matter (whitespace, comments, in most languages) and classifies what does: a number, a name, an operator, a keyword, a string.

```text
source:  "x = 1 + 2"
tokens:  NAME(x)  ASSIGN(=)  NUMBER(1)  PLUS(+)  NUMBER(2)
```

The lexer handles the fiddly, local rules: where a token starts and ends, that `123` is one number, that `"hello world"` is a single string (with quotes, not five tokens and a space), that `// comment` runs to end of line. Many lexers are essentially a set of [regular expressions](/t/regular-expression) matched in order, either hand-written or generated.

Splitting lexing from parsing keeps both simple: the lexer deals with characters, the parser deals with tokens and structure. That separation is why a parser can be written in terms of "an identifier followed by `=`" without worrying about whitespace.

The classic mistakes:

- Confusing lexing with parsing. The lexer produces tokens; it doesn't understand nesting or grammar. `(a + b) * c` is still just tokens to a lexer — structure is the parser's job.
- Trying to do structure in the lexer. Tracking bracket depth or expression shape in the lexer tangles the stages and usually belongs in the parser.
- Forgetting string and comment edge cases. Quotes, escapes, multi-line strings and comments-to-end-of-line are where naive tokenizers break. Handle them explicitly.
- Vague positions. Every token should carry its line/column, or error messages can't point at the problem — a big usability difference.
- Assuming it's always needed. Tiny formats might skip a formal lexer, but any real language benefits from the clean split.

The lexer is the front door of a language toolchain: it feeds the [parser](/t/parser), which feeds the [AST](/t/abstract-syntax-tree), which feeds the [interpreter](/t/interpreter) or [compiler](/t/compiler). It's small, but it's where text first becomes structure — and where the quality of error positions is decided.
