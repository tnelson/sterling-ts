let obj1 = new Circle(10, undefined, "red", 2, "black","1")
let obj2 = new Circle(10, undefined, "red", 2, "black","2")
let obj3 = new Circle(10, undefined, "red", 2, "black","3")
let obj4 = new Circle(10, undefined, "red", 2, "black","4")
let obj5 = new Circle(10, undefined, "red", 2, "black","5")
let obj6 = new Circle(10, undefined, "red", 2, "black","6")
let obj7 = new Circle(10, undefined, "blue", 2, "black","7")
let obj8 = new Circle(10, undefined, "blue", 2, "black","8")

let visTree = {
    visualObject: obj1,
    children: [
        {
            visualObject: obj2,
            children: [
                {visualObject: obj4, children: []},
                {visualObject: obj5, children: [
                    {visualObject: obj8, children: []}
                ]},
                {visualObject: obj7, children: []}
            ]
        },
        {
            visualObject: obj3,
            children: [{visualObject: obj6, children: []}]
        }
    ]
}

let tree = new Tree(
    visTree, 200, 200, {x: 100, y:100}
)

let stage = new Stage()
stage.add(tree)
stage.render(svg)
