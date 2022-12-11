import {Shape} from './Shape'
import d3 from 'd3'
import { Coords } from './VisualObject';

export class Circle extends Shape{
    radius: number;
    /*
    All shapes will extend this class

    Idea: want functionality to be able to conjoin two shapes (i.e. for tic-tac-toe,
        throw an X over a square and call it a single type)
    */

    constructor(
        coords: Coords,
        radius: number,
    ){
        super(coords)
        this.radius = radius
    }

    render(svg){
        super.render(svg)
        d3.select(svg)
            .append('circ')
            .attr('cx', this.coords.y)
            .attr('cy', this.coords.x)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .attr('fill', this.color)
    }
}