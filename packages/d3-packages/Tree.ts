import {Graph, Node} from './Graph'
import {VisualObject, Coords} from './VisualObject'

export class Tree extends Graph{

    constructor(coords?:Coords, graph_dimensions?:number,node_radius?:number){ 
        
        /**
         * 
         * @param coords: the location of the square containing the entire graph visual
         * @param graph_dimensions: the height/width of the graph visual square (for simplicity graph is always
         * visualized in a square)
         * @param node_radius: the graphical size of each node
         */
        super(coords, graph_dimensions, undefined, node_radius)
    }
}