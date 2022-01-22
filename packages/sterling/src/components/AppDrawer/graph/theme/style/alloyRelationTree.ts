import { AlloyDatum, getInstanceRelations } from '@/alloy-instance';
import { TreeNode } from './tree/types';

export function alloyRelationTree(datum: AlloyDatum): TreeNode {
  const instance = datum.instances[0];
  const relations = getInstanceRelations(instance);
  return {
    type: 'header',
    text: 'Relations',
    level: 0,
    children: relations.map((relation) => {
      return {
        type: 'datum',
        id: relation.id,
        text: relation.name,
        level: 1
      };
    })
  };
}
