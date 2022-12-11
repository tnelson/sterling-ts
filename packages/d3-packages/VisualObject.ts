export interface Coords{
    x: number,
    y: number
}

export class VisualObject{

    coords: Coords
    children: VisualObject[]

    //idea: give each object the functionality to render themselves. When one calls "render" on the stage it
    //iterates through each of the panes, asking each pane to render all of its children (which the pane does
    //by calling this method)

    constructor(coords: Coords){
        this.coords = coords
        this.children = []
    }

    boundingBox(){}

    center(): Coords{
        return this.coords
    }

    setCenter(center: Coords){
        this.coords = center
    }

    //question: what actually makes up an object? Is every object a collection of shapes? What about text
    render(svg:any){
        this.children.forEach((child: VisualObject) => child.render(svg))
    }
}