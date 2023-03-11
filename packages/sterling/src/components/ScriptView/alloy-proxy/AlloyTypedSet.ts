import uniq from 'lodash/uniq';
import { isDefined } from 'ts-is-present';
import { AlloyAtom } from './AlloyAtom';
import { AlloySet, AlloyTuple } from './AlloySet';
import { AlloySignature } from './AlloySignature';

class AlloyTypedSet extends AlloySet {

    /**
     * An Alloy type is a _union_ of vectors of sig names, where each vector 
     * has the same length (>=1). 
     */
    private readonly _types: AlloySignature[][];

    constructor (types: AlloySignature[][], tuples: AlloyTuple[]) {

        super(tuples);
        this._types = types;

    }

    project (atoms: Map<AlloySignature, AlloyAtom>): void {

        const projectedAtoms: (AlloyAtom | undefined)[] = 
          uniq(this.types().map(possibleTypes => possibleTypes.map(sig => atoms.get(sig))).flat());

        if (projectedAtoms.some(isDefined)) {

            this._tuples = this.tuples()
                .filter(tuple => {
                    const atoms = tuple.atoms();
                    return atoms.every((atom, index) => projectedAtoms[index] === undefined || projectedAtoms[index] === atom);
                })
                .map(tuple => {
                    return new AlloyTuple(tuple.atoms().filter((atom, index) => {
                        return projectedAtoms[index] === undefined;
                    }));
                });

        }

    }

    types (): AlloySignature[][] {

        return this._types.slice();

    }

}

export {
    AlloyTypedSet
}
