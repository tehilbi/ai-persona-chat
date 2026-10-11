---
name: writing-plans
description: Create or revise an implementation plan in .plan/. Use whenever the user asks for a plan or approach for a task.
---

# Writing Plans

`.plan/` at the repository root is the source of truth for plans.
`000-backlog.md` is the task queue; every other file is a plan.

## Before writing anything
1. Read the existing `.plan/*.md` files — a new plan must build on decisions already made.
2. Read `.doc/product-definition.md` for acceptance criteria and scope.

## Filename
`NNN-YYYY-MM-DD-<topic>.md`, with a sequential numeric prefix — `001`, `002`, `003`.
Example: `.plan/001-2026-10-11-backend-setup.md`

## Required metadata
```
Status: draft | active | done
Owner:
Last updated: YYYY-MM-DD
```
New plans start as `Status: draft`. Only explicit user approval flips a plan to `active`.

## Required sections
Every plan must contain all of these, in order:

`Goal` · `Scope` · `Steps` · `Validation` · `Rollback`

## Rules
- Repository-relative paths only. Never absolute paths.
- `Validation` items must be provable — a command, a test, or something visible in the browser.
- Ask questions inside the plan file, not in chat.
- Request approval before executing the plan.
