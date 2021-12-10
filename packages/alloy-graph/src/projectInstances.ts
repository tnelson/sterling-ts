import {
  AlloyInstance,
  applyProjections,
  getInstanceType,
  getTypeAtoms
} from '@/alloy-instance';
import { getProjectedTypes, SterlingTheme } from '@/sterling-theme';

export function projectInstance(
  instance: AlloyInstance,
  theme?: SterlingTheme
): AlloyInstance {
  const projectedAtoms = pickProjectedAtoms(instance, theme);
  return applyProjections(instance, projectedAtoms);
}

export function projectInstances(
  instances: AlloyInstance[],
  theme?: SterlingTheme
): AlloyInstance[] {
  return instances.map((instance) => projectInstance(instance, theme));
}

function pickProjectedAtoms(
  instance: AlloyInstance,
  theme?: SterlingTheme
): string[] {
  if (!theme) return [];
  return getProjectedTypes(theme).map((typeId) => {
    const projectedType = getInstanceType(instance, typeId);
    const projectedAtoms = getTypeAtoms(projectedType);
    return projectedAtoms[0].id;
  });
}
