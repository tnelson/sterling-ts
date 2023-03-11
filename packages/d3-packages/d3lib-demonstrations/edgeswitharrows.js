const stage = new Stage()


const rect = new Rectangle(50, 50, {x:200, y:50})
const circ1 = new Circle(25, {x:100, y:300})
const circ2 = new Circle(25, {x:350, y:300})

const edge1 = new Edge({obj1: rect, obj2: circ1, arrow: true})
const edge2 = new Edge({obj1: circ1, obj2: rect, arrow: true})
const edge3 = new Edge({obj1: circ1, obj2: circ2, arrow: true})
const edge4 = new Edge({obj1: rect, obj2: circ2})

stage.add(rect)
stage.add(circ1)
stage.add(circ2)

stage.add(edge1)
stage.add(edge2)
stage.add(edge3)
stage.add(edge4)

stage.render(svg, document)