---
title: "Stack Trace"
summary: "The chain of function calls that led to an error."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["traceback", "stack traces", "call stack trace", "backtrace"]
prereqs: ["function", "exception"]
related: ["reading-error-messages", "debugger", "exception", "try-catch", "error-handling"]
core: [backend, frontend]
---

When something crashes, the program prints a **stack trace**: the list of function calls
that were active at that moment, from where the error happened back to where it all started.
It tells you *where* and *how you got there*.

```python
Traceback (most recent call last):
  File "app.py", line 14, in <module>
    main()
  File "app.py", line 10, in main
    total = price_with_tax(item)
  File "app.py", line 5, in price_with_tax
    return item["price"] * 1.2
KeyError: 'price'
```

The last line is the error itself (`KeyError: 'price'`). The lines above are the calls that
led to it.

## How to read one

1. **Start with the error message.** What kind of error, and what does it say?
2. **Find the first line that's your code**, not a library's. Frameworks add many frames;
   the bug is usually in the first frame you wrote.
3. **Open that file and line**, then look at the values involved.
4. Use the frames above it to see *how* you got there, such as which caller passed the bad data.

## Order differs between languages

Python prints the *most recent* call **last**. JavaScript (and Java) print the most recent
call **first**, right under the error message. Check which one you're looking at.

```
TypeError: Cannot read properties of undefined (reading 'price')
    at priceWithTax (app.js:5:20)     <- where it crashed
    at main (app.js:10:15)
    at app.js:14:1
```

Don't paste only the last line when asking for help; the whole trace is the useful part.
The skill of reading these is covered in [reading error messages](/t/reading-error-messages).
