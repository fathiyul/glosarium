---
title: "Forms"
summary: "Inputs, labels, validation and submission."
levels: { backend: junior, frontend: junior }
aliases: ["HTML forms", "form element", "form inputs", "HTML form"]
prereqs: ["html-element"]
related: ["input-types", "form-validation", "html-attribute", "http-methods", "multipart-form-data", "semantic-html"]
core: [frontend]
---

Forms are how pages collect input. A form groups fields and sends their values when it's submitted.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label>
    <input type="checkbox" name="newsletter"> Send me updates
  </label>

  <button type="submit">Create account</button>
</form>
```

## The essential parts

- **`<form>`** with `action` (where to send) and `method` (`get` or `post`).
- **`<input>`, `<select>`, `<textarea>`** for the fields. There are many
  [input types](/t/input-types) (`email`, `number`, `date`, `file`...), which give mobile keyboards and
  built-in validation.
- **`name` attributes.** **A field without a `name` isn't submitted.** The name is the key the server
  sees (`email=ana%40example.com&newsletter=on`).
- **`<label>`** connected to its input with `for`/`id` (or by wrapping). Labels make the clickable
  area bigger and let screen readers announce the field. Don't use `placeholder` as a label.
- **`<button type="submit">`** sends the form. A button inside a form submits by default, so use
  `type="button"` for others.

## GET vs POST

`GET` puts values in the URL's query string, which suits searches and filters that you can bookmark.
`POST` sends them in the body, and fits anything that changes data or carries private information.

## With JavaScript

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();                       // stop the page reload
  const data = new FormData(form);          // all named fields
  await fetch("/signup", { method: "POST", body: data });
});
```

Files need `enctype="multipart/form-data"` ([multipart](/t/multipart-form-data)).

Add [validation](/t/form-validation) in the browser for convenience, and on the server for safety.
Forms work with the keyboard (Enter submits) as long as you use real form elements.
