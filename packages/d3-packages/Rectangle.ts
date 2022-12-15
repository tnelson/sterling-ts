import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import {Coords} from './VisualObject'


export class Rectangle extends Shape{
    height: number;
    width: number;

    /**
     * Creates a Rectangle object with the given height and width, placing the top left corner
     * at the coordinate argument.
     * @param height size in y direction
     * @param width size in x direction
     * @param coords top left corner
     */
    constructor(
        height: number,
        width: number,
        coords?: Coords,
        color?: string,
        borderWidth?: number,
        borderColor?: string,
        label?: string,
        labelColor?: string,
        labelSize?: number
    ){
        super(coords, color, borderWidth, borderColor, label, labelColor, labelSize)
        this.height = height
        this.width = width
    }

    setWidth(width: number){this.width = width}
    setHeight(height: number){this.height = height}

    center(): Coords{
        return {x: this.coords.x + this.width/2, y: this.coords.y + this.height/2}
    }

    setCenter(center: Coords){
        this.coords = {
            x: center.x - this.width/2,
            y: center.y - this.height/2
        }
    }

    render(svg: any){
        super.render(svg)
        d3.select(svg)
            .append('rect')
            .attr('x', this.coords.x)
            .attr('y', this.coords.y)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .attr('fill', this.color)
    }
}