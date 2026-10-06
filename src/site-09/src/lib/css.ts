import type { CSSProperties } from "react";

/** Inline style object that also accepts CSS custom properties. */
export type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

export function revealDelay(ms: number): CSSVars {
  return { "--reveal-delay": `${ms}ms` };
}
