/**
 * Interface that will be used generically to represent locations within a given svg
 */
export interface Coords{
    x: number,
    y: number;
}

/**
 * Generic props for representing a box around an object. 
 */
export interface BoundingBox{
    top_left: Coords,
    bottom_right:Coords
}

export class VisualObject{

    coords: Coords
    children: VisualObject[]

    /**
     * Top level class, which all other visual objects will extend.
     * @param coords position of the object on screen. 
     */
    constructor(coords?: Coords){
        this.coords = coords ?? {x: 0, y: 0};
        this.children = []
    }

    boundingBox(){}

    /**
     * Returns the center of the object 
     * @returns coordinates of center
     */
    center(): Coords{
        return this.coords
    }

    /**
     * Shifts object to have new given center
     * @param center new center of the object
     */
    setCenter(center: Coords){
        this.coords = center
        this.children.forEach((child) => child.setCenter(center))
    }

    /**
     * Renders the object to the screen.
     * @param svg HTML Svg object to which the object should be rendered. 
     */
    render(svg:any){
        this.children.forEach((child: VisualObject) => child.render(svg))
    }
}