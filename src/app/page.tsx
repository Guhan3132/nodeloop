import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { Logo } from "@/components/Logo";
import { HeroDemo } from "@/components/HeroDemo";
import { PixelField } from "@/components/PixelField";
import { categories, patterns } from "@/registry";
import { JsonLd } from "@/components/JsonLd";
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

export default function Home() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-10 sm:pb-20 sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card py-1 pl-1 pr-3 text-xs font-medium text-foreground/80">
          <Logo size={20} />
          {patterns.length} patterns, MIT licensed
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold sm:text-6xl">Agent UI patterns you can click, break and copy</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Open-source React components that show how a good agent behaves: streaming, trust, approval and input. Every one runs as a live
          simulation, in light and dark, on desktop and mobile.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#patterns" className="rounded-lg border border-input bg-card px-5 py-3 text-sm font-medium hover:bg-muted/60 sm:py-2.5">
            Browse patterns
          </Link>
          <Link href="/playground" className="rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-foreground/85 sm:py-2.5">
            Try the full flow
          </Link>
        </div>

        {/* Banner with a live composer. Only the background is clipped, so the menus of the composer can open freely. */}
        <div className="relative mt-12 h-[24rem] sm:h-[36rem]">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <PixelField className="h-full w-full" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-x-3 bottom-4 mx-auto max-w-2xl sm:inset-x-6 sm:bottom-10">
            <HeroDemo />
          </div>
        </div>
      </section>

      <Gallery patterns={patterns} categories={categories} />
    </main>
  );
}
