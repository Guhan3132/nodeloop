import { useId, type CSSProperties, type ReactNode } from "react";
import { deriveTheme, themeCss } from "./derive";

export * from "./derive";

/**
 * Brand theming for Nodeloop. Give it one hex colour and it works out the three tokens a brand
 * touches (primary, primary-foreground, ring) for light and dark, and checks them for contrast:
 *
 *   <NodeloopTheme brand="#7c3aed">...components...</NodeloopTheme>
 *
 * or, without a wrapper, paste the CSS it produces into your global stylesheet:
 *
 *   console.log(themeCss(deriveTheme("#7c3aed")))
 *
 * Status colours (success, warning, danger) and neutrals are never changed by the brand.
 * Needs only React and the derive file that comes with it.
 */

type Props = {
  /** Any CSS colour: hex, rgb(), hsl() or oklch(). */
  brand: string;
  tintNeutrals?: boolean;
  /** "white" keeps white text on buttons and darkens the button colour until it passes AA. */
  textColor?: "auto" | "white";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Applies a brand colour to everything inside it. Components follow the nearest `.dark` class, as
 * usual, so light and dark both work. An invalid colour changes nothing.
 */
export function NodeloopTheme({ brand, tintNeutrals, textColor, className, style, children }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const theme = deriveTheme(brand, { tintNeutrals, textColor });
  const scope = `[data-nodeloop-theme="${id}"]`;
  return (
    <div data-nodeloop-theme={id} className={className} style={style}>
      {theme && <style>{themeCss(theme, { light: `${scope}, ${scope} .light, .light ${scope}`, dark: `.dark ${scope}, ${scope}.dark, ${scope} .dark` })}</style>}
      {children}
    </div>
  );
}

/** @deprecated The Looply name (0.7.0 and 0.8.0). Renamed to NodeloopTheme in 0.9.0; kept so existing imports keep working. */
export const LooplyTheme = NodeloopTheme;

/** @deprecated The Agentic UI name (before 0.7.0). Kept so existing imports keep working. */
export const AgenticTheme = NodeloopTheme;
