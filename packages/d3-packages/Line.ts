import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import {Coords, VisualObject} from './VisualObject'
import { DEFAULT_COLOR, DEFAULT_LINE_COLOR, DEFAULT_STROKE_WIDTH } from './Constants'

export class Line extends VisualObject{
    points: Coords[]
    color: string
    width: number

    /**
     * Creates a line on the given poitns. 
     * @param points list of points for the line to pass through
     * @param color color of line
     * @param width width of line
     */
    constructor(
        points: Coords[],
        color?: string,
        width?: number,
    ){
        super(points[0])
        this.points = points
        this.color = color ?? DEFAULT_LINE_COLOR
        this.width = width ??DEFAULT_STROKE_WIDTH
    }

    setColor(color: string){this.color = color}
    setWidth(width: number){this.width = width}

    // Using averagePath utility to return rough center
    center(): Coords { return averagePath(this.points) }

    // Shifts points so average is at new center
    override setCenter(center: Coords): void {
        let shift: Coords = {
            x: center.x - this.center().x,
            y: center.y - this.center().y
        }
        this.points = shiftList(this.points, shift)
    }

    override render(svg: any){
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