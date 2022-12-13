import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import {Coords, VisualObject} from './VisualObject'
import { DEFAULT_COLOR, DEFAULT_LINE_COLOR, DEFAULT_STROKE_WIDTH } from './Constants'
import { average } from '@/vector2';

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

    // Using averagePath utility to return rough center
    center(): Coords { return averagePath(this.points) }

    // Shifts points so average is at new center
    setCenter(center: Coords): void {
        let shift: Coords = {
            x: center.x - this.center().x,
            y: center.y - this.center().y
        }
        this.points = shiftList(this.points, shift)
    }

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

/**
 * Simple method averaging the coordinate points in a series.
 * @param points 
 * @returns 
 */
export function averagePath(points: Coords[]): Coords{
    if (points.length == 0){
        return {x: 0, y:0}
    }
    //Averages the points
    return points.reduce(
        (previousValue: Coords, currentValue: Coords) => {return {
            x: previousValue.x + currentValue.x / points.length,
            y: previousValue.y + currentValue.y / points.length
        }},
        {x:0, y:0}
    )
}

/**
 * Shifts a list of points according to a shift variable
 * @param pointList 
 * @param shift 
 * @returns 
 */
export function shiftList(pointList: Coords[], shift: Coords): Coords[] {
    let newPoints: Coords[] = pointList.map((point: Coords): Coords => {
        return {
            x: point.x + shift.x,
            y: point.y + shift.y
        }
    })
    return newPoints
}