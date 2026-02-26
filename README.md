# Nisa Engineering Challenge: The Flaky Stream

Welcome! At Nisa, we value **autonomy**, **resilience**, and **quality**. We don't care if you can reverse a binary tree on a whiteboard. We care if you can ship a stable, usable feature in a real codebase.

## The Scenario

You've just joined the team. The previous engineer shipped this "Lesson Plan Generator" prototype and then went on a silent retreat. Users are reporting bugs, and the CI pipeline is flaky.

**Your Mission (Timebox: 2-3 hours max)**
We don't expect perfection, but we expect **improvement**.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Run the E2E tests
pnpm test:e2e
```

> **Note:** No API keys are needed. The AI endpoint is mocked — it streams realistic lesson plan content without calling any external service.

---

## Your Tasks

### 1. Fix the "Double Trouble"

**The Issue:** If you hit "Enter" or click "Send" multiple times while a lesson plan is generating, the app breaks — duplicate messages, garbled state, concurrent streams fighting each other.

**The Task:** Make the chat interface robust. Users shouldn't be able to break the state by clicking buttons rapidly.

### 2. Stabilize the Test Suite

**The Issue:** Run `pnpm test:e2e`. The tests mostly pass, but one fails intermittently.

**The Task:** Fix the test in `tests/lesson-plan.spec.ts` so it passes **100% of the time**, even on slow machines.

**Constraint:** Do NOT use `page.waitForTimeout(5000)` or any hard sleeps. Use proper Playwright assertions or locator methods.

### 3. Polish the Auto-Scroll (UX)

**The Issue:** Try reading the top of a lesson plan while it's still being generated. The app aggressively scrolls you to the bottom on every streaming token. It's annoying.

**The Task:** Fix the auto-scroll behavior. It should only auto-scroll if the user is already near the bottom. If they scroll up to read, leave them alone.

---

## A Note on AI Tools

You may use AI assistants (ChatGPT, Copilot, Claude, etc.) freely — we use them too. What we're evaluating is not whether you typed every character, but whether you **understand what the code does and can explain your decisions**. The Loom recording is where that shows.

## How to Submit

1. Clone this repo (do not fork).
2. Make your fixes on a new branch.
3. **Record a < 5 minute Loom video** (or any screen recording) walking us through:
   - The bugs you found and **why** they happen.
   - Your fix for each one and **why you chose that approach** (e.g., "I used `AbortController` because…").
   - Show the tests passing reliably.
4. Email us the link to your repo and the video.

## Evaluation Criteria

| Criteria | What we're looking for |
|---|---|
| **Code Quality** | Is the fix clean and focused? Did you introduce new bugs? |
| **Testing Mindset** | Did you understand *why* the test was flaky, not just make it pass? |
| **Product Instincts** | Does the scroll fix feel natural to a real user? |
| **Communication** | Can you clearly explain your technical decisions in the video? |

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **AI SDK:** Vercel AI SDK (`ai` + `@ai-sdk/react`)
- **Styling:** Tailwind CSS
- **Testing:** Playwright
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    ← Mock streaming AI endpoint
│   ├── layout.tsx            ← Root layout
│   ├── page.tsx              ← Main page (renders Chat)
│   └── globals.css           ← Global styles
└── components/
    ├── chat.tsx              ← Chat component (input + orchestration)
    ├── message-list.tsx      ← Message list (scroll behavior)
    └── message-bubble.tsx    ← Individual message rendering
tests/
└── lesson-plan.spec.ts      ← E2E tests (one is flaky!)
```

Good luck! We look forward to seeing how you think.
