let circ1 = new Circle(10, undefined, "red", 2, "black","1")
let circ2 = new Circle(10, undefined, "red", 2, "black","2")
let circ3 = new Circle(10, undefined, "red", 2, "black","3")
let circ4 = new Circle(10, undefined, "red", 2, "black","4")
let circ5 = new Circle(10, undefined, "red", 2, "black","5")
let circ6 = new Circle(10, undefined, "red", 2, "black","6")
let circ7 = new Circle(10, undefined, "blue", 2, "black","7")
let circ8 = new Circle(10, undefined, "blue", 2, "black","8")

let visTree = {
    visualObject: circ1,
    children: [
        {
            visualObject: circ2,
            children: [
                {visualObject: circ4, children: []},
                {visualObject: circ5, children: [
                    {visualObject: circ8, children: []}
                ]},
                {visualObject: circ7, children: []}
            ]
        },
        {
            visualObject: circ3,
            children: [{visualObject: circ6, children: []}]
        }
    ]
}

let tree = new Tree(
    visTree, 200, 200, {x: 100, y:100}
)

let stage = new Stage()
stage.add(tree)
stage.render(svg)
