import { require as d3require } from 'd3-require';
const d3 = require("d3")
import { DEFAULT_COLOR, DEFAULT_FONT_SIZE, DEFAULT_TEXT_COLOR } from './Constants';
import {BoundingBox, Coords, VisualObject} from './VisualObject'

export class TextBox extends VisualObject{
    text: string;
    fontSize: number;
    color: string;

    /**
     * Displays given text. 
     * @param text text to display
     * @param coords location for center of text
     * @param color text color
     * @param fontSize size of the text
     */
    constructor(
        text: string,
        coords?: Coords,
        color?: string,
        fontSize?: number
    ){
        super(coords)
        this.text = text ?? ""
        this.fontSize = fontSize ?? DEFAULT_FONT_SIZE;
        this.color = color ?? DEFAULT_TEXT_COLOR;
    }
    
    boundingBox(): BoundingBox {
        return {
            top_left: { // No easy solution here. Just returning a square of the text's size. 
                x: this.coords.x - (this.fontSize / 2),
                y: this.coords.y - (this.fontSize / 2)
            },
            bottom_right: { // No easy solution here. Just returning a square of the text's size. 
                x: this.coords.x + (this.fontSize / 2),
                y: this.coords.y + (this.fontSize / 2)
            }
        }
    }
    setText(text: string){this.text = text}
    setFontSize(fontSize: number){this.fontSize = fontSize}
    setTextColor(color: string){this.color = color}


    render(svg: any){
        d3.select(svg)
            .append('text')
            .attr('x', this.coords.x)
            .attr('y', this.coords.y)
            .attr('text-anchor', 'middle')
            .attr("alignment-baseline", "central")
            .attr('font-size', this.fontSize)
            .attr('fill', this.color)
            .text(this.text)
        super.render(svg)
    }
}