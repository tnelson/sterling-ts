import {Shape} from './Shape'
import d3 from 'd3'
import {Coords} from './VisualObject'

export class Rectangle extends Shape{
    height: number;
    width: number;
    /*
    All shapes will extend this class

    Idea: want functionality to be able to conjoin two shapes (i.e. for tic-tac-toe,
        throw an X over a square and call it a single type)
    */

    constructor(
        coords: Coords,
        height: number,
        width: number
    ){
        super(coords)
        this.height = height
        this.width = width
    }

    center(): Coords{
        return {x: this.coords.x + this.width/2, y: this.coords.y + this.height/2}
    }

    setCenter(center: Coords){
        this.coords = {
            x: center.x - this.width/2,
            y: center.y - this.height/2
        }
    }

    render(svg){
        super.render(svg)
        d3.select(svg)
            .append('rect')
            .attr('x', this.coords.y)
            .attr('y', this.coords.x)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .arrt('fill', this.color)
    }
}