---
title: "Neural Network"
summary: "Layers of weighted connections that learn from data."
core: [data-scientist]
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["neural network", "artificial neural network", "ANN"]
prereqs: ["machine-learning", "linear-algebra-basics"]
related: ["deep-learning", "overfitting", "embeddings"]
---
A **neural network** is a model built from layers of simple units: each unit takes a weighted sum of its inputs, adds a bias, and passes the result through a non-linear function. Stacking layers lets the network represent complicated functions, and the weights are what training adjusts.

```text
inputs → [weighted sum + bias → activation] × layers → output
```

The non-linearity is essential. Without it, any stack of layers collapses to a single linear transformation and cannot learn anything beyond a straight-line relationship. With it, the network can approximate very flexible mappings given enough data and capacity.

The classic mistakes:

- Assuming more neurons always helps. Extra capacity without enough data memorises noise and overfits (see [overfitting](/t/overfitting)).
- Ignoring input scaling. Features on wildly different scales train slowly or unstably; normalise inputs before training.
- Choosing architecture by fashion. The right shape depends on the data's structure (spatial, sequential, tabular); mismatched architectures waste capacity.
- Reading meaning into individual weights. Behaviour is distributed across many parameters; single weights rarely map to human concepts.
- Forgetting the training loop is part of the design. Learning rate, batch size and initialisation affect results as much as the architecture does.

**The core idea to keep:** a neural network is a parameterised function trained by adjusting its weights to reduce error. Everything else (architectures, optimisers, regularisation) is a way of making that adjustment work better on a particular kind of data.

When a network underperforms, check the boring parts first: input scaling, label quality, batch size and a learning rate that is neither too large nor too small. Architecture changes rarely fix problems that originate in the data or the training loop.
