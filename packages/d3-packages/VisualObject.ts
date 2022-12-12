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

    constructor(coords?: Coords){
        if(coords){
            this.coords = coords
        }
        else this.coords = {x:0,y:0}
        this.children = []
    }

    boundingBox(){}

    center(): Coords{
        return this.coords
    }

    setCenter(center: Coords){
        this.coords = center
    }

    //getX
    //getY
    //transformX -> is this functionality that we actually want to offer?
    //transformY
    //rotate???

    //question: what actually makes up an object? Is every object a collection of shapes? What about text
    //Question: do we want objects to implicitly have children? I don't actually think so
    render(svg:any){
        this.children.forEach((child: VisualObject) => child.render(svg))
    }
}