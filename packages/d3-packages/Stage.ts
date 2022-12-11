import {Pane} from './Pane'

export class Stage{
    Children: Pane[]
    constructor(){}
    getChildren(): Pane[] {
        return this.Children
    }
    render(){}
}