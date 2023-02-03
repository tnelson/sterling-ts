import { require as d3require } from 'd3-require';
import { VisualObject } from './VisualObject';
const d3 = require("d3")

export class Stage{
    Children: VisualObject[]
    constructor(){
        this.Children = []
    }
    add(addObject:VisualObject){
        this.Children.push(addObject)
    }
    render(svg:any, document?:any){
        d3.selectAll("svg > *").remove();
        this.Children.forEach(pane => pane.render(svg))
        if(document){
            const svgContainer = document.getElementById('svg-container')
            svgContainer.getElementsByTagName('svg')[0].style.height = '200%'
            svgContainer.getElementsByTagName('svg')[0].style.width = '200%'
        }
    }
}