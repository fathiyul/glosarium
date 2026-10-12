---
title: "Hallucination"
summary: "An AI confidently producing APIs, facts or code that don't exist."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["AI hallucination", "made-up API", "confabulation"]
prereqs: ["ai-coding-assistant"]
related: ["ai-coding-assistant", "reviewing-ai-code", "ai-learning-pitfalls", "reading-docs", "prompting-for-code"]
---

In AI, a hallucination is when a model produces something that sounds right but isn't true: a function that doesn't exist, a wrong parameter, a made-up citation or fact. It states it as confidently as it would state a correct answer.

In coding it looks like:

```python
df = pd.read_parquet("data.parquet", use_arrow_cache=True)   # no such argument
response = requests.get(url, retry=3)                          # requests has no such option
from fastlib.helpers import auto_paginate                      # a package that doesn't exist
```

The code reads plausibly, and may fail at runtime, or worse, appear to work while doing something different.

## Why it happens

Language models generate text that fits patterns from their training. They don't look facts up unless connected to a tool, and they don't know what they don't know. Rare libraries, new versions, niche APIs and long, complicated tasks make mistakes more likely.

## How to protect yourself

- **Check the official documentation** for any function, flag or API you didn't already know ([reading docs](/t/reading-docs)).
- **Run the code and the tests.** An error like "has no attribute" is a good sign you caught one.
- **Verify package names** before installing. Attackers register packages with names that AI tools often invent ([supply chain security](/t/supply-chain-security)).
- **Mind versions.** Ask for the version you use, and check the docs for it.
- **Give the model real context**: paste the relevant docs, signatures or errors instead of letting it guess.
- **Be suspicious of confidence**, and of answers to questions with very specific details you can't verify.
- **Ask it to say what it's unsure about**, but don't treat that as proof.

## Not just code

Explanations, dates, statistics, quotes and links can all be invented. Verify important claims.

Treat AI output as a draft from a fast, well-read, sometimes careless colleague ([reviewing AI code](/t/reviewing-ai-code)).
