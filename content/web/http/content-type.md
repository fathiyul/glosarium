---
title: "Content-Type"
summary: "The header declaring a body's format, like application/json."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["Content-Type header", "MIME type", "media type", "application/json"]
prereqs: ["http-headers"]
related: ["request-response-body", "mime-type", "content-negotiation", "multipart-form-data", "json"]
---

The `Content-Type` header says what format the body of a request or response is in, so the receiver knows how to read it.

```http
Content-Type: application/json
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=----abc123
```

The value is a media type (also called MIME type) such as `type/subtype`, optionally with parameters like `charset`.

## Common values

| Content-Type | Body |
|---|---|
| `application/json` | JSON ([JSON](/t/json)) |
| `application/x-www-form-urlencoded` | classic HTML form fields (`a=1&b=2`) |
| `multipart/form-data` | forms with file uploads ([multipart](/t/multipart-form-data)) |
| `text/plain`, `text/html`, `text/css` | text formats |
| `application/javascript` / `text/javascript` | scripts |
| `image/png`, `image/jpeg`, `image/webp` | images |
| `application/pdf`, `application/octet-stream` | PDFs; unknown binary data |
| `application/problem+json` | structured API errors ([error format](/t/error-response-format)) |

## Why it matters

- **Sending JSON without the header** makes many servers ignore or reject the body:

```js
fetch("/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(order),
});
```

- **The browser decides what to do from it**: render HTML, run a script, download a file. A wrong type can show raw text, or break styles and scripts.
- **Character encoding**: `charset=utf-8` prevents garbled text ([character encoding](/t/character-encoding)).
- **Security**: browsers may "sniff" content. Send the right type, and `X-Content-Type-Options: nosniff` ([security headers](/t/security-headers)).
- **Servers validate uploads against it**, but the client controls the header, so don't trust it alone ([file upload security](/t/file-upload-security)).

## Related

`Accept` states what the client wants back, and the server picks a format ([content negotiation](/t/content-negotiation)). Set `Content-Type` on what you **send**, and read it on what you **receive**.
