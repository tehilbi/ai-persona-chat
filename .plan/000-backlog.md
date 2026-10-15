# Prioritized Backlog

Format:
- `- [ ] <title>`

Current queue:
- [ ] Verify backend end-to-end: run `app.py` and send a message from the browser (plan 002 validation)
- [ ] Backend streaming (deferred from plan 002, after end-to-end works)
- [ ] Extract chat logic into a `useChat` hook (deferred, optional)

## DONE
- [x] Frontend components: PersonaSelector, ChatWindow, MessageInput (plan 001; rendered by the App test)
- [x] Persona knowledge documents: tutor, mentor, reviewer (plan 003)
- [x] Persona switch during a pending reply: persona cards and input are disabled while waiting, and App ignores late replies as a backup (App test passes)
- [x] Error bubble in the chat when a request fails
- [x] Vitest and Testing Library set up, with one passing test
- [x] Frontend at 375px width: cards and Send button fit, no horizontal scroll (checked by Tehila)
