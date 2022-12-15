import { Coords, VisualObject } from './VisualObject';
export declare class Line extends VisualObject {
    points: Coords[];
    color: string;
    width: number;
    constructor(points: Coords[], color?: string, width?: number);
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
//# sourceMappingURL=Line.d.ts.map