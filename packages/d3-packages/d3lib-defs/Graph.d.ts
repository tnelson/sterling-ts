interface Node {
    name: string;
    neighors: string[];
}
interface check_add_set_response {
    success: boolean;
    neighbors_not_found_in_set: string[];
}
export declare class Graph {
    nodes: Node[];
    constructor(node_radius?: number);
    add(Nodes: Node[]): void;
    check_add_set(Nodes: Node[]): check_add_set_response;
    default_node_radius(num_nodes: number): number;
}
export {};
//# sourceMappingURL=Graph.d.ts.map