---
title: "Reading an Unfamiliar Codebase"
summary: "Starting from entry points, tests and data flow."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["reading unfamiliar code", "understanding a codebase", "code exploration", "navigating a codebase", "onboarding to a codebase"]
prereqs: ["git-clone"]
related: ["understand-before-changing", "onboarding-yourself", "first-weeks", "go-to-definition", "grep-ripgrep", "reading-source-code"]
core: [backend, frontend, data-engineer]
---

Most of an engineer's job is **reading code someone else wrote**. A big unfamiliar codebase is overwhelming if you try to understand it all. Don't. Learn to find
the part you need, and understand just enough around it.

## Start from a question

Don't "read the repo". Pick something concrete: *"What happens when a user clicks Pay?"* or *"Where is the discount calculated?"* Then follow it.

## Where to begin

1. **README and docs.** How to run it, the main parts, how to test.
2. **Run it.** Use the app, and watch what it does. Run the tests ([dev environment setup](/t/dev-environment-setup)).
3. **Find the entry points.** For a web app, the routes ([routing](/t/backend-routing)). For a UI, the page or component for the screen. For a job, its main function.
4. **Follow the data flow.** Request comes in → handler → service → database → response. Trace one request all the way.
5. **Read the tests.** They show how the code is *used* and what it's supposed to do, often more clearly than the code.
6. **Look at the data model**: tables, types and schemas explain a lot about what the system is about.
7. **Check the history**: `git log` and `git blame` on the files you care about show why things changed ([Git log](/t/git-log)).

## Tools

- **Go to definition and find references** in your editor ([go to definition](/t/go-to-definition)).
- **Search** the codebase for a string from the UI, an error message, or a route path ([grep and ripgrep](/t/grep-ripgrep)).
- **A [debugger](/t/debugger)** or breakpoints to watch real execution.
- **Logging** or tracing in a test run.

## Habits

- **Keep notes or a small diagram** of what you learn: names of main pieces and how they connect.
- **Skim first, then dive.** Get the shape before the details.
- **Ignore what you don't need yet.** You don't have to understand the whole thing to fix one bug.
- **Don't judge too fast.** Code that looks strange often exists for a reason ([understand before changing](/t/understand-before-changing)).
- **Ask** a teammate for a 15-minute tour. It's a huge shortcut.
- **Improve it as you go**: fix outdated docs, add a comment where you were confused.
