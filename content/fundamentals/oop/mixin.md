---
title: "Mixin / Trait"
summary: "Reusable behavior added to classes without inheritance."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["mixin", "trait"]
prereqs: ["inheritance"]
related: ["interface", "abstract-class", "composition-over-inheritance"]
---

A mixin is a small class that provides methods meant to be combined into other classes, rather than being a base class on its own. Traits, in languages such as Rust and Scala, serve a similar role. Either way, the goal is to share one behaviour across unrelated classes without building a single family tree.

```python
import json

class JsonMixin:
    def to_json(self):
        return json.dumps(self.__dict__)

class User(JsonMixin):
    def __init__(self, name):
        self.name = name

User("Ada").to_json()   # '{"name": "Ada"}'
```

`User` gains `to_json` without being a kind of `JsonMixin` in any deeper sense. Other classes can add the same mixin, and it stays in one place.

The trade-offs appear when several mixins combine. Each one can add methods and attributes, and when two define the same name, the winner depends on the method resolution order, which can be hard to predict. A mixin that reads attributes it doesn't define also couples itself to the classes it's mixed into. Debugging gets harder because a method's source isn't obvious from the class's own code.

The classic mistake is putting state, such as counters or caches, into a mixin, then mixing it into classes that don't expect it. Keep mixins stateless and narrow. When the behaviour is a plain helper that doesn't need to touch the class, a [composition](/t/composition-over-inheritance) approach, passing an object in, is usually easier to follow. For a stricter contract, consider an [interface](/t/interface).
