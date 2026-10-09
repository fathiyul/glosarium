---
title: "Separation of Concerns"
summary: "Each part of the program handles one distinct concern."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["SoC", "separate concerns"]
prereqs: ["function", "class"]
related: ["single-responsibility-principle", "cohesion", "coupling", "layered-architecture", "mvc"]
---

Separation of concerns means each part of a program handles one distinct concern, and doesn't mix in unrelated ones. A "concern" is a kind of job: displaying data, validating input, talking to a database, applying business rules.

```python
# Mixed: one function does everything
def signup(request):
    email = request.form["email"]
    if "@" not in email: return "bad email"                      # validation
    db.execute("INSERT INTO users ...", email)                   # persistence
    smtp.send(email, "Welcome!")                                 # messaging
    return "<h1>Thanks!</h1>"                                    # presentation

# Separated
def signup(request):
    data = parse_signup(request)          # input handling
    user = users.register(data)           # business rules + persistence
    mailer.send_welcome(user)             # messaging
    return render_thanks(user)            # presentation
```

## Why it matters

- **Change one thing at a time.** Switch the database, restyle the page or replace the email provider without touching the rest.
- **Easier testing**: test business rules without a web server or a database.
- **Understandable pieces**: each file or module has a clear purpose.
- **Reuse**: the same business logic can serve a web page, an API and a command-line tool.
- **Parallel work**: different people work on different concerns.

## Where you see it

- **Layers**: presentation, business logic, data access ([layered architecture](/t/layered-architecture)).
- **MVC**: model, view, controller ([MVC](/t/mvc)).
- **Web basics**: HTML for structure, CSS for style, JavaScript for behavior.
- **Services**: auth, payments and notifications as separate components.

## Cautions

- **Don't over-split.** A hundred tiny layers that just forward calls hurt readability.
- **Draw lines at real differences** in why code changes, not by arbitrary technical categories ([single responsibility](/t/single-responsibility-principle), [cohesion](/t/cohesion)).
- **Keep dependencies pointing one way**, such as business logic not depending on the web framework ([coupling](/t/coupling)).
