import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
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

    render(svg: any){
        d3.select(svg)
            .append('circle')
            .attr('cx', this.coords.y)
            .attr('cy', this.coords.x)
            .attr('r', this.radius)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .attr('fill', this.color)
        super.render(svg)
    }
}