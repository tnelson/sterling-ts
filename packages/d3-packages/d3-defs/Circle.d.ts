import { Shape } from './Shape';
import { BoundingBox, Coords, ExperimentalBoundingBox } from './VisualObject';
export declare class Circle extends Shape {
    radius: number;
    /**
     * Creates a circle object at the given location
     * @param radius radius of circle
     * @param coords coordinates of circle's center
     * @param color color of interior
     * @param borderWidth width border
     * @param borderColor color for border
     * @param label text for label
     * @param labelColor color of label
     * @param labelSize size of label
     */
    constructor(radius: number, coords?: Coords, color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    boundingBox(): BoundingBox;
    setRadius(radius: number): void;
    getExperimentalBoundingBox(): ExperimentalBoundingBox;
    render(svg: any): void;
}
//# sourceMappingURL=Circle.d.ts.map