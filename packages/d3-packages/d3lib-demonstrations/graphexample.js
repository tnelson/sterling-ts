const stage = new Stage()

const graph = new Graph(3)

const nodes = [
    {name: 'x', neighbors: ['z','y']},
    {name: 'y', neighbors: ['x','z']},
    {name: 'l', neighbors: ['x','z']},
    {name: 'z', neighbors: ['x','y']},
    {name: 'n', neighbors: ['x','l']},
    {name: 'k', neighbors: ['x','l','n','z']}
]

graph.add(nodes)

stage.add(graph)
stage.render(svg,document)