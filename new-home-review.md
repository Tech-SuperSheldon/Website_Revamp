# `/new-home` Visual Review — Irregularities & Suggestions

> **STATUS — FIXES APPLIED (verified via re-screenshot):**
> - ✅ Tailwind v4→v3 class translation across all copied components (hero image now renders
>   678×452, rotating gradient word visible, hero bg gradient, phone/reels aspect ratios, parents
>   card radius/gradient/3D tilt). No v4-only classes remain anywhere in `src`.
> - ✅ `AutoplayMutedVideo` now pauses off-screen via IntersectionObserver (perf).
> - ✅ `USCourseTree` hydration risk removed (`window.innerWidth` → state).
> - ✅ Bonus: same v4-class bug fixed in pre-existing files on other pages
>   (`CoursePage.jsx` → `/courses`, `UKComp/*`, `try-class/stats-section`, old `new-site/*`).
> - ⏳ Not done (needs your direction): restyle the revamp extras (Credits / TryFreeClass / Review)
>   to match the us aesthetic — this is a redesign, not a bug fix.


Reviewed with Playwright (headless Chromium) — stepped screenshots at desktop (1440×900) and
mobile (390×844), plus focused element captures and DOM measurements.
Note: in my screenshots I blocked `.mp4` files to stop the container from running out of RAM, so
every video area shows an empty gray/dark box — **those gray boxes are NOT bugs**, they are real
videos in the live page.

---

## 🔴 ROOT CAUSE — Tailwind v3 vs v4 class mismatch (causes most "broken" things)

The us-website components were written for **Tailwind v4**; revamp runs **Tailwind v3.4.1**.
Several v4-renamed utilities silently do nothing in v3. Confirmed via DOM: the hero image wrapper
computes to **height: 0**.

Broken classes found and the v3 replacement:

| v4 class (broken in revamp) | v3 replacement | Files |
|---|---|---|
| `bg-linear-to-r` / `-t` / `-bl` / `-br` | `bg-gradient-to-r` / `-t` / `-bl` / `-br` | NShero (×4), NSparents-testimonial (×1) … 6 total |
| `aspect-3/2` | `aspect-[3/2]` | NShero |
| `aspect-9/18` | `aspect-[9/18]` | NShero (phone video) |
| `aspect-9/16` | `aspect-[9/16]` | NSTeacherTest (reels video) |
| `rounded-4xl` | `rounded-[2rem]` | NSparents-testimonial |
| `perspective-1000` | `[perspective:1000px]` | NSparents-testimonial (×2) |

### What this breaks visually
1. **Hero student image (`/p2.png`) is invisible** — `aspect-3/2` → height 0, so the entire right
   half of the hero is empty on desktop and a big blank gap on mobile. *(Most obvious bug.)*
2. **Hero rotating word (SATs / ICAS / NAPLAN) is invisible** — it uses `text-transparent` +
   `bg-clip-text` + `bg-linear-to-r`. The gradient never applies, so the clipped text is fully
   transparent. The word IS in the DOM (confirmed "…From School to ICAS"), it just can't be seen.
3. **Hero background skew/gradient decoration missing** (`bg-linear-to-bl`).
4. **Hero phone-video frame collapses** (`aspect-9/18`).
5. **Teacher "reels" video frame collapses** in NSTeacherTest (`aspect-9/16`).
6. **Parents-testimonial desktop cards**: no rounded corners (`rounded-4xl`), no gradient fill
   (`bg-linear-to-br`), no 3D tilt (`perspective-1000`).

---

## 🟡 Other irregularities

- **Scroll-reveal timing** — many sections use `whileInView` fade-ins (course tree cards, etc.).
  When scrolling fast, later items are still at opacity 0. In one capture the course tree showed
  only 2 of 4 cards; DOM check confirmed **all 4 render** once in view — it's just the staggered
  reveal. Not broken, but the stagger is slow; consider lowering the delay.
- **USCourseTree hydration smell** — reads `window.innerWidth` during render
  (`USCourseTree.tsx`, the mobile-pulse branch). This is an SSR/client mismatch risk; move it into
  state set inside `useEffect`.
- **Revamp extras still in revamp styling** — Credits ("Trusted Feedback"), TryFreeClass
  ("Book your demo now"), Review ("01 Learn / 02 Academics / 03 Parents Feedback") look visually
  different from the us aesthetic (flat orange banner, hard drop-shadow cards). Restyle to match.
- **Footer wordmark overlap** — `logo.png` already contains the "SUPER SHELDON" text, so it slightly
  overlaps itself in the footer brand block. Minor.
- **Performance** — the page autoplays many videos at once (Why-Choose 300vh stack, Anim grid,
  Features, testimonials). It OOM-crashed headless Chromium here; on low-end devices it may stutter.
  Consider pausing off-screen videos / lazy mounting.
- **"1 Issue" dev badge** seen in screenshots = the blocked `.mp4` request from my test only; no real
  console/JS/hydration errors were detected when media loads normally.

---

## ✅ Sections that look good (desktop + mobile)
Header/nav, Credits, TryFreeClass, Student testimonial slider, Course-tree heading + (once revealed)
all 4 cards, Class-video feature row, Why-Choose stacked cards, Alex story, Parents wall (content),
Review cards, Anim grid, Teacher floating cards + carousel, Features grid (24×7, Worldwide globe),
LevelUp app mockup + store buttons, FAQ accordion + tabs, Footer (all revamp content correct).

---

## Recommended fix order
1. Translate the 6 Tailwind-v4 classes above (mechanical, ~5 edits). Fixes items 1–6 at once.
2. Re-screenshot hero to confirm image + rotating word appear.
3. (Optional) Guard `window.innerWidth` in USCourseTree; restyle revamp extras; pause off-screen videos.
