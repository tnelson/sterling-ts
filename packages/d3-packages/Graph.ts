import {VisualObject, Coords} from './VisualObject'
import {DEFAULT_GRAPH_FIXED_NODES, DEFAULT_NODE_RADIUS, SCREEN_WIDTH} from './Constants'
import { Line } from './Line'
import {Circle} from './Circle'

interface Node{
    name: string,
    neighbors: string[]
}

interface check_add_set_response{
    success: boolean,
    neighbors_not_found_in_set: string[]
}

interface nodes_overlapping_response{
    success:boolean,
    neighbors_overlapping: Node[]
}

interface Range{
    x_range:
    {low:number,
    high:number}
    y_range:{
        low:number,
        high:number
    }
}


export class Graph extends VisualObject{
    nodes: Node[]
    node_radius:number
    fixed_nodes:number
    graph_dimensions:number //aside: we build our graphs in a square box by convention
    //and so this need only be a single number

    node_to_location:any //a map from strings to coordinates
    
    constructor(coords?:Coords, graph_dimensions?:number,fixed_nodes?:number,node_radius?:number,){
        super(coords)
        this.nodes = []
        this.graph_dimensions = graph_dimensions ?? SCREEN_WIDTH
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
            if(a.neighbors.length > b.neighbors.length) {return 1}
            else if(b.neighbors.length > a.neighbors.length) {return -1}
            else{return 0}
        })

        const fixed_nodes = this.nodes.slice(0, this.fixed_nodes)
        this.set_fixed_nodes(fixed_nodes)

        const malleable_nodes = this.nodes.slice(this.fixed_nodes) //the nodes we are are going to be changing the locations of
        malleable_nodes.forEach(node => { //set initial locations (center of screen)
            this.node_to_location[node.name] = {x:this.graph_dimensions /2, y: this.graph_dimensions/2}
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
        const r =  this.graph_dimensions/2 //radius
        let i = 0
        Nodes.forEach((node) => {
            i++
            this.node_to_location[node.name] = {
                x: this.graph_dimensions/2 + r*Math.cos(i*(2*Math.PI)/n),
                y: this.graph_dimensions/2 + r*Math.sin(i*(2*Math.PI)/n)
            }
        })
    }

    set_malleable_nodes(malleable_nodes:Node[]){
        /**
         * One iteration of our algorithm to align the points
         */
        let newLocations = {}

        malleable_nodes.forEach((node) => {
            const neighbor_locations:Coords[] = node.neighbors.map(neighbor => {
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
        malleable_nodes.forEach(element => {
            this.node_to_location[element.name] = newLocations[element.name]
        });
    }


    
    check_add_set(Nodes:Node[]):check_add_set_response{
        //also check uniqueness!
        return {
            success:true,
            neighbors_not_found_in_set: []
        }
    }


    render_lines(svg, connections:string[][]){
        connections.forEach(connection => {
            const points = [
                {x: this.node_to_location[connection[0]].x + this.coords.x,
                y: this.node_to_location[connection[0]].y + this.coords.y},
                {x: this.node_to_location[connection[1]].x + this.coords.x,
                y: this.node_to_location[connection[1]].y + this.coords.y},
            ]
            const connectionLine = new Line(points)
            connectionLine.render(svg)
        })
    }
    setCenter(center:Coords){
        this.coords = {
            x: center.x - this.graph_dimensions/2,
            y: center.y - this.graph_dimensions/2
        }
    }

    render_nodes(svg){
        this.nodes.forEach(node => {
            const nodeCircle = new Circle(this.node_radius, {
                x:this.node_to_location[node.name].x + this.coords.x,
                y: this.node_to_location[node.name].y + this.coords.y
            }, "red", undefined, 
                undefined, node.name)
            nodeCircle.render(svg)
        })
    }

    render(svg){
        const unparseableConnections = new Set<string>()
        this.nodes.forEach(node => {
            node.neighbors.forEach(neighbor => {
                const connection = node.name + "," + neighbor
                if(!unparseableConnections.has(neighbor + "," + node.name)){
                    unparseableConnections.add(connection)
                }
            })
        })
        
        const connections:string[][] = []
        unparseableConnections.forEach(connection => {
            connections.push(connection.split(","))
        });

        this.render_lines(svg, connections)
        this.render_nodes(svg)        
    }


}