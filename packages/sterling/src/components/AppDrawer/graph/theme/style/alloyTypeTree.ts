import { AlloyDatum, getInstanceTypes } from '@/alloy-instance';
import { TreeNode } from './tree/types';

export function alloyTypeTree(datum: AlloyDatum): TreeNode {
  const instance = datum.instances[0];
  const typeNodes: Record<string, TreeNode> = {};
  const types = getInstanceTypes(instance);
  types.forEach((type) => {
    typeNodes[type.id] = {
      type: 'datum',
      id: type.id,
      text: type.id,
      level: type.types.length + 1,
      children: []
    };
  });
  types.forEach((type) => {
    const parents = type.types;
    if (parents.length > 1) {
      const parent = parents[1];
      typeNodes[parent].children?.push(typeNodes[type.id]);
    } else if (type.id !== 'univ') {
      typeNodes['univ'].children?.push(typeNodes[type.id]);
    }
  });
  return {
    type: 'header',
    text: 'Types',
    level: 0,
    children: [typeNodes['univ']]
  };
}
