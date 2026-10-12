---
title: "Chesterton's Fence"
summary: "Don't remove something until you know why it was put there."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Chesterton's fence", "Chesterton fence"]
prereqs: ["broken-windows"]
related: ["broken-windows", "legacy-code", "characterization-test", "git-blame"]
---

Chesterton's fence is the principle that you should not remove a fence until you understand why it was put up. It comes from G. K. Chesterton's writing, and in software it means that code which looks pointless may be protecting against a problem nobody remembers.

```python
def send_report(report):
    time.sleep(2)            # looks pointless, but...
    mailer.send(report)
```

The sleep looks like a leftover. Before removing it, check the history and ask. It might be there because the mail provider rejects requests that arrive too quickly, and the bug would come back in production the day it was deleted.

The trade-off is between caution and progress. Insisting on full understanding before any change makes legacy code impossible to improve. Deleting everything you don't recognize breaks things nobody intended to protect. The middle path is to find out what you can, cheaply: the commit that added it, the linked issue, a test that depends on it.

The classic mistake is treating "I don't know why this is here" as "it isn't needed". Use [git blame](/t/git-blame) and the code's history to find the reason, and if it's still unclear, [characterization tests](/t/characterization-test) can record the current behaviour before you change it. The idea pairs with the advice to [repair broken windows](/t/broken-windows) carefully rather than hastily.
