---
title: "Command Injection"
summary: "Running shell commands through unsanitized input."
levels: { backend: mid-level }
---

Command injection happens when untrusted input changes an operating-system command that an application constructs or executes. If code concatenates a filename or search term into a shell string, shell metacharacters may let the input run additional commands with the application's privileges.

The safest design is usually not to invoke a shell: use a library API for the task, such as a filesystem or archive library. If an external program is necessary, pass an argument array to a process API that avoids shell parsing, validate each argument against the expected format, and use a fixed executable path. APIs and shell behavior vary, so verify the specific runtime call.

For example, a “convert this image” endpoint should not build `convert <user value>` as one shell string. Even when escaping is attempted, quoting rules differ across shells and edge cases are easy to miss. Do not rely on a blacklist of suspicious characters.

Run the process with the least privilege needed, constrain its working directory and resources, and avoid returning raw command errors to clients. Backend developers should review all subprocess boundaries, including scripts and job runners. Frontend validation can improve usability but is not a security boundary. See [path traversal](/t/path-traversal) and [input validation](/t/input-validation).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
