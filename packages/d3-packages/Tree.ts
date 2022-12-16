import { max } from 'lodash';
import { Circle } from './Circle';
import {Graph, Node} from './Graph'
import {VisualObject, Coords} from './VisualObject'
import {TextBox} from './Textbox'

export class Tree extends Graph{
    
    root: Node;
    tree_height:number
    node_to_height:any
    name_to_node:any
    node_to_connections:any

    constructor(root_node:Node, coords?:Coords, graph_dimensions?:number,node_radius?:number){ 
        
        /**
         * @param rootNode: the top of the tree.
         * @param coords: the location of the square containing the entire graph visual
         * @param graph_dimensions: the height/width of the graph visual square (for simplicity graph is always
         * visualized in a square)
         * @param node_radius: the graphical size of each node
         */
        super(coords, graph_dimensions, undefined, node_radius)
        
        this.root = root_node
        this.nodes.push(this.root)
        this.tree_height = 1
        this.node_to_height = {}
        this.name_to_node = {}
        this.name_to_node[this.root.name] = this.root
    }

    override add(Nodes:Node[]){
        this.nodes = this.nodes.concat(Nodes)
        this.check_add_set(this.nodes) //NOTE: THIS DOESN'T CHECK THAT THE ADDED NODES RESPECT THE TREE STRUCTURE
        //THEY ONLY CHECK THAT THE ADDED NODES RESPECT THE GRAPH FUNCTIONALITY. WE CHECK THIS FUNCTIONALITY LATER
        Nodes.forEach(node => {
            this.name_to_node[node.name] = node
        })
        this.setDepths(this.root, 0)
        this.setNodeLocations()
        
    }

    private setDepths(node:Node, parent_depth:number){
        this.node_to_height[node.name] = parent_depth + 1
        if(node.neighbors.length > 0){
            node.neighbors.forEach(neighborName => {
                const neighborNode = this.name_to_node[neighborName]
                this.setDepths(neighborNode, parent_depth+1)
            })
        }
    }

    private setNodeLocations(){
        const h = 3
        const vertoffset = this.graph_dimensions/h
        for(let i = 1; i<=h; i++){
            const nodesAtHeight = this.nodes.filter(node => {
                return this.node_to_height[node.name] == i
            })

            const numNodesAtHeight = nodesAtHeight.length
            const horizoffset = this.graph_dimensions/(numNodesAtHeight+1)
            for(let j = 1; j <= numNodesAtHeight; j++){
                this.node_to_connections[nodesAtHeight[j-1].name] = {x: j*horizoffset, y: (i-1)*vertoffset}
            }
        }
    }


   


}