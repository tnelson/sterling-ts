import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import {Coords, VisualObject} from './VisualObject'
import { DEFAULT_COLOR, DEFAULT_LINE_COLOR, DEFAULT_STROKE_WIDTH } from './Constants'

export class Line extends VisualObject{
    points: Coords[]
    color: string
    width: number
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
        this.width = DEFAULT_STROKE_WIDTH
    }

    setColor(color: string){this.color = color}
    setWidth(width: number){this.width = width}

    render(svg: any){
        let path = d3.path()
        path.moveTo(this.points[0].x, this.points[0].y)
        this.points.forEach((point: Coords) => {
            path.lineTo(point.x, point.y)
            }
        )
        d3.select(svg)
            .append('path')
            .attr('d', path)
            .attr('stroke-width', this.width)
            .attr('stroke', this.color)
            .attr('fill', "transparent") // Should prob make easier in future. 
        super.render(svg)
    }
}