import { Shape } from './Shape';
import { Coords } from './VisualObject';
export declare class Rectangle extends Shape {
    height: number;
    width: number;
    /**
     * Creates a Rectangle object with the given height and width, placing the top left corner
     * at the coordinate argument.
     * @param height size in y direction
     * @param width size in x direction
     * @param coords top left corner
     */
    constructor(height: number, width: number, coords?: Coords);
    setWidth(width: number): void;
    setHeight(height: number): void;
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=Rectangle.d.ts.map