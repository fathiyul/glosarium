---
title: "String"
summary: "A sequence of characters, usually immutable."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["text", "str", "string literal"]
prereqs: ["data-type"]
related: ["character-encoding", "string-interpolation", "regular-expression", "unicode", "mutable-vs-immutable"]
---

A string is a sequence of characters: text. You write it in quotes.

```python
name = "Ana"
len(name)                    # 3
name.upper()                 # "ANA"
name + " Putri"              # "Ana Putri"   concatenation
name[0]                      # "A"           indexing
name[1:]                     # "na"          slicing
"na" in name                 # True
"a,b,c".split(",")           # ["a", "b", "c"]
" hi ".strip()               # "hi"
```

## Strings are immutable

In Python, JavaScript, Java and many others, you can't change a string in place. Methods return a **new** string:

```python
name.upper()       # returns "ANA"; name is still "Ana"
name = name.upper()
```

Building a long string by repeated `+` in a loop is slow in some languages. Collect pieces in a list and join them: `"".join(parts)`.

## Things that trip people up

- **A string isn't a number.** `"42" + 1` fails or gives `"421"`. Convert first ([type conversion](/t/type-conversion)).
- **Length isn't always what you see.** Emoji and accented characters can be several code points ([Unicode](/t/unicode)), so `len` may surprise you.
- **Encoding** matters when text becomes bytes ([character encoding](/t/character-encoding)).
- **Quotes inside strings** need escaping (`"say \"hi\""`) or different quote types.
- **Comparison** is case-sensitive, and sort order follows character codes unless you ask for locale rules.
- **Never build SQL or HTML by concatenating user input.** That's how injection happens ([SQL injection](/t/sql-injection)).

To insert values into text, use [interpolation](/t/string-interpolation) rather than `+`.
