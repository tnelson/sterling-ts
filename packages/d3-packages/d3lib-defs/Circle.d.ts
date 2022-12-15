import { Shape } from './Shape';
import { Coords } from './VisualObject';
export declare class Circle extends Shape {
    radius: number;
    constructor(radius: number, coords?: Coords, color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    setRadius(radius: number): void;
    render(svg: any): void;
}
//# sourceMappingURL=Circle.d.ts.map