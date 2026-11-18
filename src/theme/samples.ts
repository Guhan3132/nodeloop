/** The sample brand colours shown on the site and shipped as installable presets. */
export type SampleTheme = { id: string; name: string; hex: string; note?: string };

export const sampleThemes: SampleTheme[] = [
  { id: "blue", name: "Blue", hex: "#2563eb", note: "Looply's colour, the site default" },
  { id: "graphite", name: "Graphite", hex: "#18181b", note: "Close to the neutral install default" },
  { id: "violet", name: "Violet", hex: "#7c3aed" },
  { id: "indigo", name: "Indigo", hex: "#4f46e5" },
  { id: "teal", name: "Teal", hex: "#0d9488" },
  { id: "green", name: "Green", hex: "#16a34a" },
  { id: "amber", name: "Amber", hex: "#d97706" },
  { id: "orange", name: "Orange", hex: "#ea580c" },
  { id: "pink", name: "Pink", hex: "#db2777" },
  { id: "navy", name: "Navy", hex: "#1e3a8a" },
];

export const DEFAULT_BRAND = sampleThemes[0].hex;
