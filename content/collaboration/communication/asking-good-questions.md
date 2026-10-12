---
title: "Asking Good Questions"
summary: "Sharing what you tried, what you expected and what happened."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["how to ask questions", "asking for help well", "good questions", "asking questions"]
prereqs: ["debugging"]
related: ["when-to-ask-for-help", "minimal-reproducible-example", "rubber-duck-debugging", "searching-effectively", "async-communication", "clarifying-tickets"]
core: [backend, frontend, data-engineer, data-analyst]
---

How you ask determines how quickly (and whether) you get a useful answer. A good question respects the other person's time and shows you've made an
effort.

## The shape of a good question

Include:

1. **What you're trying to do** (the goal, not just the error).
2. **What you tried**, and what happened.
3. **What you expected** vs what you got, with the exact error message.
4. **Where you looked** (docs, searches, the code), so they don't repeat it.
5. **Context needed to answer**: versions, relevant code, how to reproduce ([minimal reproducible example](/t/minimal-reproducible-example)).
6. **A specific ask**: "Do you know why X returns null here?" rather than "it doesn't work".

Compare:

> ❌ "The API isn't working, can someone help?"
>
> ✅ "I'm calling `GET /orders?status=paid` from the staging app and getting a 403 since this morning. It worked yesterday.
> My token is valid (decoded: role=reader). I checked the docs and our permission list, but I don't see a change. Request ID `req_8f3a2c`. Has
> anything changed for the reader role?"

The second can be answered in a minute, and often answers itself while you write it ([rubber duck](/t/rubber-duck-debugging)).

## Habits

- **Do your homework first**: read the error ([reading error messages](/t/reading-error-messages)), search
  ([searching effectively](/t/searching-effectively)), look at the docs and the code.
- **Put everything in one message.** Don't send "hi" and wait. Write the whole question so they can answer when free
  ([async communication](/t/async-communication)).
- **Use text, not screenshots, for code and errors**, so people can copy and search it.
- **Ask in the right place.** A team channel lets others learn and answer, and a private message doesn't. Use the channel unless it's sensitive.
- **Close the loop.** Reply with what worked, so the next person finds it, and thank them.
- **Ask early enough** ([when to ask for help](/t/when-to-ask-for-help)), and not the first moment you're stuck.

Asking questions is not a weakness. Good engineers ask constantly, and they ask well.
