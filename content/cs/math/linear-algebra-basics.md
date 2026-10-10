---
title: "Linear Algebra Basics"
summary: "Vectors and matrices, the foundation of graphics and ML."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["linear algebra", "vectors and matrices", "matrix math"]
prereqs: ["simd", "gpu"]
related: ["neural-network"]
---

**Linear algebra** is the math of **vectors** (lists of numbers) and **matrices** (grids of numbers), and the operations between them. It's the language behind computer graphics, machine learning, scientific computing and a lot of data analysis — any time you manipulate many numbers together, you're probably doing linear algebra.

The core pieces:

- Vector — a list of numbers, like `[3, 1, 4]`. It can represent a point, a direction, or a feature vector.
- Dot product — combines two vectors into a single number by multiplying matching elements and summing. It measures how aligned two vectors are, and it's the operation inside a neural network's "neuron".
- Matrix — a rectangular grid; multiplying a matrix by a vector transforms the vector (rotate, scale, project).
- Matrix multiplication — combining matrices; the workhorse of graphics pipelines and deep learning.

```text
dot([1,2,3], [4,5,6]) = 1·4 + 2·5 + 3·6 = 32
[ 2 0 ] [ x ]   [ 2x ]          # a matrix scales x and y
[ 0 3 ] [ y ] = [ 3y ]
```

Why it matters so much: these operations are highly regular, which makes them the perfect fit for hardware acceleration. [GPUs](/t/gpu) and [SIMD](/t/simd) are built to do enormous numbers of these operations in parallel, and that's exactly why machine learning and 3D graphics are practical at all.

The classic mistakes:

- Getting dimensions wrong. Matrix multiplication requires the inner dimensions to match; a shape mismatch is the most common error. Track the sizes.
- Assuming matrix multiplication commutes. `AB` rarely equals `BA`; order matters, which trips people coming from ordinary arithmetic.
- Multiplying element-by-element when you mean matrix multiplication. These are different operations (`*` vs `@` in many libraries); mixing them silently produces wrong results.
- Ignoring performance basics. Layout and ordering of `A·B` can matter enormously; libraries tune this, so use them rather than naive loops.
- Being intimidated by the notation. At the code level it's loops and multiply-adds. The intimidating part is often just unfamiliar symbols.

Linear algebra is the bridge between "a list of numbers" and "transforming or comparing data". Basis vectors, dot products and matrix multiplication underpin everything from rotating a sprite on screen to training a [neural network](/t/neural-network) — and their regularity is precisely what makes modern parallel hardware so effective.
