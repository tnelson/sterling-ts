import { VisualObject, Coords } from './VisualObject';
/**
 * Interface for node in a tree with a visualObject
 */
export interface VisTree {
    visualObject: VisualObject;
    children: VisTree[];
}
export declare class Tree extends VisualObject {
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