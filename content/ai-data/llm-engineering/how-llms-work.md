---
title: "How LLMs Work"
summary: "Tokens in, next-token prediction out: a mental model of what's happening."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["how LLMs work", "large language models", "LLM internals"]
prereqs: ["neural-network", "deep-learning"]
related: ["llm-token", "temperature", "prompt-engineering"]
---
A **large language model (LLM)** is a neural network trained to predict the next token in a sequence of text, given all the tokens before it. Training on very large amounts of text teaches it grammar, facts, style and many task patterns as a side effect of that one objective. At use time it generates text by repeatedly sampling a next token and appending it.

```text
prompt tokens → model → probability over next token → sample → append → repeat
```

Two consequences shape everything built on top. First, the output is a probability-weighted continuation, not a lookup, so it can be fluent and wrong at once. Second, the model has no access to anything outside its input and learned parameters unless you supply it, which is why retrieval and tools matter.

The classic mistakes:

- Treating output as fact. Fluency is not accuracy. Verify claims that matter against a source you control.
- Assuming the model knows recent or private information. Its knowledge reflects training data and is fixed at a point in time. Supply current data in the prompt or via retrieval.
- Expecting identical answers every time. Sampling introduces variation; repeatability needs settings and evaluation, not hope.
- Confusing capability with reliability. A model may succeed on a demo and fail on the long tail of real inputs. Measure on realistic data.
- Ignoring that prompts are the interface. What you put in the input largely determines behaviour, so treat prompts as code.

**The working model:** an LLM is a powerful next-token predictor that you steer through its input and surround with checks. Design systems around its limits, not around an imagined understanding.
