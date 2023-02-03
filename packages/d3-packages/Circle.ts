import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import { BoundingBox, Coords } from './VisualObject';

export class Circle extends Shape{
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
    constructor(
        radius: number,
        coords?: Coords,
        color?: string,
        borderWidth?: number,
        borderColor?: string,
        label?: string,
        labelColor?: string,
        labelSize?: number
    ){
        super(coords, color, borderWidth, borderColor, label, labelColor, labelSize)
        this.radius = radius
    }

    boundingBox(): BoundingBox {
        return {
            top_left: {x: this.coords.x - this.radius, y: this.coords.y - this.radius},
            bottom_right: {x: this.coords.x + this.radius, y: this.coords.y + this.radius}
        }
    }
    setRadius(radius: number){this.radius = radius}

    override render(svg: any){
        d3.select(svg)
            .append('circle')
            .attr('cx', this.coords.x)
            .attr('cy', this.coords.y)
            .attr('r', this.radius)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .attr('fill', this.color)
        super.render(svg)
    }
}