import {Pane} from './Pane'

export class Stage{
    Children: Pane[]
    constructor(){
        this.Children = []
    }
    getChildren(): Pane[] {
        return this.Children
    }
    render(svg:any){
        this.Children.forEach(pane => pane.render(svg))
    }
}