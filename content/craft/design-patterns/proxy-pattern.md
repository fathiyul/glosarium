---
title: "Proxy"
summary: "A stand-in that controls access to another object."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["proxy pattern", "surrogate"]
prereqs: ["design-pattern"]
related: ["decorator-pattern", "adapter-pattern", "facade-pattern", "memoization"]
---

The proxy pattern provides a stand-in with the same interface as a real object, and the proxy controls access to it. It might delay creating the real object until it's needed, check permissions before forwarding a call, or cache results. The caller uses the proxy as if it were the real thing.

```python
class ExpensiveReport:
    def __init__(self, name):
        self.name = name
        self._data = self._load()           # slow: reads a large file

    def _load(self):
        return f"contents of {self.name}"

    def text(self):
        return self._data

class CachedReportProxy:
    def __init__(self, name):
        self._name = name
        self._real = None                   # created on first use

    def text(self):
        if self._real is None:
            self._real = ExpensiveReport(self._name)
        return self._real.text()

report = CachedReportProxy("q3.csv")        # cheap: nothing is loaded yet
report.text()                               # loads once, then reuses the object
```

The caller's code is the same for the proxy and the real object, so the access control or delay is invisible to it.

The trade-off is that a proxy adds a layer, and it can hide the cost of an operation. A caller may assume a method is cheap because the proxy makes it look that way, and the first real call then surprises it. A cache in a proxy also has to be kept consistent with the source.

The classic mistake is letting a proxy quietly change behaviour, such as returning stale data without any way to tell. Make the caching or delay visible in the design, and decide how long results stay valid. A proxy that only adds behaviour around calls is closer to a [decorator](/t/decorator-pattern), and one that simplifies a whole subsystem is a [facade](/t/facade-pattern). For the caching side, see [memoization](/t/memoization).
