import { AlloyAtom } from './atom';
import {
  AlloyRelation,
  getRelationTuples,
  relationsFromElements
} from './relation';
import { AlloyTuple } from './tuple';
import {
  AlloyType,
  findAndPopulateIntType,
  getTypeAtoms,
  typesFromElements
} from './type';
import { keyBy } from './util';
import { typeHierarchiesFromElement, typeNamesFromElement } from './xml';

export interface AlloyInstance {
  types: Record<string, AlloyType>;
  relations: Record<string, AlloyRelation>;
}

export function getInstanceAtom(
  instance: AlloyInstance,
  atomId: string
): AlloyAtom {
  const foundAtom = getInstanceAtoms(instance).find(
    (atom) => atom.id === atomId
  );
  if (!foundAtom) throw new Error(`Could not find atom with id ${atomId}`);
  return foundAtom;
}

export function getInstanceAtoms(instance: AlloyInstance): AlloyAtom[] {
  return getInstanceTypes(instance)
    .map(getTypeAtoms)
    .reduce((prev, curr) => prev.concat(curr), []);
}

export function getInstanceRelation(
  instance: AlloyInstance,
  relation: string
): AlloyRelation {
  const rel = instance.relations[relation];
  if (!rel) throw new Error(`Could not find relation ${relation}`);
  return rel;
}

export function getInstanceRelations(instance: AlloyInstance): AlloyRelation[] {
  return Object.values(instance.relations);
}

export function getInstanceTuples(instance: AlloyInstance): AlloyTuple[] {
  return getInstanceRelations(instance)
    .map(getRelationTuples)
    .reduce((prev, curr) => prev.concat(curr), []);
}

export function getInstanceType(
  instance: AlloyInstance,
  typeId: string
): AlloyType {
  const type = instance.types[typeId];
  if (!type) throw new Error(`Could not find type with id ${typeId}`);
  return type;
}

/**
 * Get all types in an instance.
 * @param instance
 */
export function getInstanceTypes(instance: AlloyInstance): AlloyType[] {
  return Object.values(instance.types);
}

/**
 * Create an instance object from and <instance> element.
 *
 * @param element An <instance> element.
 */
export function instanceFromElement(element: Element): AlloyInstance {
  const bitwidth = element.getAttribute('bitwidth');
  if (!bitwidth) throw new Error('No bitwidth found in instance');

  const typeNames = typeNamesFromElement(element);
  const typeHierarchies = typeHierarchiesFromElement(typeNames, element);
  const types = typesFromElements(
    typeHierarchies,
    element.querySelectorAll('sig')
  );
  const relations = relationsFromElements(
    typeNames,
    element.querySelectorAll('field')
  );

  findAndPopulateIntType(parseInt(bitwidth), types);
  return {
    types: keyBy(types, (t) => t.id),
    relations: keyBy(relations, (r) => r.id)
  };
}
