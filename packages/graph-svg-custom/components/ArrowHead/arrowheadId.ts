import { CSSProperties } from "react";

export function arrowheadId(size: number, style: CSSProperties|undefined): string {
  const fill = style?.fill
  const stroke = style?.stroke
  return `arrow-${size}-${stroke?.replace('#', '')}-${fill?.replace('#', '')}`;
}
