import {Shape} from './Shape'
import d3 from 'd3'
import {Coords, VisualObject} from './VisualObject'
import { DEFAULT_COLOR, DEFAULT_LINE_COLOR } from './Constants'

export class Line extends VisualObject{
    points: Coords[]
    color: string
    /*
    All shapes will extend this class

    Idea: want functionality to be able to conjoin two shapes (i.e. for tic-tac-toe,
        throw an X over a square and call it a single type)
    */

    constructor(
        points: Coords[],
    ){
        super(points[0])
        this.points = points
        this.color = DEFAULT_LINE_COLOR
    }

    setColor(color: string){this.color = color}

    render(svg){
        super.render(svg)
        d3.select(svg)
            .append('path')
            .data('d', this.points.map((coord) => [coord.x, coord.y]))
    }
}