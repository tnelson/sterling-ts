
export interface Coords{
    x: number,
    y: number;
}

export interface BoundingBoxReturn{ //just give me the top left and bottom right points
    //of the rectangle bounding box
    top_left: Coords,
    bottom_right:Coords
}

export class VisualObject{

    coords: Coords
    children: VisualObject[]

    constructor(coords?: Coords){
        this.coords = coords ?? {x: 0, y: 0};
        this.children = []
    }

    boundingBox(){}

    center(): Coords{
        return this.coords
    }

    setCenter(center: Coords){
        this.coords = center
        this.children.forEach((child) => child.setCenter(center))
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