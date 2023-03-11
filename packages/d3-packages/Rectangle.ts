import {Shape, ShapeProps} from './Shape'
import * as d3 from 'd3';
import {BoundingBox, Coords, toFunc} from './Utility'

export interface RectangleProps extends ShapeProps {
    height: number | (() => number),
    width: number | (() => number),
    coords?: Coords | (() => Coords)
}

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
        props: RectangleProps
    ){
        super(props)
        this.height = toFunc(0, props.height)
        this.width = toFunc(0, props.width) 
        let coordsFunc = toFunc({x: 0, y:0}, props.coords)
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
            .attr('opacity', this.opacity())
        super.render(svg)
    }
}