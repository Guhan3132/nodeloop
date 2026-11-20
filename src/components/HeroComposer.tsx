"use client";

import { useRouter } from "next/navigation";
import { PromptComposer } from "@/registry/prompt-composer/prompt-composer";
import { sendToPlayground } from "@/lib/handoff";

const STARTERS = [
  { title: "Plan a team offsite", prompt: "Plan a team offsite for 8 people under $3k." },
  { title: "Find venues in Lisbon", prompt: "Find venues in Lisbon for 8 people." },
  { title: "Draft a reply to Sam", prompt: "Draft a reply to Sam about Tuesday's sync." },
];

/**
 * The home page's real prompt composer. Sending a message, or picking a starter, opens the Playground with it.
 * The Playground is scripted, so every message runs a demo flow and no model is called.
 */
export function HeroComposer() {
  const router = useRouter();

  const open = (text: string) => {
    const prompt = text.trim();
    if (!prompt) return;
    sendToPlayground(prompt);
    router.push("/playground");
  };

  return (
    <div>
      <PromptComposer placeholder="Ask anything, or try a starter" onSubmit={(m) => open(m.text)} />
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {STARTERS.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => open(s.prompt)}
            className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/80 hover:border-foreground/30"
          >
            {s.title}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Enter opens the Playground. It runs a scripted demo, so no model is called.
      </p>
    </div>
  );
}
