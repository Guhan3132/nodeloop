import { ImageResponse } from "next/og";
import { LogoOg } from "@/components/Logo";

// The 1280x640 image for the GitHub repo's "Social preview" setting. Not linked from the site.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 100, background: "#ffffff", color: "#18181b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <LogoOg size={58} color="#18181b" />
          <div style={{ fontSize: 52, fontWeight: 600, letterSpacing: -1.6 }}>nodeloop</div>
        </div>
        <div style={{ marginTop: 44, fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>UX patterns for AI agents you can feel.</div>
        <div style={{ marginTop: 30, fontSize: 34, color: "#52525b" }}>Open-source React components. Live, copyable, shadcn-ready.</div>
      </div>
    ),
    { width: 1280, height: 640 },
  );
}
