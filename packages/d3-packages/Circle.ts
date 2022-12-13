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
        radius: number,
        coords?: Coords,
    ){
        if(coords){super(coords)}
        else{super()}
        this.radius = radius
    }

    setRadius(radius: number){this.radius = radius}

    render(svg: any){
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