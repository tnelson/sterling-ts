/**
 * To anyone adding to this library in the future: please take the following steps when adding
 * new VisualObjects. 
 * 
 * 1. If the object is to be accessible within sterling, add it to library within ScriptViewImports.
 * 2. Add the name of the file, minus .d.ts, to the list within d3lib-def-compiler/src/D3LibDefCompiler.java.
 *    Make sure to add the name to the end of the list, following any files it imports. 
 * 3. Run the typescript compiler ("tsc" in terminal) from within the d3-packages folder.
 * 4. Run the main method within D3LibDefCompiler.
 * 
 * If these steps are not followed, the file's definitions will either not be accessible within 
 * sterling, or will not show up in monaco. 
 */



/**
 * Interface that will be used generically to represent locations within a given svg
 */
export interface Coords{
    x: number,
    y: number;
}

<<<<<<< HEAD
/**
 * Generic props for representing a box around an object. 
 */
export interface BoundingBox{
=======
export interface BoundingBox{ 
    //just give me the top left and bottom right points
    //of the rectangle bounding box
>>>>>>> 2d501f7 (style: added a bunch of overrides to make inheritance more clear and made some of my method private. Maybe this will break everything I sure hope not.)
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