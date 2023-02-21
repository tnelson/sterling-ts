import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import {BoundingBox, Coords, toFunc} from './Utility'


export class Rectangle extends Shape{
    height: () => number;
    width: () => number;

    /**
     * Creates a logical rectangle object
     * @param height height (y direction)
     * @param width width (x direction)
     * @param coords coordinates of the top-left point
     * @param color color for interior
     * @param borderWidth width of border
     * @param borderColor color of border
     * @param label text for label
     * @param labelColor color for label text
     * @param labelSize size of label text
     */
    constructor(
        height: number | (() => number),
        width: number | (() => number),
        coords?: Coords | (() => Coords),
        color?: string | (() => string),
        borderWidth?: number | (() => number),
        borderColor?: string | (() => string),
        label?: string | (() => string),
        labelColor?: string | (() => string),
        labelSize?: number | (() => number)
    ){
        super(coords, color, borderWidth, borderColor, label, labelColor, labelSize)
        this.height = toFunc(0, height)
        this.width = toFunc(0, width) //TODO: FIX THIS
        let coordsFunc = toFunc({x: 0, y:0}, coords)
        this.center = () => {
            return {
                x: coordsFunc().x + (this.width() / 2),
                y: coordsFunc().y + (this.height() / 2)
            }
        }
    }

    boundingBox(): BoundingBox {
        return {
            top_left: {
                x:this.center().x - (this.width() / 2), 
                y: this.center().y - (this.height() / 2)
            },
            bottom_right: {
                x: this.center().x + (this.width() / 2), 
                y: this.center().y + (this.height() / 2)
            }
        }
    }

    setWidth(width: number | (() => number)){this.width = toFunc(this.width(), width)}
    setHeight(height: number | (() => number)){this.height = toFunc(this.height(), height)}

    render(svg: any){
        d3.select(svg)
            .append('rect')
            .attr('x', this.center().x - this.width()/2)
            .attr('y', this.center().y - this.height()/2)
            .attr('width', this.width())
            .attr('height', this.height())
            .attr('stroke-width', this.borderWidth())
            .attr('stroke', this.borderColor())
            .attr('fill', this.color())
        super.render(svg)
    }
}