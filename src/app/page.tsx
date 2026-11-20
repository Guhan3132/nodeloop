import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { HeroComposer } from "@/components/HeroComposer";
import { PixelScene } from "@/components/PixelScene";
import { JsonLd } from "@/components/JsonLd";
import { categories, LATEST_RELEASE, patterns } from "@/registry";
import { sampleThemes } from "@/theme/samples";
import { REPO_URL, SITE_URL } from "@/lib/site";

const homeJsonLd = [
  { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Nodeloop", description: "Live, copyable UX patterns for AI agents." },
  {
    "@type": "SoftwareSourceCode",
    "@id": `${SITE_URL}/#source`,
    name: "Nodeloop",
    description: "Open-source React components for AI agent UIs: streaming, trust, approval, planning, chat and input.",
    codeRepository: REPO_URL,
    license: "https://opensource.org/licenses/MIT",
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    url: SITE_URL,
  },
];

const features = [
  {
    title: "Live and breakable",
    body: "Every pattern runs as a simulation with its failure states. Click, stop and retry, then copy the code.",
  },
  {
    title: "Your brand in one hex",
    body: "Paste a colour and every component re-themes in light and dark, with contrast checked.",
  },
  {
    title: "Accessible by default",
    body: "Automated axe checks run in CI on every pattern. Keyboard, screen reader and reduced motion are covered.",
  },
];

const steps = [
  { title: "Pick a pattern", body: "Try it live, break it, and read when to use it and when not to." },
  { title: "Install with one command", body: "The shadcn CLI puts one file in your project. You own it, and there is no package to keep updated." },
  { title: "Make it yours", body: "Paste your brand colour, connect it to your agent, or start from the AI SDK example." },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />

      {/* Full-width pixel scene behind the intro and the composer. The scene is decoration; the text and composer carry the meaning. */}
      <section className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
        <PixelScene className="absolute inset-0 -z-10 h-full w-full" />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-12 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80">
            v{LATEST_RELEASE} · {patterns.length} patterns · MIT
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            The UI patterns your AI agent is missing
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Streaming, approval, plans, sources and permissions as copy-paste React components. Live in the browser, themed with one hex colour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-started" className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:py-2.5">
              Get started
            </Link>
            <Link href="#patterns" className="rounded-lg border border-input bg-background px-5 py-3 text-sm font-medium hover:bg-muted/60 sm:py-2.5">
              Browse {patterns.length} patterns
            </Link>
          </div>
          <div className="mt-7 w-fit max-w-full overflow-x-auto whitespace-nowrap rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-[13px] text-foreground/80">
            npx shadcn@latest add &quot;{SITE_URL}/r/approval-step.json&quot;
          </div>
        </div>

        <div className="mx-auto mt-auto w-full max-w-2xl px-3 pb-8 pt-16 sm:pb-12">
          <HeroComposer />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <p className="text-sm font-medium text-primary">Why Nodeloop</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Patterns that behave, not screenshots</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-background p-7">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <p className="text-sm font-medium text-primary">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">From idea to your repo in three steps</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title}>
              <p className="text-sm font-semibold text-primary">{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-24">
        <Gallery patterns={patterns} categories={categories} />
      </div>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="grid items-center gap-12 rounded-2xl border border-border bg-background p-8 sm:p-14 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-primary">Theming</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Paste one hex. Everything follows.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Light and dark, status colours, focus rings and contrast are derived and checked for you.
            </p>
            <Link href="/tokens" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Try the brand colour
            </Link>
          </div>
          <div className="flex items-center gap-3" aria-hidden>
            {sampleThemes.slice(0, 5).map((t) => (
              <span key={t.id} className="size-10 rounded-full" style={{ background: t.hex }} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 pt-24 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Build the agent screen users trust</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/get-started" className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:py-2.5">
            Get started
          </Link>
          <a href={REPO_URL} className="rounded-lg border border-input bg-background px-5 py-3 text-sm font-medium hover:bg-muted/60 sm:py-2.5">
            Star on GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
