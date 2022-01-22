import { SterlingTheme } from '@/sterling-theme';
import { WritableDraft } from 'immer/dist/types/types-external';

export function getRelationIsAttribute(
  theme: SterlingTheme | WritableDraft<SterlingTheme>,
  relation: string
): boolean {
  const edges = theme.edges;
  return edges
    ? edges.some(
        (spec) =>
          spec.asAttribute === true &&
          spec.targets?.some(
            (target) => target === '*' || target.relation === relation
          )
      )
    : false;
}
