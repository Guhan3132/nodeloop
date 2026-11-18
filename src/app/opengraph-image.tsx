import { ImageResponse } from "next/og";
import { LogoOg } from "@/components/Logo";

export const alt = "Looply: UX patterns for AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          background: "#ffffff",
          color: "#18181b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <LogoOg size={52} color="#18181b" />
          <div style={{ fontSize: 46, fontWeight: 600, letterSpacing: -1.5 }}>looply</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          UX patterns for AI agents you can feel.
        </div>
        <div style={{ marginTop: 32, fontSize: 34, color: "#52525b" }}>
          Live, copyable React components. Streaming, trust, approval, planning, chat.
        </div>
      </div>
    ),
    size,
  );
}
