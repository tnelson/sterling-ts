import { SterlingTheme } from '@/sterling-theme';

export function getHiddenTypes(theme: SterlingTheme): string[] {
  const hiddenTypes: string[] = [];
  theme.nodes?.forEach((nodeTheme) => {
    if (nodeTheme.visible === false) {
      nodeTheme.targets?.forEach((target) => {
        if (target !== '*') {
          hiddenTypes.push(target.type);
        }
      });
    }
  });
  return hiddenTypes;
}
