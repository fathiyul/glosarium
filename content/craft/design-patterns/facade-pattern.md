---
title: "Facade"
summary: "A simple interface over a complex subsystem."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["facade pattern"]
prereqs: ["design-pattern"]
related: ["adapter-pattern", "proxy-pattern", "decorator-pattern", "design-pattern"]
---

A facade is a simple interface placed in front of a complex subsystem. The subsystem might have many classes that must be called in the right order, with the right settings. The facade offers one or two operations that do the common job, and hides the parts that most callers don't need.

```python
class ImageResizer: ...
class ObjectStorage: ...
class ThumbnailIndex: ...
class Notifier: ...

class PhotoUploader:
    """The one entry point most callers use."""
    def __init__(self):
        self.resizer = ImageResizer()
        self.storage = ObjectStorage()
        self.index = ThumbnailIndex()
        self.notifier = Notifier()

    def upload(self, user_id, photo_bytes):
        thumb = self.resizer.make_thumbnail(photo_bytes)
        key = self.storage.put(user_id, photo_bytes, thumb)
        self.index.add(user_id, key)
        self.notifier.photo_ready(user_id)
        return key
```

The caller makes one call, and the ordering of the four steps lives in one place. The subsystem stays available for callers who need more control.

The trade-off is that the facade can become a bottleneck or a dumping ground. Every new feature tempts you to add one more method, and the facade grows into a second large class. Hiding the subsystem also hides its costs, so a caller may not realize that `upload` writes to storage three times.

The classic mistake is putting business rules into the facade instead of in the subsystem, so the rules become hard to reuse elsewhere. Keep the facade thin: it coordinates the steps, and each step owns its own rules. For a facade that matches a different interface rather than simplifying one, see the [adapter pattern](/t/adapter-pattern).
