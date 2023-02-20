import { AlloyError } from './AlloyError';
import { AlloyProxy } from './AlloyProxy';
import { AlloySet, AlloyTuple } from './AlloySet';

/**
 * In Alloy, an atom is a primitive entity that is indivisible, immutable, and
 * uninterpreted.
 */
class AlloyAtom extends AlloySet {

    private readonly _id: string;

    constructor (id: string, proxy?: AlloyProxy) {

        super();

        const self = proxy
            ? proxy.applyProxy(this, varName(id))
            : this;

        this._id = id;
        this._tuples = [new AlloyTuple([self])];

        return self;

    }

    /**
     * An atom is invariant across instances (i.e., states) in a trace. This supports 
     * the semantics of the Alloy evaluator: if asked whether X = next_state X (where X is an atom ID)
     * the evaluator produces *true*. However, the general expectation of clone() is for it to return
     * a new object (x.clone() != x), so invoking this method is forbidden.
     */
    clone (proxy?: AlloyProxy): AlloyAtom {
        //return new AlloyAtom(this.id(), proxy);
        throw new Error( 'AlloyAtom objects cannot be cloned.')
    }

    id (): string {
        return this._id;
    }

    static fromElement (element: Element, proxy?: AlloyProxy): AlloyAtom {
        const label = element.getAttribute('label');
        if (!label) throw AlloyError.missingAttribute('AlloyAtom', 'label');
        return new AlloyAtom(label, proxy);
    }

}

function varName (id: string): string {
    return id
        .replace('/', '$')
        .replace('-', '$');
}

export {
    AlloyAtom
}
