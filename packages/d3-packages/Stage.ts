import {Pane} from './Pane'
import { require as d3require } from 'd3-require';
const d3 = require("d3")

export class Stage{
    Children: Pane[]
    constructor(){
        this.Children = []
    }
    addChild(addPane:Pane){
        this.Children.push(addPane)
    }
    render(svg:any){
        d3.selectAll("svg > *").remove();
        this.Children.forEach(pane => pane.render(svg))
    }
}