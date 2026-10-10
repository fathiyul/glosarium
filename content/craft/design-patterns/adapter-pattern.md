---
title: "Adapter"
summary: "Wrapping an interface to make it match another."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["wrapper", "adapter pattern"]
prereqs: ["interface"]
related: ["facade-pattern", "program-to-interface", "dependency-inversion-principle", "stub-double"]
---

The adapter pattern wraps an object with an interface that doesn't match what the caller expects, so the two can work together. The adapter translates calls from the caller's interface into calls on the wrapped object, without changing either of them.

```python
class LegacyPrinter:                       # existing code we can't change
    def print_text(self, text):
        return f"LEGACY:{text}"

class PrinterAdapter:                      # what our application expects
    def __init__(self, legacy):
        self.legacy = legacy

    def print_document(self, doc):
        return self.legacy.print_text(doc.upper())

PrinterAdapter(LegacyPrinter()).print_document("hello")   # LEGACY:HELLO
```

Our code depends on `print_document`, and the adapter is the only place that knows about `LegacyPrinter`. Replacing the legacy printer later means writing a new adapter.

The trade-off is an extra layer. Each adapter is a class to write and maintain, and a chain of adapters can make behaviour hard to trace. An adapter also can't add the features the wrapped object lacks, and where the two interfaces differ in meaning rather than only in names, translating them can hide real differences.

The classic mistake is adapting an interface that's already close enough, or adapting everything through a single generic wrapper that loses type information. Use an adapter where a third-party or legacy dependency must fit your design, and keep it thin. Test the adapter against the real dependency or a [stub](/t/stub-double), so you know the translation is right. It's related to the [facade pattern](/t/facade-pattern), which simplifies a complex interface rather than matching one.
