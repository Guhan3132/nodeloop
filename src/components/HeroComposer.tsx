"use client";

import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { ArrowUp, MessageSquare, Sparkles } from "lucide-react";
import { sendToPlayground } from "@/lib/handoff";

const STARTERS = [
  { title: "Plan a team offsite", prompt: "Plan a team offsite for 8 people under $3k." },
  { title: "Find venues in Lisbon", prompt: "Find venues in Lisbon for 8 people." },
  { title: "Draft a reply to Sam", prompt: "Draft a reply to Sam about Tuesday's sync." },
];

/**
 * The home page's own composer. It is site-only, not the registry PromptComposer, so the published pattern is unchanged.
 * Enter sends, Shift+Enter adds a line. Sending, or picking a starter, opens the Playground with the message.
 * The Playground is scripted, so no model is called.
 */
export function HeroComposer() {
  const router = useRouter();
  const [text, setText] = useState("");

  const open = (value: string) => {
    const prompt = value.trim();
    if (!prompt) return;
    sendToPlayground(prompt);
    router.push("/playground");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends; Shift+Enter is a new line; Enter while an IME is composing is left alone.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      open(text);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          open(text);
        }}
        className="rounded-[18px] border border-border bg-background px-4 pb-3 pt-4 shadow-sm focus-within:border-ring/50"
      >
        <label htmlFor="hero-message" className="sr-only">
          Message
        </label>
        <textarea
          id="hero-message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          placeholder="For example: plan a team offsite for 8 people under $3k"
          className="block min-h-[56px] w-full resize-none bg-transparent text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-[16px]"
        />
        <div className="mt-1 flex justify-end">
          <button
            type="submit"
            disabled={!text.trim()}
            aria-label="Send message"
            className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            <ArrowUp size={18} aria-hidden />
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {STARTERS.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => open(s.prompt)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3.5 text-sm text-foreground/80 hover:border-foreground/30 pointer-coarse:min-h-11"
          >
            <Sparkles size={14} className="text-primary" aria-hidden />
            {s.title}
          </button>
        ))}
        <button
          type="button"
          onClick={() => router.push("/playground")}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-border bg-background px-3.5 text-sm text-muted-foreground hover:text-foreground pointer-coarse:min-h-11"
        >
          <MessageSquare size={14} aria-hidden />
          Open chat
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">Enter opens the Playground. It runs a scripted demo, so no model is called.</p>
    </div>
  );
}
