# Website Redesign Plan — ashutosh-iitg.github.io

**Status:** Ready for execution once the CV lands on this branch.
**Audience:** Any engineering agent (or human) picking this up cold. Every section below should be actionable without needing to re-derive context from the conversation that produced this plan.

---

## 0. What exists today (verified against the repo, not assumed)

- Stack: React 18 + Vite 5 + TypeScript + Tailwind + shadcn/ui (Radix primitives) + `wouter` for routing + `framer-motion` for animation.
- An Express + Drizzle + Postgres (`@neondatabase/serverless`) backend exists under `server/` and `shared/schema.ts`, wired to a `POST /api/messages` endpoint used by the contact form. **This cannot run on GitHub Pages** (static hosting only) — it currently only works in local dev via `tsx server/index.ts`.
- Deploy path: `npm run deploy` → `vite build` → `gh-pages -d dist -f`. No `CNAME`, no `public/` assets, no resume PDF anywhere in the repo.
- Every content section (`Hero.tsx`, `About.tsx`, `Experience.tsx`, `Skills.tsx`, `Projects.tsx`, `Blog.tsx`) is Replit-template placeholder copy: fake job history ("AI Solutions Inc"), a stock Unsplash avatar, `github.com/yourusername`, invented blog posts, invented projects (not Emissary/Doom).
- No phone number, resume link, or email currently appears anywhere in the codebase — the Navbar's "Download CV" button (`Navbar.tsx:36`) has no `href` at all. There is nothing live to "remove" or "keep pointing at" in code; the instruction to preserve/strip these applies to **content that arrives with the CV**, not to anything currently in the repo.
- **Update 2026-08-16**: the CV has landed at `assets/CV_Ashutosh_Kumar_Mandal.pdf` (currently untracked by git — not yet committed, which matters, see §11). It contains real name (Ashutosh Kumar Mandal), title ("Senior AI Engineer | Applied Generative AI, Agentic Systems & ML Platforms"), location (Bengaluru, India), email (`ashutosh.iitg.16@gmail.com`), GitHub/LinkedIn handle (`ashutosh-iitg`, confirming Open Item #4's guess), full experience/education/skills history, and three named projects — **none of which are "Emissary" or "Doom"** (the CV's own Projects section lists "Multi-Modal RAG Document QA," "Abstract Classification," and "PlantCLEF" instead). It also contains the phone number `+91-9435685646` printed directly in the header — see the upgraded, now-blocking Open Item #5 below.
- Dark mode already exists (`use-theme.tsx`, `mode-toggle.tsx`, class-based `light`/`dark` on `<html>`) but the palette (`theme.json`: teal-tinted primary) is not black-and-white.

## 1. Decisions already made (do not re-litigate these)

| Decision | Choice | Why |
|---|---|---|
| Resume link | Host `resume.pdf` directly in the repo, served at a stable path (`/resume.pdf`) | No third-party dependency, survives redeploys, user confirmed. |
| Contact form | Go fully static — remove Express/Drizzle/Postgres. Launch with `mailto:` only; Formspree gets wired in later once the user provides a form ID | GitHub Pages can't run a server; the backend is currently dead weight. No Formspree account exists yet (confirmed 2026-08-16). |
| "Fun little game" | A tiny Doom-style raycaster easter egg, tightly scoped (see §9) | Thematic tie-in to the "Doom" project. User confirmed, accepting the higher build cost over a simpler minigame. |
| Visual direction | Strict black-and-white, dark-mode-only, "CV-as-terminal" aesthetic — quirky through typography/motion/interaction, never through color | Explicit user instruction: "keep only a black and white ... dark mode." |
| Loader | A monochrome variant of the rotating "thinking orb" at https://orbs.jakubantalik.com/ | Explicit user reference. |

## 2. Open items — do NOT invent these, get them from the user or the CV

Block on these before marking the corresponding section done. Do not fabricate placeholder content and ship it silently — a half-real site is worse than a visibly-incomplete one.

1. ~~The CV itself~~ **RESOLVED 2026-08-16**: present at `assets/CV_Ashutosh_Kumar_Mandal.pdf`. `client/src/data/*.ts` (see §6) can now be populated for real instead of left as empty scaffolding.
2. **Emissary and Doom project details** — description, tech stack, links (repo/live demo), and any screenshots. **Still open, deferred by the user (2026-08-16): will be given later.** Confirmed the CV's own Projects section does *not* mention either (it lists "Multi-Modal RAG Document QA," "Abstract Classification," "PlantCLEF" instead), so these two must come directly from the user, not from CV extraction. Until the real facts arrive, `client/src/data/projects.ts` should carry Emissary and Doom as typed entries with `description: ""` (or an explicit `// TODO(project-description): user will provide`) rather than invented copy — a visibly-empty field is honest; a fabricated 2-3 paragraph description about someone's own project is not. Once the user provides the facts, write the 2-3 paragraph "what it is / how it's going to evolve" copy requested earlier and slot it in here and into `projects.ts`.
3. ~~Real photo or a deliberate monochrome avatar treatment~~ **RESOLVED 2026-08-16**: real photo, not an illustrated/geometric avatar. For now, keep the existing placeholder image already wired in `Hero.tsx` (`https://images.unsplash.com/photo-1507679799987-c73779587ccf`) as a temporary stand-in — user will swap it for an actual headshot later. Treat this as a known-temporary placeholder, not final content: leave a visible `TODO(real-headshot)` comment at the `<AvatarImage>` call site so it isn't mistaken for a deliberate choice later.
4. **Social links** — **Mostly resolved from the CV header**: GitHub `ashutosh-iitg`, LinkedIn `ashutosh-iitg`, email `ashutosh.iitg.16@gmail.com`. Still open: the CV lists a "Portfolio" link with no visible URL in the extracted text (likely this very site — confirm rather than assume) and no Twitter/X (assume N/A unless the user adds one).
5. **Phone number scrub — CONFIRMED PRESENT, this is now a blocking requirement, not a hypothetical.** The CV header contains `+91-9435685646` in plain text. This affects two separate things that must both be handled:
   - **Content extraction** (§6): when populating `client/src/data/profile.ts` etc., never copy the phone number into any component, data file, meta tag, or JSON-LD structured data.
   - **The resume file itself** (§11): if the raw `assets/CV_Ashutosh_Kumar_Mandal.pdf` is published as the site's downloadable resume, the phone number ships to every visitor who downloads it — silently defeating the removal instruction even though the *website's HTML* looks clean. §11 now specifies a redaction step that must happen before this file is ever copied into `client/public/`.
6. ~~Blog page~~ **RESOLVED 2026-08-16**: keep `/blog` in the nav and route, but replace the three fake posts in `Blog.tsx` with a genuine "coming soon" empty state (on-brand with the terminal aesthetic — e.g. a `> ls posts/ ... 0 results` style empty state rather than a generic "nothing here yet" banner). Do not leave any fabricated post titles live.
7. ~~Formspree form ID~~ **RESOLVED 2026-08-16**: no Formspree account exists yet — user will provide the form ID later. For now, ship the contact form wired to `mailto:` only (§10 updated accordingly); Formspree becomes a follow-up swap once the ID exists, not a blocker for launch.

## 3. Design direction — "CV-as-terminal," strictly monochrome

Per `web/design-quality.md`, this must not read as a default Tailwind/shadcn template. The brief already rules out color as a hierarchy tool, which raises the bar on everything else:

- **Palette**: pure grayscale only — `#000`/`#0a0a0a` background, `#f5f5f5`/`#fff` foreground, a small ramp of grays for muted text/borders (e.g. 5–7 steps). No tinted primary. Delete `theme.json`'s teal `primary` and the shadcn "tint" variant; rebuild CSS variables in `index.css` as hand-picked grayscale HSL/OKLCH tokens. Contrast must still hit WCAG AA (4.5:1 body text) — verify with a contrast checker, don't eyeball it on pure black.
- **Typography carries the hierarchy** since color can't: pair a monospace face (terminal/CV feel — e.g. JetBrains Mono, Berkeley Mono, or IBM Plex Mono) for labels/metadata/code-like elements with a high-contrast serif or grotesk display face for headlines. Large scale jumps between hero/section headers and body copy. This is the single most important design decision in the whole plan — get it locked early (§12) since it touches every component.
- **Motion**: `framer-motion` is already a dependency — use it for restrained, purposeful transitions (section reveals, hover states, the loader, page transitions), not decoration for its own sake. Respect `prefers-reduced-motion` everywhere (loader and game especially — see §8, §9).
- **Texture over color**: subtle grain/noise overlay, hairline borders, ASCII/box-drawing character accents, terminal cursor blink (`_`) motifs, monospace timestamps — these are how "quirky" gets expressed without breaking the B&W constraint.
- **Quirky details worth building** (pick a few, don't do all of them at once — treat as a backlog):
  - A `> whoami`, `> cat about.txt`-style framing for the About section.
  - Real-time UTC/local clock or "uptime" counter in the footer (terminal status-bar vibe).
  - Custom cursor or hover-state glitch/scanline effect on interactive elements.
  - Konami code or a hidden keystroke that jumps straight to the Doom easter egg (stretch goal, see §9).
  - 404 page (`not-found.tsx` already exists) reskinned as a terminal "segfault" screen instead of generic copy.

## 4. Information architecture

Routes (via `wouter`, already the routing lib in use):

| Route | Purpose | Status |
|---|---|---|
| `/` | Home: Hero → About → Experience → Skills → Projects → Contact (single-page scroll, same pattern as today) | Rebuild with real content + new design system |
| `/blog` | Optional — see Open Item #6 | Decide, don't assume |
| `/doom` (or `/play`) | The raycaster easter egg, full-bleed | New |
| `*` (404) | Reskinned terminal-themed not-found page | Restyle existing |

Navbar: drop the generic "AI Engineer" wordmark for the user's actual name/handle once known; keep in-page anchors for the single-page sections; add a deliberately understated nav entry to `/doom` (fits the "quirky" brief — e.g. a small `▶` or `[play]` token, not a loud CTA).

## 5. Dependency changes

**Remove** (dead weight once the backend goes away — confirm nothing else in the app touches these before deleting):
`express`, `express-session`, `passport`, `passport-local`, `connect-pg-simple`, `memorystore`, `drizzle-orm`, `drizzle-zod`, `drizzle-kit`, `@neondatabase/serverless`, `ws`, `@types/express`, `@types/express-session`, `@types/passport`, `@types/passport-local`, `@types/ws`, `bufferutil` (optionalDependency), `@jridgewell/trace-mapping` (check if only pulled in transitively for the server). Also delete `server/`, `shared/schema.ts`, `drizzle.config.ts`, and the `db:push` script.

**package.json script cleanup**: `dev` currently runs `tsx server/index.ts` — replace with `vite` (or `vite dev`) directly since there's no server left. `build`/`predeploy`/`deploy` stay as-is (pure Vite build → gh-pages). Remove the esbuild-the-server step from `build`.

**Add**:
- A raycasting engine has no good reason to pull in a library — hand-roll it in plain TypeScript/Canvas2D (see §9). No new dependency needed there.
- Loader: prefer **`three` + a small custom GLSL fragment shader** for genuine visual fidelity to the reference (a noise-displaced/metaball sphere), OR a lighter Canvas2D/CSS approximation if bundle budget is tight — see §8 for the explicit tradeoff and recommendation. If `three` is added, it must be dynamically imported (`await import('three')`) so it never inflates the initial bundle.
- A static form handler: no SDK needed for Formspree (plain `fetch` to their endpoint), so no new dependency there either.

Net effect: the dependency list gets **smaller**, not larger. This is a static personal site — resist the urge to add a CMS, a state library, or anything not already justified above (YAGNI).

## 6. Content pipeline — CV → typed data files

Per the file-organization rules (many small, cohesive files; feature-oriented, not type-oriented dumping grounds), do not hardcode arrays inside component files the way `Experience.tsx`/`Skills.tsx`/`Projects.tsx` do today. Instead:

```
client/src/data/
  profile.ts       # name, tagline, location, email, social links (NO phone number)
  experience.ts     # work history
  education.ts      # if present on the CV
  skills.ts         # skills / stack, grouped
  projects.ts        # includes Emissary + Doom entries at minimum
```

Define a `type`/`interface` per shape (per `typescript/coding-style.md` — explicit types on exported/shared data), e.g.:

```typescript
export interface ExperienceEntry {
  company: string;
  role: string;
  period: string; // e.g. "2022 — Present"
  summary: string;
  achievements: string[];
}

export interface ProjectEntry {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  links?: { repo?: string; demo?: string };
  featured?: boolean; // Emissary and Doom should be `featured: true`
}
```

Workflow for whoever executes this now that the CV is present at `assets/CV_Ashutosh_Kumar_Mandal.pdf`:
1. Extract text from the CV file (already done once for this plan — see §0's update; re-extract as needed while populating data files).
2. Strip the phone number (`+91-9435685646`, confirmed present in the header) before any of this content touches `client/src/data/` — do not paste it into `profile.ts` or anywhere else. Keep email (`ashutosh.iitg.16@gmail.com`), GitHub/LinkedIn (`ashutosh-iitg`), and location (Bengaluru, India), all of which are fine to publish.
3. Populate the typed data files above from the CV content (full experience history for CombineHealth/UpTrain and Valuence Technologies, IIT Guwahati education, technical skills groups are all present and ready to transcribe). Cross-check against Open Items #2–#4 for anything the CV doesn't cover — notably Emissary and Doom, which are **not** in the CV's own Projects section and must come from the user directly.
4. Components (`Hero.tsx`, `About.tsx`, `Experience.tsx`, `Skills.tsx`, `Projects.tsx`) import from `client/src/data/*` instead of hardcoding arrays — this also makes future content edits a data change, not a component change.

## 7. Page/component rebuild (design-system-aligned, per `web/coding-style.md` feature folders)

Reorganize from the current flat `components/` dump into feature folders:

```
client/src/
  components/
    hero/
      Hero.tsx
      hero.module.css (if needed beyond Tailwind)
    about/
      About.tsx
    experience/
      Experience.tsx
      ExperienceEntry.tsx
    skills/
      Skills.tsx
    projects/
      Projects.tsx
      ProjectCard.tsx
    contact/
      ContactForm.tsx
    loader/
      ThinkingOrbLoader.tsx
      orbShader.ts
      useOrbVisibility.ts        # session-storage "seen once" logic + reduced-motion gate
    navbar/
      Navbar.tsx
    footer/
      Footer.tsx                 # new — terminal status-bar footer, doesn't exist today
    ui/                          # unchanged (shadcn primitives)
  features/
    doom-game/
      DoomGame.tsx
      engine/
        map.ts
        raycast.ts
        input.ts
        renderer.ts
      DoomGame.module.css
  data/
    profile.ts
    experience.ts
    education.ts
    skills.ts
    projects.ts
  pages/
    Home.tsx
    Blog.tsx        # or delete, per Open Item #6
    Doom.tsx         # new, hosts <DoomGame />
    not-found.tsx     # reskinned
```

**GitHub contribution chart — keep it** (explicit user instruction, 2026-08-16). `Hero.tsx` already embeds one via `https://ghchart.rshah.org/409ba5/yourusername`. Keep the chart, but: (1) swap `yourusername` for the real handle `ashutosh-iitg` (confirmed from the CV header), and (2) swap the color param `409ba5` (a teal hex) for a grayscale hex so it doesn't violate the black-and-white constraint from §3 — `ghchart.rshah.org` accepts any hex color in that URL segment, so a light gray/white value against the dark card background keeps it legible and on-palette.

Each component: keep functions small (<50 lines per the shared coding standard), no `React.FC`, typed props via `type Props = {}`, destructure in the parameter list, no `dangerouslySetInnerHTML` anywhere.

## 8. The loader — monochrome "thinking orb"

Reference: https://orbs.jakubantalik.com/ — a rotating, organically-deforming sphere with soft shading, used as a loading indicator.

**Two implementation paths — choose based on fidelity vs. bundle-budget tradeoff (`web/performance.md` caps a landing page at <150kb gzipped JS):**

- **Path A (recommended default): Canvas2D approximation.** Draw a circle with a radial gradient (grayscale only) and animate its edge with layered sine/simplex-noise displacement (a small, self-contained noise function, ~50 lines, no dependency) to get an organic "breathing" wobble. Cheap, no new dependency, trivially respects reduced-motion (freeze-frame fallback), and fits the monochrome brief without any lighting/shader work.
- **Path B (higher fidelity, higher cost): `three.js` + a custom GLSL fragment shader** for a true 3D noise-displaced sphere with proper lighting/shading, closer to the reference site's look. Requires: dynamic `import('three')` so it's excluded from the main bundle, its own code-split chunk only loaded on the loader's mount, a cleanup path that disposes the WebGL context on unmount (renderer, geometry, materials — Three.js leaks GPU memory if you skip this), and a plain-CSS fallback for browsers/devices where WebGL context creation fails.

Recommendation: **start with Path A**, ship it, and only invest in Path B if the visual gap actually bothers the user after seeing A in the browser — this avoids sinking the game's build budget into shader tuning for a loader that's only on screen for ~1–2 seconds.

Behavioral requirements regardless of path:
- Shows on cold page load only (use `sessionStorage` so navigating between in-app routes doesn't re-trigger it every time).
- Hard cap the display duration (e.g. min 400ms so it doesn't flash, max ~2s even if content is slower) — never block interaction indefinitely.
- `prefers-reduced-motion: reduce` → replace the animated wobble with a static frame or a simple opacity fade; never force motion on users who've opted out (`web/accessibility` requirement, also directly testable per `web/testing.md`).
- Must not visually use any color — grayscale gradient/shading only, consistent with §3.

## 9. The Doom easter egg — scope it tight

This is a nod to the "Doom" project, not a Doom clone. Keep the scope explicit so it doesn't sprawl:

**In scope (MVP):**
- A classic DDA (Digital Differential Analysis) raycaster rendering a small fixed 2D grid map (e.g. 16×16) as pseudo-3D walls on a `<canvas>`, plain TypeScript, no rendering library.
- Grayscale-only wall shading by distance (darker = farther — this is a place where the monochrome constraint actually strengthens the retro-Doom aesthetic instead of fighting it).
- WASD/arrow-key movement + mouse-look or arrow-key turning. Desktop-first; show an explicit "best on desktop" notice on touch devices rather than half-building touch controls.
- One condition that counts as "finishing" it (reach a marked exit tile, or a simple timer/step counter) — something, so it reads as a game rather than an unfinished tech demo.
- Reachable from: (a) a "▶ play a tiny tribute" affordance on the Doom project card in `Projects.tsx`, and (b) the `/doom` route directly.

**Explicitly out of scope** (resist scope creep here — this is a portfolio easter egg, not a game studio project): enemies/combat, sound, level editor, mobile touch controls, save state, multiple levels.

**Stretch, only if the MVP ships clean and there's appetite:** a Konami-code trigger from anywhere on the site that jumps to `/doom` (ties back to the "quirky" brief in §3).

Accessibility note: this feature is inherently motion- and mouse/keyboard-heavy; it cannot be made fully accessible in the WCAG sense. Mitigate by keeping it opt-in (never auto-launches, never blocks navigation) and giving it a clear text description/static screenshot for anyone who can't or doesn't want to play it, rather than pretending it's equivalent to the rest of the site.

## 10. Contact form → fully static

- Remove `server/routes.ts`'s `/api/messages` handling, `shared/schema.ts`'s `insertMessageSchema`/`InsertMessage` (or keep the Zod schema client-side only, since `react-hook-form` + `zodResolver` already depend on it for client-side validation — just stop importing it as a "shared with server" type).
- **Decided 2026-08-16: launch with `mailto:` only, Formspree comes later.** No Formspree account/form ID exists yet. Two reasonable shapes for "mailto only" — pick whichever fits the terminal aesthetic better when it's actually built:
  - (a) Keep the visual contact form (name/email/message fields matching the current UI), but on submit, build a `mailto:you@example.com?subject=...&body=...` URL from the field values and open it (hands off to the visitor's own mail client) instead of a `fetch` POST — no network call, no backend, works everywhere.
  - (b) Skip the form fields entirely and just present a direct `mailto:` link/button — simpler, less to maintain, arguably more honest about there being no real submission pipeline yet.
  - Either way, leave a clearly marked `TODO(formspree-id)` at the exact point where the Formspree `fetch('https://formspree.io/f/<FORM_ID>', ...)` call will go, so swapping it in later is a one-line change once the user provides the ID — do not build the Formspree branch speculatively now.
- Client-side validation (if the form-fields shape (a) is chosen) stays as Zod + `react-hook-form` (already the pattern in use — keep it, don't replace).
- No CSRF/spam concern with a pure `mailto:` approach since there's no submission endpoint at all yet. Revisit the honeypot-field recommendation from `web/security.md` once Formspree is actually wired in.

## 11. Resume wiring

- **Source file**: `assets/CV_Ashutosh_Kumar_Mandal.pdf`, already added to this branch. **Currently untracked by git** (`git status` confirms — never committed). That's good: it means there's no git-history cleanup problem yet, but only if the redaction step below happens *before* anything under `assets/` or a copy of it is ever `git add`ed.
- **Redact before publishing — do not skip this.** The source PDF's header contains the phone number `+91-9435685646` in selectable text. Copying it into `client/public/` unmodified would put the phone number back on the live site via direct download, which directly contradicts the "remove the phone number" instruction even though nothing in the HTML/component code would show it.
  1. Produce a redacted copy with the phone number removed — re-export from whatever source document produced the PDF (Word/Google Docs/LaTeX/Canva/etc.) without the phone field, rather than visually covering it in a PDF editor. A black box or white-out patch over the text does **not** remove the underlying text layer — it's still there, selectable and copy-pasteable, under the patch.
  2. Verify by extracting text from the redacted PDF (e.g. re-run it through the same read/parse step used in §6) and confirming no phone-number pattern remains anywhere in it.
  3. Only the verified, redacted PDF gets copied to `client/public/resume.pdf`.
- Keep the unredacted `assets/CV_Ashutosh_Kumar_Mandal.pdf` **out of git** — either add `assets/` to `.gitignore` (if it should stay a local-only working copy) or delete it from the working tree once the redacted `client/public/resume.pdf` exists and has been verified. Either way, never let the unredacted version reach a commit — once it's in git history, redacting the working copy later doesn't remove it from history, and rewriting history to scrub it is a separate, disruptive operation that shouldn't be needed if this is done in the right order.
- `client/public/resume.pdf` (Vite serves `public/` at the site root, so it resolves to `/resume.pdf` in both dev and the GitHub Pages build).
- Wire `Navbar.tsx`'s "Download CV" button to `<a href="/resume.pdf" download rel="noopener noreferrer">`.
- Since this is a personal site under a `username.github.io` repo, the final URL is `https://ashutosh-iitg.github.io/resume.pdf` — stable, no redirects needed, no external link to maintain.
- The same redacted `client/public/resume.pdf` doubles as the source text for §6's content-extraction step (experience/skills/education) — no need to parse it twice from two different files, but re-verify the phone-number grep from §6 against it anyway as a second check.

## 12. Design system implementation order (do this before building pages)

1. Pick and load the two-typeface pairing (§3) — self-host or use a privacy-respecting font loading approach (no more than 2 families per `web/performance.md`), set up `font-display: swap`.
2. Replace `theme.json` and the CSS custom properties in `index.css` with the grayscale token set — background, foreground, muted, border, ring, all as grayscale HSL/OKLCH steps. Delete the "tint"/teal primary entirely.
3. Force dark-mode-only: since the brief is "keep only a black and white ... dark mode," decide whether to keep the light/dark toggle at all (a true light mode is out of scope per the request) or remove `ModeToggle` and hardcode `dark` on `<html>`. Recommendation: remove the toggle — it's dead UI once only one mode is offered, and a hidden toggle for a mode that doesn't exist would confuse users. Flag this as worth a quick confirm with the user since it's a visible feature removal.
4. Establish spacing/motion tokens once, reuse everywhere (per `web/coding-style.md`'s CSS custom properties guidance) rather than re-deriving Tailwind spacing per component.

## 13. SEO / meta

- `client/index.html`: real `<title>`, meta description, Open Graph tags, favicon (matching the monochrome identity — e.g. a simple geometric mark, not a generic default).
- `robots.txt` and a minimal `sitemap.xml` under `client/public/` since this is a fully static, crawlable site.
- No JSON-LD `Person` schema with a phone number — if structured data is added, scrub it exactly like everything else (Open Item #5).

## 14. Accessibility checklist (WCAG 2.2 AA, per `web/accessibility` skill and `react/security.md`)

- Verify contrast ratios on the actual chosen grayscale tokens, not assumed — pure black/white passes trivially, but any mid-gray-on-black text (muted copy, timestamps) needs an explicit contrast check.
- Keyboard navigation across the whole site, including the loader (must not trap focus) and the Doom game (documented as an exception per §9, not silently inaccessible).
- Visible focus states — the monochrome constraint makes this easy to get right (a simple outline/underline) or easy to get wrong (an invisible focus ring on a black background) — test it explicitly.
- `prefers-reduced-motion` respected by: the loader (§8), page-section reveal animations, and the Doom game's screen-shake/motion effects if any are added.
- Semantic HTML per `web/coding-style.md`: `<header>`/`<nav>`/`<main>`/`<footer>`, proper heading hierarchy (currently `Hero.tsx` uses an `h1`, section components use `h2` — preserve that structure through the rebuild).

## 15. Performance budget

- Landing page JS budget: <150kb gzipped (per `web/performance.md`). The loader and the Doom game are the two components most likely to blow this — both must be dynamically imported / code-split, never bundled into the main chunk.
- Explicit dimensions on all images (once real photos/screenshots exist) to avoid CLS.
- Run Lighthouse against the deployed build before calling this done; target the Core Web Vitals table in `web/performance.md` (LCP <2.5s, INP <200ms, CLS <0.1).

## 16. Testing plan (per `web/testing.md`)

- Visual regression screenshots at 320/768/1024/1440 for the home page, both the loader mid-animation and post-animation states, and the Doom game's initial render.
- Playwright E2E: home page loads and all in-page anchors scroll correctly; `/doom` loads and responds to a keypress; the resume link resolves to a real file (not a 404); the contact form's client-side validation blocks an empty submit.
- Automated accessibility check (axe or equivalent) on `/` and `/doom`.
- Keep the existing `tsc` check (`npm run check`) green throughout — this repo already has one.

## 17. Deployment

- No changes needed to the `gh-pages`-based deploy flow beyond removing the now-dead server build step from `package.json`'s `build` script (§5). Confirm `npm run build && npm run deploy` produces a working static site with no console errors before considering this plan complete.

## 18. Execution phases (suggested order — each phase should be independently shippable/revertable)

1. **Cleanup**: remove Express/Drizzle/Postgres stack, fix `package.json` scripts, delete dead files (§5).
2. **Design system**: grayscale tokens, typography pairing, dark-mode-only decision (§12).
3. **Content pipeline scaffolding**: typed `data/` files with empty/placeholder-but-clearly-marked content (§6), so the structure is ready the moment the CV lands.
4. **CV ingestion**: once the CV is on the branch, populate `data/`, scrub the phone number, resolve Open Items #2–#4.
5. **Page rebuild**: reorganize components into feature folders (§7), rebuild each section against the new design system and real data.
6. **Loader**: build Path A (§8), evaluate, decide on Path B.
7. **Doom easter egg**: build the MVP raycaster (§9), wire it into Projects + its own route.
8. **Contact**: strip the old backend, wire the static form + mailto fallback (§10), add resume link (§11).
9. **SEO/meta + accessibility + performance pass** (§13–§15).
10. **Testing** (§16), then **deploy** (§17).

## 19. Definition of done

- [ ] No color anywhere except grayscale (verify by inspecting computed styles, not just visual glance).
- [ ] No phone number anywhere — including inside the published `/resume.pdf` file itself, not just the page's HTML/data (grep the PDF's extracted text as the final check, per §11).
- [ ] The unredacted `assets/CV_Ashutosh_Kumar_Mandal.pdf` never entered git history (either gitignored or deleted after redaction — confirm via `git log --all -- assets/` before considering this done).
- [ ] Resume link resolves to a real, redacted PDF at `/resume.pdf`.
- [ ] Emissary and Doom both appear in Projects with real (non-placeholder) descriptions.
- [ ] GitHub contribution chart on the Hero section points at the real handle (`ashutosh-iitg`) and uses a grayscale color, not the placeholder teal.
- [ ] Loader plays on cold load, respects reduced motion, never blocks interaction indefinitely.
- [ ] Doom easter egg is playable end-to-end on desktop from both entry points.
- [ ] Contact form either sends successfully via Formspree or offers a working `mailto:` fallback — never a silently broken submit.
- [ ] `npm run check` passes; `npm run build` produces no server-dependent code; Lighthouse meets the targets in §15.
- [ ] Site deployed via `npm run deploy` and manually verified live on GitHub Pages.
