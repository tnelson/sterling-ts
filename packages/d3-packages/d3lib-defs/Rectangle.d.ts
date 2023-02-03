import { Shape } from './Shape';
import { BoundingBox, Coords } from './VisualObject';
export declare class Rectangle extends Shape {
    height: number;
    width: number;
    /**
     * Creates a logical rectangle object
     * @param height height (y direction)
     * @param width width (x direction)
     * @param coords coordinates of the top-left point
     * @param color color for interior
     * @param borderWidth width of border
     * @param borderColor color of border
     * @param label text for label
     * @param labelColor color for label text
     * @param labelSize size of label text
     */
    constructor(height: number, width: number, coords?: Coords, color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    boundingBox(): BoundingBox;
    setWidth(width: number): void;
    setHeight(height: number): void;
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=Rectangle.d.ts.map