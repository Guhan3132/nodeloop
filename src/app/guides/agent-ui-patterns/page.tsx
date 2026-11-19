import type { Metadata } from "next";
import Link from "next/link";
import { categories, categoryInfo, patterns } from "@/registry";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const path = "/guides/agent-ui-patterns";
const title = "UX patterns for AI agents: a practical guide";
const description = "How to design the interface for an AI agent: streaming, trust, approval, planning, chat and input, with the patterns that cover each one.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "article", title: `${title} · Nodeloop`, description, url: path },
  twitter: { card: "summary_large_image", title: `${title} · Nodeloop`, description },
};

export default function AgentUiPatternsGuide() {
  return (
    <main className="pb-24 pt-8">
      <JsonLd
        data={[
          {
            "@type": "Article",
            headline: title,
            description,
            url: `${SITE_URL}${path}`,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            author: { "@type": "Organization", name: "Nodeloop", url: SITE_URL },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Patterns", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Guide", item: `${SITE_URL}${path}` },
            ],
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Patterns
          </Link>
        </nav>

        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          An AI agent is a new kind of product surface. It works for a while without being watched, it can be wrong with confidence, and it
          sometimes needs a person to decide. The interface has to cover four jobs: how answers arrive, why to believe them, what the agent
          does, and what the person controls. Each job has patterns that work well, and this guide walks through them.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">Start with what the person needs to know</h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          Before choosing components, ask what the person must know at each moment. While an answer is forming, they need to know it is
          working and can stop it. When an answer arrives, they need to know how far to trust it. Before the agent acts, they need to
          approve anything they cannot undo. After it acts, they need to see what happened. Most agent UI problems come from answering one of
          these questions with a component meant for another.
        </p>

        {categories.map((category) => {
          const inCategory = patterns.filter((p) => p.category === category);
          return (
            <section key={category} aria-labelledby={`cat-${category}`} className="mt-12">
              <h2 id={`cat-${category}`} className="text-2xl font-semibold">
                {category}
              </h2>
              <p className="mt-3 leading-relaxed text-foreground/80">{categoryInfo[category]}</p>
              <ul className="mt-5 space-y-4">
                {inCategory.map((p) => (
                  <li key={p.slug} className="rounded-xl border border-border bg-card p-5">
                    <Link href={`/components/${p.slug}`} className="font-medium text-foreground underline-offset-4 hover:underline">
                      {p.title}
                    </Link>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2 className="mt-14 text-2xl font-semibold">Accessibility applies to agents too</h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          Streaming text, status changes and background work can flood a screen reader. Announce the things that change a decision, such as
          an approval request, a failure or a finished answer, and keep routine progress quiet. Make every status a word, not only a colour,
          and keep every control reachable from the keyboard. Each component page lists its own accessibility notes.
        </p>

        <h2 className="mt-14 text-2xl font-semibold">Copy the patterns, then make them yours</h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          Every pattern is open source and runs as a live demo first. Copy the prompt from a component page into your coding agent, and it
          adds the component to your project and fits it to your theme. Read the do and don&apos;t lists before you change behaviour, because
          most of the value is in the defaults: which action is safe, how much detail to show, and when to ask.
        </p>

        <p className="mt-14">
          <Link href="/#patterns" className="font-medium text-foreground underline-offset-4 hover:underline">
            Browse all {patterns.length} patterns
          </Link>
        </p>
      </article>
    </main>
  );
}
