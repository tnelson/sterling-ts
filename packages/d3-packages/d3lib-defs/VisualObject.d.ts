export interface Coords {
    x: number;
    y: number;
}
export declare class VisualObject {
    coords: Coords;
    children: VisualObject[];
    constructor(coords?: Coords);
    boundingBox(): void;
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=VisualObject.d.ts.map