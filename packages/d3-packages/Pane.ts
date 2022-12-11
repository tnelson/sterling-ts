import {VisualObject} from './VisualObject'

export class Pane{
    Children: VisualObject[]
    /*
    Note that we can have many types of panes that ultimately inherit from Pane.
    But for starters in the project let's just get one pane that works
    */
    constructor(){
        this.Children = []
    }

    addChild(addNode:VisualObject){
        this.Children.push(addNode)
    }

    render(svg:any){
        this.Children.forEach(child => child.render(svg))
    }

}