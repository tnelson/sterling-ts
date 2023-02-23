import { BoundingBox, Coords, VisualObject } from './VisualObject';
export declare class Line extends VisualObject {
    points: Coords[];
    color: string;
    width: number;
    /**
     * Creates a line on the given poitns.
     * @param points list of points for the line to pass through
     * @param color color of line
     * @param width width of line
     */
    constructor(points: Coords[], color?: string, width?: number);
    boundingBox(): BoundingBox;
    setColor(color: string): void;
    setWidth(width: number): void;
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
/**
 * Simple method averaging the coordinate points in a series.
 * @param points
 * @returns
 */
export declare function averagePath(points: Coords[]): Coords;
/**
 * Shifts a list of points according to a shift variable
 * @param pointList
 * @param shift
 * @returns
 */
export declare function shiftList(pointList: Coords[], shift: Coords): Coords[];
/**
 * Utility function returning bounding box for a list of points
 * @param pointList list of points as coords
 * @returns bounding box
 */
export declare function boundsOfList(pointList: Coords[]): BoundingBox;
//# sourceMappingURL=Line.d.ts.map