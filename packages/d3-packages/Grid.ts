import {VisualObject, Coords} from './VisualObject'
// import {Line} from './Line.js'
import {Rectangle} from './Rectangle'

interface gridProps{
    grid_location: Coords, //note: coords refers to the top left portion of the grid
    cell_size:{
        x_size:number,
        y_size:number
    },
    grid_dimensions:{
        height:number,
        width:number
    },
    // outline: boolean

}

interface gridCell{
    full: boolean,
    contents?: VisualObject,
    center: Coords,
}

export class Grid{
    /**
     * 
     * As one of the most common expressions of a graph is a matrix, we offer functionality
     * for building a grid of cells, where you can add visual objects to each square in the grid,
     * and they are automatically formatted into the grid (where the center of the object is aligned
     * to the center of the grid)
     * 
     *  Note: grid size is fixed! You can't change the size of a grid once it's created
     * 
     */

    config: gridProps
    cells: Array<Array<gridCell>>
    // gridlines: Array<Line>

    constructor(config: gridProps){
        //todo: remove ? once we have pane functionality
        this.config = config
        this.cells = []
        // this.gridlines = []

        this.initialize_cells()
    }


    initialize_cells(){
    /**
     * 
     * Fill in the cells of the grid with blank objects (note: this is where we
     * do the computations as to where the centers of objects are)
     * 
     */
        for(let x_coord = 0; x_coord < this.config.grid_dimensions.width; x_coord++){
            this.cells.push([]);
            for(let y_coord = 0; y_coord < this.config.grid_dimensions.height; y_coord++){
                const empty_cell:gridCell = {
                    full: false,
                    center:{
                        x:this.config.grid_location.x + this.config.cell_size.x_size*x_coord + 
                        + this.config.cell_size.x_size/2,
                        y:this.config.grid_location.y + this.config.cell_size.y_size*y_coord + 
                        + this.config.cell_size.y_size/2,
                    }
                }
                // console.log("w: " + w + ",r: " + r + "\n x center: " + empty_cell.center.x + " y center: " + empty_cell.center.y)
                this.cells[x_coord].push(empty_cell)
            }
        }
    }


    fill_cell(coords: Coords, add_object:VisualObject){
    /**
     * Given valid coordinates of our grid, we add and center an object to a given
     * coordinate (note: we don't support adding multiple VisualObjects to the same frame -
     * they must be conjoined)
     * 
     * TODO: add feature that, when we add a new object to a cell in the grid that already has
     * object, we make a new VisualObject that is that object conjoined with the new object
     * 
     * (creating a conjoined visual object shouldn't be too tough) 
     */
        this.check_coords(coords)

        //TODO: check for inside bounding box

        const target_cell: gridCell = this.cells[coords.x][coords.y]
        target_cell.full = true
        target_cell.contents = add_object
        add_object.setCenter(target_cell.center) //center object
    }

    remove_cell(coords: Coords, add_object:VisualObject){
        /**
         * Given valid coordinates of our grid, we remove the object in a given cell
         * 
         * If no such object exists, we don't do anything
         */
            this.check_coords(coords)
        
            const target_cell: gridCell = this.cells[coords.x][coords.y]
            if(target_cell.full == true){
                target_cell.full = false
                delete target_cell['contents']
            }
        }

    // fill_grid_lines(){
    // /**
    //  * We offer the option to have our grid have line boundaries be filled in. 
    //  * 
    //  * Calling this method adds these lines to be rendered (calling more than once does nothing)
    //  */
    //     //cols
    //     for(let x_coord = 0; x_coord < this.config.grid_dimensions.width; x_coord++){
    //         const vertLine: Line = new Line([
    //             {x:this.config.grid_location.x+x_coord*this.config.cell_size.x_size,
    //                 y:this.config.grid_location.y},
    //             {x:this.config.grid_location.x+x_coord*this.config.cell_size.x_size,
    //                 y:this.config.grid_location.y + this.config.grid_dimensions.height*this.config.cell_size.y_size}
    //         ]);
    //         this.gridlines.push(vertLine)
    //     }
    //     //rows
    //     for(let y_coord = 0; y_coord < this.config.grid_dimensions.height; y_coord++){
    //         const horizLine: Line = new Line([
    //             {x:this.config.grid_location.x,
    //                 y:this.config.grid_location.y+y_coord*this.config.cell_size.y_size},
    //             {x:this.config.grid_location.x+this.config.grid_dimensions.width*this.config.cell_size.x_size,
    //                 y:this.config.grid_location.y+y_coord*this.config.cell_size.y_size}
    //         ]);
    //         this.gridlines.push(horizLine)    
    //     }
    // }

    fill_solid(coords: Coords, color: string){
        /**
         * Given a single coordinate square of our grid, we fill that
         * square in with a given color
         */
        this.check_coords(coords)
        const target_cell: gridCell = this.cells[coords.x][coords.y]
        target_cell.full = true

        const addRectangle:Rectangle = new Rectangle({x:0,y:0},
            this.config.cell_size.x_size, //height
            this.config.cell_size.y_size) //width
        
        //TODO: set rectangle color (we don't have that functionality currently in Rectangle.ts)

        this.fill_cell(coords, addRectangle)
    }

    check_coords(coords:Coords){
        /**
         * (This function ensures validity of inputted coords)
         * 
         * Given a set of coords passed into a function involving the grid coordinates, we verify that
         * these coordinates are positive integers within the bounds of the coordinate size
         */
        if(!Number.isInteger(coords.x) || !Number.isInteger(coords.y)){
            throw "non-integer indices given for grid coords";
        }
        if(coords.x < 0 || coords.y < 0){
            throw "negative indices given for grid coords";
        }
        if(coords.x > this.config.cell_size.x_size-1 || coords.y > this.config.cell_size.y_size-1){
            throw `coordinates out of bounds. Grid is of width ${this.config.cell_size.x_size} and height ${this.config.cell_size.y_size}`
        }
    }

    render(svg:any){
        //render gridlines

        //render each child in each cell
        for(let x_coord = 0; x_coord < this.config.grid_dimensions.width; x_coord++){
            for(let y_coord = 0; y_coord < this.config.grid_dimensions.height; y_coord++){
                const target_cell = this.cells[x_coord][y_coord]
                if(target_cell.full){
                    if(target_cell.contents){ //I don't want to have to include this code but it's necessary to make
                    //typescript not mad
                        target_cell.contents.render(svg)
                    }
                }
            }
        }
    }
}

const grid = new Grid({
    grid_location: {x:0,y:0},
    cell_size:{
        x_size:1,
        y_size:1
    },
    grid_dimensions:{
        height:3,
        width:4
    },
})