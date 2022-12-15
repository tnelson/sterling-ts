import {VisualObject} from './VisualObject'

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
    constructor(node_radius?:number){
        this.nodes = []
    }

    add(Nodes: Node[]){
        this.nodes = this.nodes.concat(Nodes)
        const check_nodes = this.check_add_set(Nodes)
        if(!check_nodes.success){ //TODO
            throw `Some suggested neighbors not found within set of node names. These are as follows: ${check_nodes.neighbors_not_found_in_set.join(",")}`
        }

        const shuffled_nodes = this.nodes.sort((a,b) => 0.5 - Math.random())


    }
    
    check_add_set(Nodes:Node[]):check_add_set_response{
        return {
            success:true,
            neighbors_not_found_in_set: []
        }
    }

    default_node_radius(num_nodes:number):number{
        return 20
    }


}