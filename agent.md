# NoJudgment — Agent Architecture & Design System Documentation

> **Context Document for Future Agent & Developer Iterations**  
> *Last Updated: Tactile Parchment & Blueprint Studio Design System Alignment*

---

## 1. Executive Overview

**NoJudgment** is a voice-first English practice studio designed to help non-native speakers overcome hesitation, conversational anxiety, and self-judgment. 

The application provides:
1. **Peer-to-Peer Realtime Voice Channels**: WebRTC audio-only rooms with dynamic topic and CEFR level matchmaking.
2. **Adaptive AI Coaching**: Conversational coaching powered by Llama 3 via Groq.
3. **Automated Speech Diagnostics**: Real-time speech-to-text transcript analysis tracking fluency, clarity, filler words, and grammar refinements.
4. **Gamification & Habit Consistency**: Daily streaks, XP points, and weekly global leaderboards.

---

## 2. Design System: Tactile Studio Aesthetic

The design features a bespoke tactile studio aesthetic with warm parchment surfaces, beveled physical keycaps, and a deep blueprint footer:

### 2.1 Color Tokens

| Role | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Primary Ink** | `#1d1c1a` | Headings, primary pill buttons, high-contrast text |
| **Page Canvas** | `#f6f5f1` | Global body background (warm off-white parchment) |
| **Card Surface** | `#fcfbf8` | Elevated content containers & cards |
| **Secondary Surface**| `#f5f3ee` | Internal panels, code blocks, quote containers |
| **Blueprint Navy** | `#13213B` | Blueprint grid footer background |
| **Blueprint Grid** | `rgba(255, 255, 255, 0.15)`| 40px blueprint lines |
| **Frame Border** | `#e8e6e1` | Standard UI boundaries and dividing rules |
| **Text Muted** | `#6a625a` | Secondary text, descriptions |
| **Accent Peach** | `#d9b3a9` | Terracotta / peach card highlights & folders |
| **Accent Lavender**| `#c9bcd6` | Soft lavender cards, spiral notebooks & badges |
| **Accent Sage** | `#99c1bb` | Gentle educational teal for safe/verified cards |
| **Accent Orange**| `#b4400f` | Highlight orange ink, live indicators, streak flame |
| **Keycap** | `#f1efea` | Tactile keycaps, tags, secondary button fills |

### 2.2 Typography Tokens

* **Display & Primary Headings**: `Fraunces` (`--font-fraunces`, Google Font, italic and normal, weights `300`, `400`).
  * Used for: Section titles (`Choose where to start.`, `See a lesson from the inside.`, `More than lessons.`, `Get your pass.`, `Frequently asked questions`), and the gigantic watermark footer typography (`nojudgment`).
* **Body Text**: `Satoshi` (`--font-body`, Fontshare CDN, weights `400`, `500`, `600`, `700`).
* **Code / Monospace / Dot Matrix**: `Doto` and `JetBrains Mono` for timers, keycaps, and dot-matrix styled cycling hero words.

### 2.3 Landing Page Structure (Tactile Physical Studio Sections)

1. **Top Navbar** ([components/Navbar.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/Navbar.tsx)):
   * `✦ nojudgment` logo
   * Floating center pill menu: `Learn · Practice · Interview · Pass · FAQ`
   * Right side: `Sign in` link and black pill button `Start speaking`
2. **Hero Section** ([components/landing/HeroTactileObjects.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/landing/HeroTactileObjects.tsx)):
   * Dot grid canvas (`#f6f5f1` with `radial-gradient`)
   * Left: Layered tactile folders (Peach with dialogue attention flow, Sage pronunciation breakdown, Lavender vocabulary) + retro green card index tin with tabs
   * Center: Massive typography `Speak FLUENT inside out.` (with dot-matrix matrix lettering) + dual buttons (`Start speaking`, `See a scenario`)
   * Right: Natural corkboard with stopwatch timer, pinned normal distribution bell curve + member pass on lanyard with flip numbers (`4.5 5.5`)
3. **Choose where to start** ([components/landing/StartArenas.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/landing/StartArenas.tsx)):
   * 3 large physical cards:
     * Peach card with attention weights paper sheet
     * Lavender card with spiral notebook speech cadence curve
     * Sage teal card with terminal window
4. **See a lesson from the inside** ([components/landing/OpenBookLesson.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/landing/OpenBookLesson.tsx)):
   * Open hardcover book spread with cream pages, center spine shadow, wooden magnifying glass inspecting tokens, and your-turn question.
5. **More than lessons** ([components/landing/MoreThanLessons.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/landing/MoreThanLessons.tsx)):
   * 3 cards with 3D/illustrated tops (Daily practice with flashcard box, Build it yourself with stacked speech blocks, Interview prep with floorplan journey)
   * Social proof bar (`Used by 25,000+ speakers from Microsoft, ZERODHA, TWO SIGMA, TEMPLE, Meta`)
6. **Get your pass** ([components/landing/MembershipPass.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/landing/MembershipPass.tsx)):
   * Segmented pill toggle (`Monthly · Quarterly · Annual · Lifetime`)
   * Two floating 3D membership pass cards (front with chip/price, back with magnetic stripe and signature)
7. **Frequently asked questions** ([components/landing/FAQAccordion.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/landing/FAQAccordion.tsx)):
   * Clean accordion with `+` / `x` icons.
8. **The Blueprint Grid Footer** ([components/Footer.tsx](file:///C:/Users/iffco/Projects/nojudgement/components/Footer.tsx)):
   * Main parchment canvas ends with a bottom rounded curve (`rounded-b-[40px] sm:rounded-b-[60px]`).
   * Below it sits the deep navy blue (`#080d1a`) blueprint grid with fine cyan/white grid overlay (36px).
   * Center: Gigantic watermark typography `nojudgment` in Fraunces serif italic (~13vw)!
   * Bottom bar: Legal links and copyright.

---

## 3. Bug Fixes & Guardrails Resolved

1. **401 Unauthorized Error on `/api/points`**:
   * Previously, `NavbarDashboard.tsx` triggered `fetch('/api/points')` on every render without checking whether `session?.user` was active, causing a 401 error upon signout or unauthenticated visits.
   * **Fix**: Added guard check `if (!session?.user) { setLoading(false); return; }` and handled non-200 responses gracefully without throwing errors in console.
2. **Smooth Scrolling Route Warning**:
   * Fixed `[browser] Detected 'scroll-behavior: smooth' on the '<html>' element` by adding `data-scroll-behavior="smooth"` attribute to `<html lang="en" data-scroll-behavior="smooth">` in `app/layout.tsx`.
3. **Heatmap Fetch Resiliency**:
   * In `components/Heatmap.tsx`, network failures or unauthenticated responses now return `{ heatmap: [], streak: 0 }` instead of unhandled promise rejections.

---

## 4. How to Run

```bash
# Production build check
npm run build

# Start Next.js dev server
npm run dev

# Start Socket.io signaling server (for WebRTC peer matchmaking)
npm run socket
```
