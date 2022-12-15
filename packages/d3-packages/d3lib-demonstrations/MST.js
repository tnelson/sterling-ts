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
    const returnGraph = new Graph({x:0,y:0},200,4,15)
    returnGraph.add(nodes)

    return returnGraph
}



const gridConfig = {
        grid_location: {
            x: 50,
            y:50
        },
        cell_size: {
            x_size:200,
            y_size:250
        },
        grid_dimensions:{
            y_size:9,
            x_size:1
        }
}
const graphsGrid = new Grid(gridConfig)
let primState = 0
while(Prim.atom("Prim"+primState.toString())!=null){
    graphsGrid.add({x:0,y:primState}, buildGraph(primState))
    primState++
}

stage.add(graphsGrid)
stage.render(svg, document)

