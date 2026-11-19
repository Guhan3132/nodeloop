import { Playground } from "@/components/Playground";

const description = "Try the full agent flow: streaming, tool calls, approvals and handoffs, all live in one place. Open-source React components.";

export const metadata = {
  title: "Playground",
  description,
  alternates: { canonical: "/playground" },
  openGraph: { title: "Playground · Nodeloop", description, url: "/playground" },
  twitter: { card: "summary_large_image", title: "Playground · Nodeloop", description },
};

export default function PlaygroundPage() {
  return <Playground />;
}
