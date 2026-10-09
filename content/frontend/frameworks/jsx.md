---
title: "JSX"
summary: "HTML-like syntax inside JavaScript."
levels: { frontend: junior }
aliases: ["JSX syntax", "TSX", "React JSX"]
prereqs: ["javascript", "html-element"]
related: ["component", "hooks", "transpiler", "html-entities", "template-literals"]
---

JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It's used in React and some other frameworks. It's not valid JavaScript by itself, so a build step converts it to function calls ([transpiler](/t/transpiler)).

```jsx
function Greeting({ name, items }) {
  return (
    <section className="card">
      <h1>Hello, {name}!</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </section>
  );
}
```

Under the hood, `<h1>Hello</h1>` becomes something like `jsx("h1", { children: "Hello" })`, which creates a description of the element.

## The rules that differ from HTML

- **One root**: return a single parent element (or a fragment `<>...</>`).
- **Close every tag**: `<img />`, `<input />`.
- **`className`** instead of `class`, `htmlFor` instead of `for`.
- **camelCase attributes and events**: `onClick`, `tabIndex`.
- **Braces `{}` embed JavaScript expressions**: variables, function calls, ternaries. Statements (`if`, `for`) don't fit there.
- **`style` takes an object**: `style={{ color: "red" }}`.
- **Components start with a capital letter** (`<Greeting />`), while lowercase means an HTML element.

## Common patterns

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}          // conditional
{error && <p role="alert">{error}</p>}            // show if truthy (beware {0 && ...} printing 0)
{list.map((x) => <Row key={x.id} {...x} />)}      // lists need stable keys
```

## Good to know

- **Escaping is automatic.** Values in `{}` are escaped, which protects against XSS. The exception is `dangerouslySetInnerHTML` ([XSS](/t/xss)).
- **`key` should be a stable ID**, not the array index when the list can reorder.
- **Keep markup readable**: extract components rather than deeply nesting.
- **TSX** is JSX in TypeScript files, with typed props.
- Other frameworks (Vue, Svelte, Angular) use templates instead, and Solid and Preact also use JSX.
