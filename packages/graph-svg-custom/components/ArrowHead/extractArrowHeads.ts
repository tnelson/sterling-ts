import { ArrowDef } from '@/graph-svg';
import { CSSProperties } from 'react';
import { arrowheadId } from './arrowheadId';

export function extractArrowHeads(styles: CSSProperties[]): ArrowDef[] {
  const ids = new Set<string>();
  const defs: ArrowDef[] = [];
  styles.forEach((style) => {
    const size = 10;
    const id = arrowheadId(size, style);
    if (!ids.has(id)) {
      ids.add(id);
      defs.push({ size, style });
    }
  });
  return defs;
}
