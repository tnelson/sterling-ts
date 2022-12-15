
export const D3_TOTAL_DEFS: string = `
interface Coords {
    x: number;
    y: number;
}
declare class VisualObject {
    coords: Coords;
    children: VisualObject[];
    constructor(coords?: Coords);
    boundingBox(): void;
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=VisualObject.d.ts.map
declare class Shape extends VisualObject {
    color: string;
    borderWidth: number;
    borderColor: string;
    label: TextBox;
    constructor(coords?: Coords);
    setCenter(center: Coords): void;
    setColor(color: string): void;
    setBorderWidth(borderWidth: number): void;
    setBorderColor(borderColor: string): void;
    setLabelText(text: string): void;
    setLabelColor(labelColor: string): void;
    setLabelSize(labelSize: number): void;
}
//# sourceMappingURL=Shape.d.ts.map
declare class Pane {
    Children: VisualObject[];
    constructor();
    add(addNode: VisualObject): void;
    render(svg: any): void;
}
//# sourceMappingURL=Pane.d.ts.map
interface gridProps {
    grid_location: Coords;
    cell_size: {
        x_size: number;
        y_size: number;
    };
    grid_dimensions: {
        x_size: number;
        y_size: number;
    };
}
interface gridCell {
    contents?: VisualObject;
    center: Coords;
}
declare class Grid extends VisualObject {
    /**
     *
     * As one of the most common expressions of a graph is a matrix, we offer functionality
     * for building a grid of cells, where you can add visual objects to each square in the grid,
     * and they are automatically formatted into the grid (where the center of the object is aligned
     * to the center of the grid)
     *
     *  Note: grid size is fixed! You can't change the size of a grid once it's created
     *
     */
    config: gridProps;
    cells: Array<Array<gridCell>>;
    gridlines: Array<Line>;
    constructor(config: gridProps);
    initialize_cells(): void;
    setCenter(center: Coords): void;
    add(coords: Coords, add_object: VisualObject): void;
    remove(coords: Coords): void;
    fill_grid_lines(): void;
    fill(coords: Coords, color: string): void;
    check_coords(coords: Coords): void;
    render(svg: any): void;
}
{};
//# sourceMappingURL=Grid.d.ts.map
declare class Rectangle extends Shape {
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
declare class Circle extends Shape {
    radius: number;
    constructor(radius: number, coords?: Coords);
    setRadius(radius: number): void;
    render(svg: any): void;
}
//# sourceMappingURL=Circle.d.ts.map
declare class Stage {
    Children: Pane[];
    constructor();
    add(addPane: Pane): void;
    render(svg: any): void;
}
//# sourceMappingURL=Stage.d.ts.map
declare class TextBox extends VisualObject {
    text: string;
    fontSize: number;
    color: string;
    constructor(text: string, coords?: Coords);
    setText(text: string): void;
    setFontSize(fontSize: number): void;
    setTextColor(color: string): void;
    render(svg: any): void;
}
//# sourceMappingURL=Textbox.d.ts.map
declare class Line extends VisualObject {
    points: Coords[];
    color: string;
    width: number;
    constructor(points: Coords[]);
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
declare function averagePath(points: Coords[]): Coords;
/**
 * Shifts a list of points according to a shift variable
 * @param pointList
 * @param shift
 * @returns
 */
declare function shiftList(pointList: Coords[], shift: Coords): Coords[];
//# sourceMappingURL=Line.d.ts.map
declare class ConjoinedObject extends VisualObject {
    /**
     * Note: this code is untested!
     */
    objects: VisualObject[];
    constructor(Children?: VisualObject[]);
    addOrdered(obj: VisualObject, index: number): void;
    add(obj: VisualObject): void;
    setCenter(coords: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=ConjoinedObject.d.ts.map
declare class Polygon extends Shape {
    points: Coords[];
    constructor(points: Coords[]);
    center(): Coords;
    setCenter(center: Coords): void;
    render(svg: any): void;
}
//# sourceMappingURL=Polygon.d.ts.map
`