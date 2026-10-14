# Plan: Persona Knowledge Documents

Status: done
Owner: Tehila
Last updated: 2026-10-14

---

## Goal
Replace the 1-2 sentence system prompts in `backend/app.py` with rich persona "training
manuals" stored as markdown files, long enough to be eligible for Anthropic prompt caching
(minimum ~4,500 tokens). This step only creates the markdown files; wiring them into
`app.py` is a separate step.

---

## Scope

In scope:
- `backend/personas/tutor.md`
- `backend/personas/mentor.md`
- `backend/personas/reviewer.md`

Out of scope:
- Any change to `backend/app.py` or any other code

---

## Assumptions
- ~3,500 English words is roughly 4,500 tokens, the cache minimum.
- Documents are written in English, as requested.

---

## Open Questions
None for this step.

---

## Steps

1. Create `backend/personas/tutor.md` with 7 sections:
   1. Persona overview and mission
   2. Teaching philosophy
   3. Tone and style rules, with good vs bad phrasing
   4. Hard rules
   5. Response templates
   6. 3-4 full example dialogues
   7. Scope boundaries
2. Create `backend/personas/mentor.md` with the same 7 sections, adapted to career advising.
3. Create `backend/personas/reviewer.md` with the same 7 sections, adapted to code review.

Reviewer summary: expert code reviewer. Finds bugs first, then suggests improvements, and
explains the reasoning behind each comment. Redirects requests to write the whole feature
for the user and to review code that is not shared in the chat.

Tutor summary: patient, encouraging teacher. Breaks topics into steps, checks understanding,
never shames. Redirects doing homework for the user and direct answers without explanation.

Mentor summary: practical, direct career mentor. Covers CV review, interview prep, career
decisions, salary negotiation framing. Redirects therapy, legal/financial advice, and
guarantees about outcomes.

---

## Validation
- [ ] `backend/personas/tutor.md` exists.
- [ ] `backend/personas/mentor.md` exists.
- [ ] `backend/personas/reviewer.md` exists.
- [ ] Each file has all 7 section headers, in order.
- [ ] Each file is at least 3,500 words (`wc -w backend/personas/*.md`).
- [ ] Each file contains 3-4 multi-turn example dialogues.
- [ ] `backend/app.py` is unchanged.

---

## Risks
- Word count alone does not guarantee token count. Confirm with the API's `usage.input_tokens`
  once the docs are wired in, which is a later step.

---

## Rollout Order
1. Write `tutor.md`.
2. Write `mentor.md`.
3. Run the validation commands.

---

## Rollback
Delete `backend/personas/`. No other files are touched.
