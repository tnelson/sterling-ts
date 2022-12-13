import { Shape } from './Shape';
import { Coords } from './VisualObject';
export declare class Polygon extends Shape {
    points: Coords[];
    constructor(points: Coords[]);
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=Polygon.d.ts.map