/**
 * Longer guidance for each pattern: when to reach for it, the mistakes teams make, and what to check.
 * Shown on the component page under the summary. Keep each entry to a few short paragraphs.
 */
export const guidance: Record<string, string[]> = {
  "streaming-response": [
    "Use this for any answer that takes more than a second or two to finish. Tokens that arrive as they are written tell the person the agent is working, and the Stop button lets them cut a slow or wrong answer short. Pair it with the activity line when the agent is also calling tools, so a quiet minute between tokens still looks alive.",
    "The most common mistake is to throw away partial text when the connection drops. Keep what arrived, mark it as incomplete, and offer Retry. Another is a spinner that never says what is happening; one line with a timer is enough. Avoid animating the text itself, because people read the words while they arrive and a moving caret or fade slows them down.",
    "Screen readers should not announce every token. Put the final text in a live region only when the answer completes, and keep the activity status polite so it does not interrupt.",
  ],
  "confidence-badge": [
    "Use this when an answer could be wrong in a way that matters: a price, a date, a medical or legal reading, a number pulled from several sources. The badge sets the reader's expectation before they act, and the reason tells them what to check.",
    "Do not show a percentage without a reason. A bare 64% invites guessing about what it means, while a short sentence about conflicting sources tells the person exactly what to verify. Also avoid a badge on every line of a reply; it becomes noise. Attach it to the claim that carries the risk.",
    "Colour should never be the only signal. Pair the level with a word and an icon, and make the reason readable by screen readers as part of the badge's name, not only as a tooltip.",
  ],
  "approval-step": [
    "Use this before any action the agent cannot undo or that touches other people: sending a message, moving money, deleting files, changing a live setting. Scale the friction to the risk. A read-only lookup needs no approval, a reversible edit needs one tap, and an irreversible action needs a deliberate confirmation.",
    "The common mistake is asking for approval on everything. People then click through without reading, and the dangerous step gets no more attention than the safe ones. Keep low-risk steps fast and put the focus on the safe choice by default. Do not hide what will happen behind a vague 'Continue'; name the action and its effect.",
    "Make the decision reachable from the keyboard, announce the outcome once it is made, and keep the approve and reject buttons clearly separate so a mis-tap is hard to make on a phone.",
  ],
  "tool-timeline": [
    "Use this when an agent runs several tools and people need to know what it did afterwards: searches, file changes, API calls. The timeline turns a hidden sequence into a short record that someone can scan in seconds, and it is the first place to look when a result seems wrong.",
    "Show real outcomes, not just the names of the tools. 'Searched the docs: 0 results' explains more than a green tick. Do not hide failures to make the run look clean; a failure followed by a recovery builds more trust than a flawless-looking list. Keep long outputs folded so the sequence stays readable.",
    "Each step needs a label that a screen reader can read in order, and the status (running, done, failed) must be text, not only a colour or icon.",
  ],
  "plan-preview": [
    "Use this when an agent is about to take several steps and the person should agree to the plan first. Reviewing a plan is cheaper than undoing an action, and editable steps give the agent better instructions than a vague prompt would.",
    "Do not make the plan a wall of text the person must read in full before they can press a button. Keep each step to one line, let them remove or reorder steps, and show a clear start action. Once the plan runs, the same view should become a checklist with progress, so the person can see what is done and what is next without opening a log.",
    "Keep the reorder and remove controls available without drag and drop, using buttons with clear labels, so the plan can be edited by keyboard and by touch.",
  ],
  "prompt-composer": [
    "Use this as the input for any agent chat, especially when people need slash commands, mentions of files or people, or a switch between models and modes. It keeps the common path to one field and moves the rest to small controls one tap away.",
    "The usual mistake is hiding the mode and model in a settings page, so people do not know what they are talking to. Keep them visible under the box. Another is blocking input while the agent works; let people steer or stop the run from the same field, and turn the send button into a stop button while the agent is busy.",
    "The composer must work on phones, where voice and the on-screen keyboard matter. Make every menu reachable by keyboard, announce the list of commands when it opens, and keep the text field's label and the send action distinct.",
  ],
  "chat-thread": [
    "Use this for the conversation itself: the messages between a person and an agent, with references, files and hand-offs. Most of the quality is in the details. Plain text under the agent's name reads like a document, while the person's messages sit in a soft bubble with the time under it.",
    "Common mistakes are formatting every reply as a bubble, which makes long answers hard to read, and burying feedback. Feedback should be one tap, and only a thumbs-down should ask why. Mark the start of unread messages and the date changes, so a returning person knows where they left off.",
    "New messages should be announced politely, not every token of a reply. Keep the scroll position stable when older messages load, and make sure the thread can be read top to bottom by a screen reader.",
  ],
  "error-recovery": [
    "Use this whenever a request can fail: dropped connections, rate limits, timeouts, declined requests. A red banner that says 'Something went wrong' leaves people guessing whether their work is gone, so say what failed and what was kept.",
    "Retry transient errors automatically, but show a countdown and let people cancel it. After the last attempt, offer a real alternative, such as trying a smaller request or switching to a person, rather than a retry button that will fail again. Do not retry errors that will not change, such as a declined request, because that only wastes the person's time.",
    "Announce the error once, in plain words, and move focus to the message or the first recovery action so keyboard and screen reader users do not have to search for it.",
  ],
  "citations": [
    "Use this when an answer rests on sources: documents, search results, data. Numbered citations let a reader check the one claim they doubt, and opening the exact quote makes checking quick.",
    "A list of links at the bottom of an answer proves little, because nobody knows which claim each link backs. Do not show a source that the answer does not actually use. Mark any claim without a source as unsourced, so the answer never looks more certain than it is. Keep the reasoning folded away until someone asks for it.",
    "Each citation marker needs an accessible name that says what it points to, not just a number. The quoted text must be reachable by keyboard, and the unsourced flag must be text, not only a colour.",
  ],
  "agent-memory": [
    "Use this when an agent stores facts about a person across sessions. People need to see what is remembered, correct it and switch it off. An agent that remembers quietly feels like surveillance, and one that forgets feels broken, so the memory has to be visible.",
    "Do not save new memories silently. Offer each one with a clear yes or no, and write each fact as a plain sentence that says where it was learned. Give people a few seconds to undo a mistake, and provide one switch that turns memory off completely.",
    "The list of memories should be a normal, navigable list with each item's actions labelled, so a keyboard or screen reader user can edit or forget a single fact without finding a hidden menu.",
  ],
  "human-handoff": [
    "Use this when the agent cannot help and a person must take over. This is the moment people are most annoyed, and making them repeat themselves doubles the annoyance. A good hand-off carries the context with it.",
    "Show what the person will see before they agree to wait. Replace an endless spinner with a real queue position and an estimate. Let people leave or switch to email, and say up front when the team is offline rather than leaving them in a queue that will not move. When a person joins, they should already have the summary.",
    "The status changes (waiting, connected, offline) must be announced once each, and the option to leave must stay reachable while the person waits.",
  ],
  "tool-permissions": [
    "Use this for any agent with tools that can change things: sending mail, moving events, deleting files. People cannot judge a raw list of function names, so describe each tool in one sentence and say what it can break.",
    "Start from safe defaults: reads allowed, changes that ask first, deletes blocked. Avoid the opposite trap of asking about everything, which trains people to approve without reading. When the agent asks for a tool it was not given, offer three answers (once, always, no) so the person can decide how far to trust it.",
    "Each permission row needs a label that names the tool and its effect, and the three answers should be real buttons, not a dropdown hidden behind a click.",
  ],
  "multi-agent-status": [
    "Use this when several agents run at once and the question is whether anything needs the person. A list of agents with their progress is less useful than one that puts the blocked and failed ones first.",
    "Say why each agent is waiting, in one plain line, so a glance is enough. Do not announce every progress tick to a screen reader; only the summary changes that matter should be spoken, otherwise the status becomes a constant interruption.",
    "Sort order and status should be exposed as text. Keep the list navigable by keyboard, and make the waiting reason part of each row's accessible name.",
  ],
};

/**
 * Titles for search results and social cards. The on-page heading keeps the short name; these add
 * the words people search for. Shown as "<title> · Nodeloop" in the browser tab.
 */
export const searchTitles: Record<string, string> = {
  "streaming-response": "Streaming response: streaming text UI for AI agents",
  "confidence-badge": "Confidence badge: show how sure an AI answer is",
  "approval-step": "Approval step: human-in-the-loop UI for AI agents",
  "tool-timeline": "Tool call timeline: show what an AI agent did",
  "plan-preview": "Plan preview: review an AI agent's plan before it runs",
  "prompt-composer": "Prompt composer: chat input for AI agents",
  "chat-thread": "Chat thread: conversation UI for AI agents",
  "error-recovery": "Error recovery: retry and fallback UI for AI agents",
  citations: "Citations: source references for AI answers",
  "agent-memory": "Agent memory: review and edit what an AI remembers",
  "human-handoff": "Human handoff: pass an AI chat to a person",
  "tool-permissions": "Tool permissions: control what an AI agent can do",
  "multi-agent-status": "Multi-agent status: monitor several AI agents",
};
