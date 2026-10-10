---
title: "Builder"
summary: "Constructing complex objects step by step."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["builder pattern", "fluent builder"]
prereqs: ["design-pattern"]
related: ["factory-method", "test-data-builder", "gang-of-four", "immutability"]
---

The builder pattern separates the steps of creating a complex object from its final form. Instead of one constructor with many optional parameters, you set the parts one at a time, and call a final method that builds the object. The same steps can produce different results depending on the choices made.

```python
class RequestBuilder:
    def __init__(self, url):
        self._url = url
        self._headers = {}
        self._timeout = 10

    def header(self, name, value):
        self._headers[name] = value
        return self            # returning self allows chaining

    def timeout(self, seconds):
        self._timeout = seconds
        return self

    def build(self):
        return {"url": self._url, "headers": dict(self._headers), "timeout": self._timeout}

request = RequestBuilder("https://example.com/api").header("Accept", "application/json").timeout(5).build()
```

The build step is a clear place to check that the parts fit together, and the result can be made immutable so it can't change afterwards.

The trade-off is verbosity. A builder is extra code, and for an object with three fields, a plain constructor with defaults or keyword arguments is simpler. Builders make the most sense when construction has several optional steps, validation across steps, or when the same steps should produce several variations.

The classic mistake is using a builder for everything, including objects with two required fields. Also, a builder that can be reused after `build` may share state between results, so either reset it or make `build` copy what it holds, as this example does. In Python, keyword arguments often remove the need for a builder entirely. For the test-data version of the idea, see [test data builders](/t/test-data-builder).
