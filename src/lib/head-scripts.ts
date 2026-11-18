/**
 * Tiny scripts that run in <head> before the first paint, so there is no flash of the wrong theme or
 * brand colour. Plain strings in a server-safe module, so the layout can inline them.
 */

export const THEME_KEY = "nodeloop:theme";
export const BRAND_KEY = "nodeloop:brand";
export const BRAND_CSS_KEY = "nodeloop:brand-css";
export const SAVED_KEY = "nodeloop:saved";
/** Bump when the brand maths or the stored format changes: older saved CSS is then ignored and re-derived. */
export const BRAND_CSS_VERSION = 2;
export const BRAND_STYLE_ID = "nodeloop-brand";

/**
 * The site was called Agentic UI (keys "agentic-ui:") until 0.6.0 and Looply ("looply:") until 0.9.0.
 * Move each old setting to its "nodeloop:" key once, newest name first and without overwriting
 * anything already saved, so nobody loses their theme, brand colour or saved patterns.
 */
const NAMES = [THEME_KEY, BRAND_KEY, BRAND_CSS_KEY, SAVED_KEY].map((k) => k.replace("nodeloop:", ""));
const OLD_PREFIXES = ["looply:", "agentic-ui:"];
const MIGRATE = `try{${JSON.stringify(NAMES)}.forEach(function(k){${JSON.stringify(OLD_PREFIXES)}.forEach(function(p){var o=p+k,v=localStorage.getItem(o);if(v!==null){if(localStorage.getItem("nodeloop:"+k)===null)localStorage.setItem("nodeloop:"+k,v);localStorage.removeItem(o)}})})}catch(e){}`;

/** Moves any old settings over, then applies the saved choice, or the system setting when there is none. */
export const THEME_SCRIPT = `${MIGRATE}try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

/** The saved brand CSS, only if it was written by this version of the maths. */
export const BRAND_SCRIPT = `try{var b=JSON.parse(localStorage.getItem("${BRAND_CSS_KEY}")||"null");if(b&&b.v===${BRAND_CSS_VERSION}&&b.css){var s=document.createElement("style");s.id="${BRAND_STYLE_ID}";s.textContent=b.css;document.head.appendChild(s)}}catch(e){}`;
