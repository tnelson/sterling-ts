require('d3')

const stage = new Stage()

const prim_nodes = pnodes.tuples() 

const prim_neighbors = ptree.tuples()

function buildGraph(primNum){
    const nodeAtoms = prim_nodes.filter(tuple => {
    return tuple.atoms()[0].toString() == "Prim"+primNum.toString()})

    const neighbors = prim_neighbors.filter(tuple => {
    return tuple.atoms()[0].toString() == "Prim"+primNum.toString()})
    
    const nodes = []

    nodeAtoms.forEach(nodeAtom => {
        const nodeID = nodeAtom.atoms()[1].toString()
        const nodeNeighbors = neighbors.filter(neighbor => {
            return neighbor.atoms()[1].toString() == nodeID
         })
    .map(neighborAtom => neighborAtom.atoms()[2].toString())

        newNode = {
            name: nodeID,
            neighbors: nodeNeighbors
        }
        nodes.push(newNode)
    })
    console.log(nodes)
    return nodes
}

const prim2set = buildGraph(2)
const coolGraph = new Graph()
coolGraph.addAll(prim2set)
