const stage = new Stage()


const rect = new Rectangle({width: 50, height: 50, coords: {x:200, y:50}})
const circ1 = new Circle({radius: 25, center: {x:100, y:300}})
const circ2 = new Circle({radius: 25, center: {x:350, y:300}})

const edge1 = new Edge({obj1: rect, obj2: circ1})
const edge2 = new Edge({obj1: circ1, obj2: rect})
const edge3 = new Edge({obj1: circ1, obj2: circ2})
const edge4 = new Edge({obj1: rect, obj2: circ2})

stage.add(rect)
stage.add(circ1)
stage.add(circ2)

stage.add(edge1)
stage.add(edge2)
stage.add(edge3)
stage.add(edge4)

stage.render(svg, document)