---
title: "Language Server Protocol"
summary: "The protocol that gives editors autocomplete and diagnostics for any language."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["LSP", "language server"]
prereqs: ["static-analysis"]
related: ["static-analysis", "reading-source-code", "dev-containers", "type-inference"]
---

The Language Server Protocol (LSP) is a standard between an editor and a language server. The server is a separate process that understands a language, and it answers the editor's questions: what the symbol under the cursor is, where it's defined, what completions fit here, and what errors exist. Because the protocol is shared, one server can serve many editors, and one editor can use many languages.

```
editor  <--LSP messages (JSON-RPC)-->  language server (analyzes the code)
```

Go to definition, find references, rename and inline errors all come from this exchange, without each editor implementing each language.

The trade-off is that the server does real analysis, so it uses memory and CPU, and it can be slow on very large projects. Its results are only as good as its understanding of the project's configuration, so a missing or wrong setting often shows up as false errors.

The classic mistake is blaming the editor when the server is misconfigured. If completions or errors look wrong, check the server's logs and project settings first, such as the Python environment or the language version it uses. The same analysis that powers the editor can run in CI, as covered in [static analysis](/t/static-analysis).
