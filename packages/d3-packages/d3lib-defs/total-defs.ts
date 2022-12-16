
export const D3_TOTAL_DEFS: string = `
/**
 * To anyone adding to this library in the future: please take the following steps when adding
 * new VisualObjects.
 *
 * 1. If the object is to be accessible within sterling, add it to library within ScriptViewImports.
 * 2. Add the name of the file, minus .d.ts, to the list within d3lib-def-compiler/src/D3LibDefCompiler.java.
 * 3. Run the typescript compiler ("tsc" in terminal) from within the d3-packages folder.
 * 4. Run the main method within D3LibDefCompiler.
 *
 * If these steps are not followed, the file's definitions will either not be accessible within
 * sterling, or will not show up in monaco.
 */
/**
 * Interface that will be used generically to represent locations within a given svg
 */
interface Coords {
    x: number;
    y: number;
}
/**
 * Generic props for representing a box around an object.
 */
interface BoundingBox {
    top_left: Coords;
    bottom_right: Coords;
}
declare class VisualObject {
    coords: Coords;
    children: VisualObject[];
    /**
     * Top level class, which all other visual objects will extend.
     * @param coords position of the object on screen.
     */
    constructor(coords?: Coords);
    boundingBox(): BoundingBox;
    /**
     * Returns the center of the object
     * @returns coordinates of center
     */
    center(): Coords;
    /**
     * Shifts object to have new given center
     * @param center new center of the object
     */
    setCenter(center: Coords): void;
    /**
     * Renders the object to the screen.
     * @param svg HTML Svg object to which the object should be rendered.
     */
    render(svg: any): void;
}
//# sourceMappingURL=VisualObject.d.ts.map
/**
 * Generic class for a large suite of "shape"-like objects.
 * Generally includes anything with an inside and an outside.
 * All shapes come with builtin label.
 */
declare class Shape extends VisualObject {
    color: string;
    borderWidth: number;
    borderColor: string;
    label: TextBox;
    /**
     * Constructs a generic shape object. This is a top-level class,
     * which should not be used except as super class for other specific
     * shapes.
     * @param coords coordinates of the shape
     * @param color color of shape's interior
     * @param borderWidth width of Shape's border
     * @param borderColor color of border
     * @param label text to display atop the shape
     * @param labelColor color of text
     * @param labelSize size of text
     */
    constructor(coords?: Coords, color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    setCenter(center: Coords): void;
    render(svg: any): void;
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
    boundingBox(): {
        top_left: Coords;
        bottom_right: {
            x: number;
            y: number;
        };
    };
    private initialize_cells;
    center(): {
        x: number;
        y: number;
    };
    setCenter(center: Coords): void;
    private check_bounding_box;
    add(coords: Coords, add_object: VisualObject, ignore_warning?: boolean): void;
    remove(coords: Coords): void;
    private fill_grid_lines;
    hide_grid_lines(): void;
    fill(coords: Coords, color: string): void;
    private check_coords;
    render(svg: any): void;
}
{};
//# sourceMappingURL=Grid.d.ts.map
declare class Rectangle extends Shape {
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
declare class Circle extends Shape {
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
    render(svg: any): void;
}
//# sourceMappingURL=Circle.d.ts.map
declare class Stage {
    Children: VisualObject[];
    constructor();
    add(addObject: VisualObject): void;
    render(svg: any, document?: any): void;
}
//# sourceMappingURL=Stage.d.ts.map
declare class TextBox extends VisualObject {
    text: string;
    fontSize: number;
    color: string;
    /**
     * Displays given text.
     * @param text text to display
     * @param coords location for center of text
     * @param color text color
     * @param fontSize size of the text
     */
    constructor(text: string, coords?: Coords, color?: string, fontSize?: number);
    boundingBox(): BoundingBox;
    setText(text: string): void;
    setFontSize(fontSize: number): void;
    setTextColor(color: string): void;
    render(svg: any): void;
}
//# sourceMappingURL=TextBox.d.ts.map
declare class Line extends VisualObject {
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
declare function averagePath(points: Coords[]): Coords;
/**
 * Shifts a list of points according to a shift variable
 * @param pointList
 * @param shift
 * @returns
 */
declare function shiftList(pointList: Coords[], shift: Coords): Coords[];
/**
 * Utility function returning bounding box for a list of points
 * @param pointList list of points as coords
 * @returns bounding box
 */
declare function boundsOfList(pointList: Coords[]): BoundingBox;
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
/**
 * Class Representing Polygonal objects. Takes the form of any
 * series of points, and will form a polygon with said points as the boundary.
 */
declare class Polygon extends Shape {
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
interface Node {
    name: string;
    neighbors: string[];
}
declare class Graph extends VisualObject {
    nodes: Node[];
    node_radius: number;
    fixed_nodes: number;
    graph_dimensions: number;
    node_to_location: any;
    constructor(coords?: Coords, graph_dimensions?: number, fixed_nodes?: number, node_radius?: number);
    setCenter(center: Coords): void;
    center(): {
        x: number;
        y: number;
    };
    add(Nodes: Node[]): void;
    private set_fixed_nodes;
    private set_malleable_nodes;
    check_add_set(Nodes: Node[]): void;
    render(svg: any): void;
    render_lines(svg: any, connections: string[][]): void;
    render_nodes(svg: any): void;
}
//# sourceMappingURL=Graph.d.ts.map
/**
 * Interface for node in a tree with a visualObject
 */
interface VisTree {
    visualObject: VisualObject;
    children: VisTree[];
}
declare class Tree extends VisualObject {
    root: VisTree;
    height: number;
    width: number;
    private lines;
    private subTrees;
    /**
     * Builds a tree object, pulling all children nodes into proper locations and
     * adding lines where necessary.
     * @param root root of the tree of visual objects
     * @param height height of box to bound the tree
     * @param width width of box to bound the tree
     * @param coords top left point of the tree
     */
    constructor(root: VisTree, height: number, width: number, coords?: Coords, edgeColor?: string, edgeWidth?: number);
    private setUpSubtrees;
    setCenter(center: Coords): void;
    setLineColor(color: string): void;
    setLineWidth(width: number): void;
    renderNodes(svg: any): void;
    renderLines(svg: any): void;
    render(svg: any): void;
}
//# sourceMappingURL=Tree.d.ts.map
`