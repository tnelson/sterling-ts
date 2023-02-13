import { VisualObject, Coords } from './VisualObject';
import { Line } from './Line';
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
export declare class Grid extends VisualObject {
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
export {};
//# sourceMappingURL=Grid.d.ts.map