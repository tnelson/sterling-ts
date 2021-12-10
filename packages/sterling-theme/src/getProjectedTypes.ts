import { SterlingTheme } from '@/sterling-theme';

export function getProjectedTypes(theme: SterlingTheme): string[] {
  return theme.projections?.map((projection) => projection.type) || [];
}
