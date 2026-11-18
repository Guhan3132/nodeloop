import { ImageResponse } from "next/og";
import { LogoOg } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so this is a full white square with the mark centred.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        <LogoOg size={112} />
      </div>
    ),
    size,
  );
}
