/**
 * Passes a message from the home page composer to the Playground. It goes through sessionStorage, not the URL,
 * so the text stays out of browser history, server logs and shared links. The Playground takes it once.
 */
const KEY = "nodeloop:playground-prompt";

export function sendToPlayground(prompt: string) {
  try {
    sessionStorage.setItem(KEY, prompt);
  } catch {
    /* storage blocked: the Playground opens empty */
  }
}

/** Reads and removes the message, so a reload or a second mount does not run it again. */
export function takeFromHome(): string | null {
  try {
    const value = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return value;
  } catch {
    return null;
  }
}
