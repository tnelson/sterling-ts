import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import {Coords} from './VisualObject'
import { averagePath, shiftList } from './Line';

/**
 * Class Representing Polygonal objects. Takes the form of any
 * series of points, and will form a polygon with said points as the boundary.
 */
export class Polygon extends Shape{
    points: Coords[]

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
    constructor(
        points: Coords[],
        color?: string,
        borderWidth?: number,
        borderColor?: string,
        label?: string,
        labelColor?: string,
        labelSize?: number
    ){
        super(points[0], color, borderWidth, borderColor, label, labelColor, labelSize)
        this.points = points
        this.label.setCenter(this.center())
    }

    // Using averagePath utility to return rough center
    center(): Coords { return averagePath(this.points) }

    // Shifts points so average is at new center
    setCenter(center: Coords): void {
        let shift: Coords = {
            x: - this.center().x + center.x,
            y: - this.center().y + center.y
        }
        this.points = shiftList(this.points, shift)
        
        super.setCenter(center)
    }

    render(svg: any){
        let path = d3.path()
        path.moveTo(this.points[0].x, this.points[0].y)
        this.points.forEach((point: Coords) => {
            path.lineTo(point.x, point.y)
            }
        )
        path.closePath()
        d3.select(svg)
            .append('path')
            .attr('d', path)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .attr('fill', this.color) 
        super.render(svg)
    }
}