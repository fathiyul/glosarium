---
title: "Controlled vs Uncontrolled Inputs"
summary: "Whether the framework or the DOM owns an input's value."
levels: { frontend: junior }
aliases: ["controlled components", "uncontrolled components", "controlled input", "uncontrolled input"]
prereqs: ["component-state", "html-forms"]
related: ["form-state", "form-validation", "refs", "component-state", "hooks"]
core: [frontend]
---

For a form field, someone has to hold its current value: **your framework's state**, or **the browser's DOM**.
That choice is controlled vs uncontrolled.

## Controlled: state is the source of truth

The input's value comes from state, and every change updates it:

```tsx
function NameField() {
  const [name, setName] = useState("");
  return (
    <input value={name} onChange={(e) => setName(e.target.value)} />
  );
}
```

You can react to every keystroke: validate, format, disable a button, mirror the text elsewhere.

## Uncontrolled: the DOM is the source of truth

The browser keeps the value, and you read it when you need it:

```tsx
function SearchForm() {
  const input = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={(e) => { e.preventDefault(); search(input.current!.value); }}>
      <input ref={input} defaultValue="" />
    </form>
  );
}
```

`defaultValue` sets the starting text only. You can also read all the fields at submit time with `new FormData(form)`.

## Choosing

| | Controlled | Uncontrolled |
|---|---|---|
| Live validation, formatting, dependent fields | Easy | Awkward |
| Simple form, read once on submit | More code | Simple |
| Re-renders on each keystroke | Yes | No |
| File inputs | Not possible (they're always uncontrolled) | Yes |

## Common bugs

- **Setting `value` without `onChange`** makes the field read-only, and React warns about it.
- **Switching modes**: starting with `value={undefined}` (uncontrolled) and later passing a string
  (controlled) triggers a warning. Initialize state with `""`, not `undefined`.
- **Mixing both** `value` and `defaultValue` on one input.

For large forms, form libraries manage this for you ([form state](/t/form-state)). The idea
isn't React-only, so look for the same question in other frameworks: who owns the value?
