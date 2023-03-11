import {AlloyField} from '../AlloyField'
// Must import these, or clash with .d.ts version (TODO: resolve conflict)
import {AlloySignature} from '../AlloySignature'
import {AlloyAtom} from '../AlloyAtom'
import {AlloyTuple} from '../AlloySet'

const atomA0 = new AlloyAtom('A$0')
const atomA1 = new AlloyAtom('A$1')
const atomA2 = new AlloyAtom('A$2')
const atomB0 = new AlloyAtom('B$0')
const atomB1 = new AlloyAtom('B$1')
const atomB2 = new AlloyAtom('B$2')
const sigANoProxy = new AlloySignature('A', [atomA0, atomA1, atomA2])
const sigBNoProxy = new AlloySignature('B', [atomB0, atomB1, atomB2])
const fldAB = new AlloyField('fldAB', [[sigANoProxy, sigBNoProxy]], 
    [new AlloyTuple([atomA0, atomB0]), 
     new AlloyTuple([atomA1, atomB1]),
     new AlloyTuple([atomA2, atomB2])])

describe('AlloySet Join', () => {
    it('Join works even with different AlloyAtom objects', () => {
        const atomA0_again = new AlloyAtom('A$0')
        expect(atomA0_again.join(fldAB).tuples().length).toBe(1)
    })

    it('Empty join produces an error', () => {
        expect( () => fldAB.join(fldAB)).toThrowError()
    })

  
})