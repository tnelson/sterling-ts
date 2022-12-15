import {VisualObject, Coords} from './VisualObject'
import {DEFAULT_GRAPH_FIXED_NODES, DEFAULT_NODE_RADIUS, SCREEN_WIDTH} from './Constants'

interface Node{
    name: string,
    neighors: string[]
}

interface check_add_set_response{
    success: boolean,
    neighbors_not_found_in_set: string[]
}


export class Graph{
    nodes: Node[]
    node_radius:number
    fixed_nodes:number
    node_to_location:any //a map from strings to coordinates
    
    constructor(node_radius?:number, fixed_nodes?:number){
        this.nodes = []
        this.node_radius = node_radius ?? DEFAULT_NODE_RADIUS
        this.fixed_nodes = fixed_nodes ?? DEFAULT_GRAPH_FIXED_NODES
        this.node_to_location = {}
    }

    add(Nodes: Node[]){
        /**
         * The algorithm for setting the locations of our graph nodes works as follows:
         * 
         * Fix the location of n nodes around the corners of the image (we choose the n nodes with the most 
         * connections to minimize the graphical damage of this)
         * 
         * Compute the "new" locations of each of our remaining nodes -> for each node, its new location is the
         * average location of its neighbors. After each new location is computed, we move these new nodes to their
         * respective locations.
         * 
         * The above step is then repeated k times (for some k > 1000), and by the magic of graph theory our
         * graph won't look terrible
         */
        this.nodes = this.nodes.concat(Nodes)
        const check_nodes = this.check_add_set(Nodes) 
        if(!check_nodes.success){ //TODO
            throw `Some suggested neighbors not found within set of node names. These are as follows: ${check_nodes.neighbors_not_found_in_set.join(",")}`
        }

        this.nodes.sort((a,b) => { //we the n nodes of highest relevance for our corner nodes
            if(a.neighors.length > b.neighors.length) {return 1}
            else if(b.neighors.length > a.neighors.length) {return -1}
            else{return 0}
        })

        const fixed_nodes = this.nodes.slice(0, this.fixed_nodes)
        this.set_fixed_nodes(fixed_nodes)

        const malleable_nodes = this.nodes.slice(this.fixed_nodes) //the nodes we are are going to be changing the locations of
        malleable_nodes.forEach(node => { //set initial locations (center of screen)
            this.node_to_location[node.name] = {x: SCREEN_WIDTH/2, y: SCREEN_WIDTH/2}
        })

        for(let ignored = 0; ignored<1000; ignored++){
            this.set_malleable_nodes(malleable_nodes)
        }

    }


    set_fixed_nodes(Nodes:Node[]){
        /**
         * We distribute the location of our fixed nodes evenly across the circle of radius
         * SCREENWIDTH
         */
        const n = Nodes.length
        const r =  SCREEN_WIDTH/2 //radius
        let i = 0
        Nodes.forEach((node) => {
            i++
            this.node_to_location = {
                x: r*Math.cos(i*(2*Math.PI)/n),
                y: r*Math.sin(i*(2*Math.PI)/n)
            }
        })
    }

    set_malleable_nodes(malleable_nodes:Node[]){
        /**
         * One iteration of our algorithm to align the points
         */
        let newLocations = {}

        malleable_nodes.forEach((node) => {
            const neighbor_locations:Coords[] = node.neighors.map(neighbor => {
                return {x:this.node_to_location[neighbor].x, y: this.node_to_location[neighbor].y}
            })

            let sum_neighbor_x = 0
            let sum_neighbor_y = 0
            neighbor_locations.forEach((location) => {
                sum_neighbor_x += location.x;
                sum_neighbor_y += location.y;
            })
            newLocations[node.name] = {
                x: sum_neighbor_x/neighbor_locations.length,
                y: sum_neighbor_y/neighbor_locations.length
            }
        })
        this.node_to_location.forEach(element => {
            if(newLocations[element.name]) {
                element.name = newLocations[element.name]
            }
        });
    }


    
    check_add_set(Nodes:Node[]):check_add_set_response{
        //also check uniqueness!
        return {
            success:true,
            neighbors_not_found_in_set: []
        }
    }

    default_node_radius(num_nodes:number):number{
        return 20
    }


}