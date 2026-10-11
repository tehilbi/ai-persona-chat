# Git Workflow

## Approval gates — no exceptions
- **Never commit** until the user explicitly approves committing.
- **Never merge** a branch without explicit approval.
- **Never push** without explicit approval.

## Branches
- Do implementation work on a dedicated branch, never on `main`.
- Create the branch before executing an approved plan.
- Lowercase, predictable names:
  - `feat/<topic>` — new capability
  - `fix/<topic>` — bug fix
  - `chore/<topic>` — maintenance
  - `docs/<topic>` — documentation only

## Commits
- Imperative subject, concise and action-oriented: `add persona selector component`.
- One intent per commit. Do not bundle unrelated changes.
