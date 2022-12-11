import d3 from 'd3'
import { DEFAULT_COLOR, DEFAULT_FONT_SIZE, DEFAULT_TEXT_COLOR } from './Constants';
import {Coords, VisualObject} from './VisualObject'

export class TextBox extends VisualObject{
    text: string;
    fontSize: number;
    color: string;
    /*
    All shapes will extend this class

    Idea: want functionality to be able to conjoin two shapes (i.e. for tic-tac-toe,
        throw an X over a square and call it a single type)
    */

    constructor(
        coords: Coords,
        text: string
    ){
        super(coords)
        this.text = text
        this.fontSize = DEFAULT_FONT_SIZE;
        this.color = DEFAULT_TEXT_COLOR;
    }

    setFontSize(fontSize: number){this.fontSize = fontSize}
    setTextColor(color: string){this.color = color}

    render(svg){
        d3.select(svg)
            .append('text')
            .attr('x', this.coords.y)
            .attr('y', this.coords.x)
            .attr('text-anchor', 'middle')
            .attr("alignment-baseline", "central")
            .attr('font-size', this.fontSize)
            .attr('fill', this.color)
            .text(this.text)
        super.render(svg)
    }
}