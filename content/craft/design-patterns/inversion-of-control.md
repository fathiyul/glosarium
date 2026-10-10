---
title: "Inversion of Control"
summary: "A framework calls your code rather than your code calling it."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["IoC", "Hollywood principle"]
prereqs: ["interface"]
related: ["dependency-injection", "dependency-inversion-principle", "observer-pattern", "web-framework"]
---

Inversion of control (IoC) is a design where the control of the program's flow is handed to a framework or a runtime. Instead of your code calling the library, the framework calls your code at the points it chooses. The informal name for this is the Hollywood principle: "don't call us, we'll call you".

```python
# Your code: a handler the framework will call when a request arrives
def handle_request(request):
    return {"status": 200, "body": "hello"}

# The framework owns the loop and decides when to call handle_request
framework.route("/hello", handle_request)
framework.run()
```

Web frameworks, test runners and UI toolkits all work this way. You write the functions and register them, and the framework's event loop or request loop calls them.

Dependency injection is one specific form of IoC. There, the object doesn't create its own collaborators, and something outside it supplies them, as covered in [dependency injection](/t/dependency-injection).

The trade-off is that control moves away from the code you can read top to bottom. Debugging means understanding when the framework calls your code and in what order, and the framework's rules become part of your program. Frameworks also decide on lifecycles and errors, which you then have to fit into.

The classic mistake is treating IoC as a reason to hide everything behind a framework's magic, so nobody can say what runs when. Keep the registration points visible, and learn the framework's lifecycle. The idea is closely tied to the [dependency inversion principle](/t/dependency-inversion-principle), which says the same thing about the direction of dependencies rather than the flow of control.
