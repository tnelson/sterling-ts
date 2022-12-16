import { max } from 'lodash';
import { Circle } from './Circle';
import {Graph, Node} from './Graph'
import {VisualObject, Coords} from './VisualObject'
import {TextBox} from './Textbox'
import {Line} from "./Line"
import { Children } from 'react';
import { DEFAULT_TREE_LINE_COLOR, DEFAULT_TREE_LINE_WIDTH } from './Constants';

/**
 * Interface for node in a tree with a visualObject
 */
export interface VisTree{
    visualObject: VisualObject,
    children: VisTree[]
}

export class Tree extends VisualObject{
    
    root: VisTree;
    height: number;
    width: number
    private lines: Line[];
    private subTrees: Tree[]
    
    /**
     * Builds a tree object, pulling all children nodes into proper locations and
     * adding lines where necessary.
     * @param root root of the tree of visual objects
     * @param height height of box to bound the tree
     * @param width width of box to bound the tree
     * @param coords top left point of the tree
     */
    constructor(
        root: VisTree, height: number, width: number, coords?: Coords, edgeColor?: string, edgeWidth?: number
        ){
        super(coords)
        this.height = height;
        this.width = width;
        this.root = root;
        this.root.visualObject.setCenter({
            x: this.coords.x + this.width / 2,
            y: this.coords.y
        })
        console.log(this)
        this.setUpSubtrees();
        this.setLineColor(edgeColor ?? DEFAULT_TREE_LINE_COLOR);
        this.setLineWidth(edgeWidth ?? DEFAULT_TREE_LINE_WIDTH)
    }

    private setUpSubtrees(){
        let layerHeight: number = this.height/(treeHeight(this.root) - 1)
        console.log(layerHeight)

        let totalWidth: number = this.root.children
            .map((childTree): number => treeWidth(childTree))
            .reduce((partialSum, childWidth): number => partialSum + childWidth, 0)
        
        this.subTrees = []
        let currTotalWidth = 0
        this.subTrees = this.root.children.map((childTree): Tree => {

            let childWidth: number = treeWidth(childTree)
            let prevWidth: number = currTotalWidth
            currTotalWidth += childWidth

            return new Tree(
                childTree, 
                layerHeight * (treeHeight(childTree) - 1),
                this.width * treeWidth(childTree) / totalWidth,
                {
                    x: this.coords.x + (prevWidth / totalWidth) * this.width,
                    y: this.coords.y + layerHeight
                }
                )
        })

        this.lines = []

        this.subTrees.forEach((subTree) => {
            this.lines.push(new Line(
                [{
                    x: this.root.visualObject.center().x,
                    y: this.root.visualObject.center().y
                },
                {
                    x: subTree.root.visualObject.center().x,
                    y: subTree.root.visualObject.center().y
                }],
                "black",
                2 // Need to make default later
            ))
        })
    }

    setLineColor(color: string){
        this.lines.forEach((line) => line.setColor(color))
        this.subTrees.forEach(subTree => subTree.setLineColor(color))
    }
    setLineWidth(width: number){
        this.lines.forEach((line) => line.setWidth(width))
        this.subTrees.forEach(subTree => subTree.setLineWidth(width))
    }

    renderNodes(svg){
        this.root.visualObject.render(svg)
        this.subTrees.forEach((subTree: Tree) => subTree.renderNodes(svg))
    } // Need to separate line rendering and node rendering because lines need to be done after. 

    renderLines(svg) {
        this.lines.forEach((line) => line.render(svg))
        this.subTrees.forEach((subTree) => subTree.renderLines(svg))
    }

    render(svg: any): void {
        this.renderLines(svg)
        this.renderNodes(svg)
    }
}

/**
 * Utility func finding length of a tree
 * @param visTree 
 * @returns the height of the tree (depth)
 */
function treeHeight(visTree: VisTree): number{
    let height: number = 0;
    let toCheck: VisTree[] = [visTree]

    while (toCheck.length != 0){
        height += 1
        let newToCheck: VisTree[] = []

        toCheck.forEach((visTree) => {
            visTree.children.forEach((child) => {
                newToCheck.push(child)
            })
        })

        toCheck = newToCheck;
    }
    return height
}

/**
 * Utility function finding width of a tree
 * @param visTree 
 * @returns the width of the tree (depth)
 */
 function treeWidth(visTree: VisTree): number{
    let width = 1;
    let toCheck: VisTree[] = [visTree]

    while (toCheck.length != 0){
        let newToCheck: VisTree[] = []

        toCheck.forEach((visTree) => {
            visTree.children.forEach((child) => {
                newToCheck.push(child)
            })
        })

        toCheck = newToCheck;
        width = Math.max(width, newToCheck.length);
    }
    return width
}