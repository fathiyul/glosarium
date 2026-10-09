---
title: "Runtime Validation"
summary: "Checking that untrusted data matches a type at runtime, e.g. with Zod or Pydantic."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["Zod", "Pydantic", "schema validation", "validating at runtime", "runtime type checking", "parsing untrusted data"]
prereqs: ["typescript", "input-validation"]
related: ["json-schema", "never-trust-the-client", "input-validation", "type-guard", "structured-output", "dto"]
core: [frontend]
---

Static types (TypeScript, Python type hints) exist **only at compile time**. They're erased, and at runtime nothing checks that data actually has the shape the types claim. Data
from outside your program (API responses, form input, files, environment variables, JSON from a database) is `unknown` until you **validate it at runtime**.

```ts
type User = { id: number; email: string };

const user = (await res.json()) as User;     // a promise to the compiler, not a check!
user.email.toLowerCase();                    // crashes if the API returned something else
```

The `as` cast tells TypeScript to trust you. If the server changes its response, the compiler can't notice.

## Validate with a schema library

Define the shape once, and **parse** unknown data against it:

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  age: z.number().min(0).optional(),
});
type User = z.infer<typeof UserSchema>;      // the TypeScript type comes from the schema

const result = UserSchema.safeParse(await res.json());
if (!result.success) {
  console.error(result.error.issues);        // which fields failed, and why
} else {
  const user: User = result.data;            // now genuinely typed
}
```

```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: int
    email: EmailStr
    age: int | None = None

user = User.model_validate(payload)          # raises ValidationError with details
```

Zod (TypeScript) and Pydantic (Python) are widely used examples. Others exist for most languages.

## Where to use it

- **At the boundaries** of your system: incoming requests ([input validation](/t/input-validation)), responses from other services, config and environment variables, data read
  from files and queues.
- **Not everywhere inside.** Once validated, the rest of your code can trust the types.

## Benefits

- **One source of truth** for the shape, the type and the validation rules.
- **Clear errors** that say which field is wrong, instead of a crash three functions away.
- **Safer evolution**: when an upstream API changes, you find out at the edge and in tests.
- **Transformation as well as checking**: coercing strings to numbers or dates, setting defaults, stripping unknown fields.

Remember [never trust the client](/t/never-trust-the-client). A [JSON Schema](/t/json-schema) is the language-neutral form of the same idea.
