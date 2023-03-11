import { VisualObject, Coords } from './VisualObject';
export interface EdgeParams {
    obj1: VisualObject;
    obj2: VisualObject;
    text?: string;
}
export declare class Edge extends VisualObject {
    obj1: VisualObject;
    obj2: VisualObject;
    obj1Coords: Coords;
    obj2Coords: Coords;
    midpoint: Coords;
    text: string;
    points: Coords[];
    visible_points: Coords[];
    boundary_points: Coords[];
    constructor(params: EdgeParams);
    compute_points(precision: any): void;
    opt_points(target_point: Coords, obj: VisualObject, precision: number): Coords;
    render(svg: any): void;
}
/**
 * TODO:
 *  - where will the text be? "Middle" of line?
 *
 *  - Where will edge point? Thought - have bounding box "better" implemented
 *
 *    - IDEA: bounding box is given by a lambda that takes in the center of a shape. For more "complex" shapes where we actually
 *  want a "good" bounding box, we return an equation to get the bounding box for the circle. Practically, we want
 *  the arrow to point to __sorta__ the closest edge point of a given shape. But this doesn't need to be exact
 *  to look nice. Even better: a lambda that takes in a center point and a direction
 *
 */
export {};
//# sourceMappingURL=Edge.d.ts.map