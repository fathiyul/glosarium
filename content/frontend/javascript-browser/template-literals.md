---
title: "Template Literals"
summary: "Backtick strings with interpolation."
levels: { backend: junior, frontend: junior }
aliases: ["template strings", "backtick strings", "string interpolation"]
prereqs: ["javascript", "string"]
related: ["string-interpolation", "javascript", "ecmascript", "html-entities"]
---

Template literals are strings written with backticks that can embed expressions and span multiple lines.

```js
const name = "Ana";
const items = 3;

const msg = `Hello, ${name}! You have ${items} item${items === 1 ? "" : "s"}.`;
// "Hello, Ana! You have 3 items."

const html = `
  <ul>
    <li>${name}</li>
  </ul>
`;
```

Anything inside `${ ... }` is a JavaScript expression: variables, math, function calls, ternaries.

Before them, you wrote `"Hello, " + name + "! You have " + items + "..."`, which is harder to read and easy to get wrong.

## Features

- **Interpolation**: `${expression}`, converted to a string.
- **Multi-line**: real line breaks, with no `\n` needed (the indentation is included in the string).
- **Nesting**: you can put templates inside `${}`.
- **Tagged templates**: a function placed before the backtick receives the pieces and values. Libraries use them for SQL, CSS and GraphQL:

```js
const query = gql`query { user(id: ${id}) { name } }`;
```

## Cautions

- **Never build SQL or HTML from user input this way.** Interpolation doesn't escape anything. It leads to SQL injection and XSS ([SQL injection](/t/sql-injection), [HTML entities](/t/html-entities)). Use parameterized queries and escaping, or tagged helpers that do it for you.
- **Objects print as `[object Object]`.** Use `JSON.stringify` or format fields explicitly.
- **`undefined` and `null` appear as text**, so default them (`${x ?? ""}`).
- **Leading whitespace** in multi-line templates becomes part of the string.
- **Escaping**: use `` \` `` for a literal backtick and `\${` for a literal `${`.
- Languages differ in the syntax: Python has f-strings ([string interpolation](/t/string-interpolation)).
