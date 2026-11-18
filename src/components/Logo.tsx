/**
 * The Looply mark: an open loop with the agent node in the gap. It has no background and takes the
 * text colour; the node is Loop Blue. Below 24px pass `mono` so the node takes the text colour too.
 */
export function Logo({ size = 24, mono = false, className }: { size?: number; mono?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="12 11 42 42" fill="none" role="img" aria-label="Looply" className={className}>
      <path d="M32 17A15 15 0 1 0 47 32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="47" cy="17" r="4" fill={mono ? "currentColor" : "#2563EB"} />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );
}

/** The mark as plain JSX for next/og images, which cannot use client components or currentColor. */
export function LogoOg({ size, color = "#111113" }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="12 11 42 42" fill="none">
      <path d="M32 17A15 15 0 1 0 47 32" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <circle cx="47" cy="17" r="4" fill="#2563EB" />
      <circle cx="32" cy="32" r="4" fill={color} />
    </svg>
  );
}
