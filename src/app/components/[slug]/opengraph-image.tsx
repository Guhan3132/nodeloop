import { ImageResponse } from "next/og";
import { LogoOg } from "@/components/Logo";
import { getPattern, patterns } from "@/registry";
import { SITE_HOST } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nodeloop pattern";

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPattern((await params).slug);
  const title = p?.title ?? "Nodeloop";
  const summary = p?.summary ?? "UX patterns for AI agents";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#ffffff", color: "#18181b" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <LogoOg size={44} color="#18181b" />
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.2 }}>nodeloop</div>
          </div>
          {p && (
            <div style={{ display: "flex", fontSize: 26, color: "#52525b", border: "2px solid #e4e4e7", borderRadius: 999, padding: "8px 22px" }}>{p.category}</div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 36, lineHeight: 1.3, color: "#52525b", maxWidth: 980 }}>{summary}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#71717a" }}>{SITE_HOST}</div>
      </div>
    ),
    size,
  );
}
