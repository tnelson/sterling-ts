import { VisualObject, Coords } from './VisualObject';
export declare class ConjoinedObject extends VisualObject {
    /**
     * Note: this code is untested!
     */
    objects: VisualObject[];
    constructor(Children?: VisualObject[]);
    addOrdered(obj: VisualObject, index: number): void;
    add(obj: VisualObject): void;
    setCenter(coords: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=ConjoinedObject.d.ts.map