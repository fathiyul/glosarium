---
title: "TypeScript"
summary: "JavaScript with static types."
levels: { backend: junior, frontend: junior }
aliases: ["TS", "TypeScript language", "static typing JavaScript"]
prereqs: ["javascript", "var-let-const"]
related: ["javascript", "type-system", "js-modules", "ecmascript", "node-js"]
core: [frontend]
---

**TypeScript** is JavaScript plus **static types**. You write type annotations, and a compiler checks them
*before* the code runs. It then removes the types, leaving ordinary JavaScript.

```ts
type User = { id: number; name: string; email?: string };   // email is optional

function greet(user: User): string {
  return `Hello, ${user.name}`;
}

greet({ id: 1, name: "Ana" });       // fine
greet({ id: "1", name: "Ana" });     // error: Type 'string' is not assignable to type 'number'
greet(null);                         // error: null isn't a User
```

## What you get

- **Typos and wrong shapes caught early**, in your editor, not by a user. For example `user.nmae`
  is an error.
- **Better autocomplete** and safe renaming and refactoring across a big codebase.
- **Types as documentation.** A function signature tells you what to pass and what comes back.
- **Handling of `null` and `undefined`** is made explicit with `strict` mode (see [null](/t/null)).

## Things to know

- **Types are erased.** At runtime it's plain JavaScript. So types **don't validate real data**:
  JSON from an API might not match the type you declared. Check external input at the boundary (for example with a
  schema validator).
- **Avoid `any`.** It switches the checks off for that value. Use `unknown` for data you don't know yet
  and narrow it before use.
- **Turn on `strict`** in `tsconfig.json`. It catches the most.
- **Casting** (`value as User`) overrides the compiler without checking anything. Use it sparingly.
- Structural typing: a value matches a type if it has the right *shape*, regardless of its name.
- Files end in `.ts` / `.tsx`. Tools like Vite, esbuild and the `tsc` compiler turn them into JavaScript.

Everything in JavaScript still applies; TypeScript is a layer on top. It shines as projects and teams
grow. For general ideas, see [type systems](/t/type-system).
