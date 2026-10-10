---
title: "Command"
summary: "Turning a request into an object you can queue, log or undo."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["command pattern", "command object"]
prereqs: ["design-pattern"]
related: ["chain-of-responsibility", "strategy-pattern", "pub-sub-pattern", "command-query-separation"]
---

The command pattern turns a request into an object. The object records everything needed to carry out an action, so it can be stored, queued, logged, retried or undone later. The caller asks the command to run, and doesn't need to know the details.

```python
class AddText:
    def __init__(self, doc, text):
        self.doc, self.text = doc, text

    def execute(self):
        self.doc.append(self.text)

    def undo(self):
        self.doc.pop()

doc = []
history = []

def run(command):
    command.execute()
    history.append(command)

run(AddText(doc, "hello"))
run(AddText(doc, "world"))
history.pop().undo()     # undo the last command
print(doc)               # ['hello']
```

The editor keeps a history of commands, and undo is just running the last command's `undo`. The same objects could be sent to a queue for background work, or written to a log for auditing.

The trade-off is extra classes. Every action becomes a type, which is verbose for simple cases. Undo is only as good as the command's `undo`, and some actions, such as sending an email, can't be reversed at all.

The classic mistake is building a command class for every small method call, when a plain function would do. The pattern earns its place when you need the request as data: to queue it, retry it, or undo it. When undo isn't possible, say so in the design rather than leaving a method that quietly does nothing. The idea of separating changes from reads appears in [command-query separation](/t/command-query-separation).
