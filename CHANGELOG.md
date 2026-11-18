# Changelog

## 0.8.0 (2026-11-18)

- Loop Blue is the default primary colour everywhere: `primary` and `ring` are #2563eb (`oklch(0.5461 0.2152 262.88)`) in light and dark, with white button text at 5.17:1. Installing a pattern adds these only if your project has no `--primary` yet, so an existing theme is never changed. For the old neutral look, install `theme-graphite`
- The favicon is the bare loop with no tile: ink on a light browser tab, white on a dark one. The Apple touch icon keeps its white square, because iOS needs one
- The GitHub repo is now github.com/Guhan3132/looply. The old Agentic-Component URL redirects there
- The site moves to https://looply-ui.vercel.app, and install URLs use it. https://agentic-component.vercel.app keeps serving the same site and registry, so install commands you already copied keep working

## 0.7.0 (2026-11-18)

Finishes the rename from Agentic UI to Looply.

- `AgenticTheme` is now `LooplyTheme`, and the brand helper installs as `components/ui/looply-theme.tsx` and `lib/looply-theme-derive.ts`. `AgenticTheme` still works as an alias. Files you installed before keep working; delete the old `agentic-theme` files if you reinstall `theme-brand`
- The wrapper's attribute is now `data-looply-theme` (was `data-agentic-theme`). Update any CSS that targets it
- Registry name `looply`, and the DTCG export's extension key is now `dev.looply` (was `dev.agentic-ui`)
- The site stores settings under `looply:` and moves your saved theme, brand colour and saved patterns over from the old `agentic-ui:` keys on your next visit
- Package name, README, contributing guide, examples and docs use the new name. Install URLs, the GitHub repo and the site address are unchanged
- Next.js 16.4.6 (was 16.4.3), which fixes two `use cache` advisories (GHSA-mfr8-8qww-v76h, GHSA-vc7v-qv4w-wrv8). The site does not use `use cache`, so it was not exposed

## 0.6.0 (2026-11-18)

- New name and identity: Agentic UI is now Looply. The logo is an open loop with the agent node in its gap, with no background in the UI; the white tile is kept for the favicon and app icon. Social images use the new mark
- Loop Blue (#2563eb) is the site's primary colour and the brand switcher's default. Installed components keep the neutral token defaults
- Chat thread: the agent mark is the Looply loop (`AgentMark`). While the agent is typing or streaming, the node merges into the centre as one drop and pulls back out; it stays still with reduced motion. `AiStar` still works and draws the new mark

## 0.5.0 (2026-11-03)

- 19 patterns become 13: activity indicator joins streaming response, why this answer joins citations, feedback thumbs joins the chat thread, task checklist joins plan preview (now "Plan"), interrupt and steer and voice input join the prompt composer. Their components are still exported from the new files; old pages redirect and old install URLs serve the last version (0.4.0). The "Learn" category is gone
- Site-wide dark mode that follows the system, a theme toggle, the site chrome on the same tokens as the components, a new header (logo, Tokens link, Get started goes to /get-started)
- One token source (src/lib/tokens.json) for the site, the docs and the registry; contrast-safe defaults (ring, muted text, warning) checked by tests; status colours in OKLCH; danger follows --destructive
- Brand panel: live light/dark preview, any CSS colour, EyeDropper, keep white text, keyboard-friendly swatches, Copy link, debounced saving, versioned saved theme
- Tokens page follows the chosen brand, with copyable values, a contrast matrix, pinned install URLs and a DTCG export
- 404 and error pages, SITE_URL, release-dated sitemap, "Simulated" labels, category descriptions, browser support, RTL guidance, axe checks on every pattern
- A worked example with a real model (Vercel AI SDK 7): streaming text, tool calls on the timeline and a tool that waits on ApprovalStep; the activity line can now time itself
- Security: the prompt composer's image previews accept only browser-made `blob:` URLs (CodeQL alert js/xss-through-dom)

## 0.4.0 (2026-11-02)

- New patterns: task checklist and activity indicator (19 in total)
- Brand theming: one hex colour restyles every component in light and dark, with contrast checked (`AgenticTheme`, `deriveTheme`, `themeCss`)
- A Brand button on every page with 10 sample colours, a hex field, a contrast report, shareable `?brand=` links and Copy CSS
- Installable `theme-brand` helper and 10 `theme-<name>` presets in the registry
- Status colours are now tokens (`success`, `warning`, `danger`) instead of fixed Tailwind colours
- New pages: Tokens and theming, and Customising components (radius, fonts, spacing, icons, motion, wording)

## 0.3.0 (2026-11-01)

- New patterns: tool permissions, multi-agent status, voice input (17 in total)
- `npm run new-pattern` scaffolds a pattern, and docs/adding-a-pattern.md is the contributor guide
- Tests: component behaviour (Testing Library), accessibility checks on every pattern (axe) and a production-build smoke test, all in CI
- "New" badges and an "Added in" line, related patterns ranked by category and tags, a skip link, the `/` search shortcut, language labels on code blocks
- Registry: theme tokens (`cssVars`), SHA-256 checksums, pinned releases (`npm run registry:release`), a PR install check, CodeQL

## 0.2.0 (2026-11-01)

- New patterns: error recovery, citations, agent memory, human hand-off (14 in total)
- Security headers (CSP, HSTS, Permissions-Policy), a patched `sharp`, `security.txt`, and Next 16 with React 19.3
- Anonymous page-view analytics, a Get started page, and richer registry metadata (title, description, docs, installs into `components/ui`)
- Footer and About page, syntax-highlighted code, autoplaying previews, solid popovers, a logo, and per-pattern social images
- Gallery category counts and tag search; 44px touch targets on touch screens
- Lint is clean (0 warnings): the tooltip hook no longer reads a ref while rendering, and latest-value refs update in effects
- Registry consistency tests in CI, a weekly install test, Dependabot, and issue and pull request templates
- Sitemap, robots and per-page metadata

## 0.1.0

- First public release: 10 agent UX patterns, the playground, and the shadcn registry
