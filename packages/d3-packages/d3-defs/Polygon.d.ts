import { Shape } from './Shape';
import { BoundingBox, Coords } from './VisualObject';
/**
 * Class Representing Polygonal objects. Takes the form of any
 * series of points, and will form a polygon with said points as the boundary.
 */
export declare class Polygon extends Shape {
    points: Coords[];
    /**
     * Constructs a polygon object
     * @param points list of points forming outside
     * @param color color of interior
     * @param borderWidth width of the border
     * @param borderColor color of the border
     * @param label text to label with
     * @param labelColor color of label text
     * @param labelSize size of the label
     */
    constructor(points: Coords[], color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    boundingBox(): BoundingBox;
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=Polygon.d.ts.map