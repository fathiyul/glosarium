---
title: "Form State Management"
summary: "Values, touched fields, errors and submission state."
levels: { frontend: mid-level }
aliases: ["form state management", "React Hook Form", "Formik", "form libraries", "handling forms"]
prereqs: ["controlled-vs-uncontrolled", "form-validation"]
related: ["html-forms", "form-validation", "controlled-vs-uncontrolled", "accessible-forms", "double-submit", "runtime-validation"]
core: [frontend]
---

A real form is more than field values. Its **state** includes:

| State | Meaning |
|---|---|
| **Values** | What the user has typed |
| **Touched** | Which fields the user has visited (to avoid showing errors on untouched fields) |
| **Dirty** | Whether anything differs from the initial values (to warn before leaving) |
| **Errors** | Validation messages per field, plus form-level and server errors |
| **Submitting** | A request is in flight (disable the button, avoid [double submits](/t/double-submit)) |
| **Submitted / success** | What to show afterwards |

Managing these by hand with `useState` for every field gets repetitive and error-prone, especially with validation and many fields. **Form libraries** (React Hook Form, Formik, TanStack Form and their equivalents in other
frameworks) manage it, and often reduce re-renders by treating inputs as [uncontrolled](/t/controlled-vs-uncontrolled).

```tsx
// React Hook Form, with a schema for validation
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
  resolver: zodResolver(SignupSchema),
});

<form onSubmit={handleSubmit(async (values) => { await api.signup(values); })}>
  <input {...register("email")} aria-invalid={!!errors.email} />
  {errors.email && <p role="alert">{errors.email.message}</p>}
  <button disabled={isSubmitting}>Sign up</button>
</form>
```

## Design decisions

- **When to validate**: on blur and on submit is a common balance. Validating on every keystroke from the start is annoying, and showing errors before the user has finished typing in a field is too.
  Re-validate on change after an error was shown, so it clears as soon as it's fixed.
- **Where rules live**: define them in a shared schema ([runtime validation](/t/runtime-validation)), and re-check on the server, always ([form validation](/t/form-validation)).
- **Server errors**: map responses back to fields ("email already registered" under the email input), and show a general message for the rest.
- **Keep user input on failure.** Never clear the form because a request failed.
- **Accessible errors**: associate messages with inputs, announce them, and move focus to the first error on submit ([accessible forms](/t/accessible-forms)).
- **Drafts and unsaved changes**: warn when leaving a dirty form, and consider autosaving long ones.
- **Derived fields and dependent fields** (country → state) need explicit handling.

## When you don't need a library

A form with two fields is fine with plain state or an uncontrolled form read through `FormData` ([HTML forms](/t/html-forms)). Reach for a library when forms are large, dynamic or validation-heavy.
