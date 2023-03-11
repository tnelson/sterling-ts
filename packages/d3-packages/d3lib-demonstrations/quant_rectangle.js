const stage = new Stage();




const init_point = {x:50,y:500}
const x_offset_1 = 450
const y_offset = 200
const x_offset_2 = 50


const circ1 = new Circle(30, {x:init_point.x + x_offset_2,y:init_point.y-y_offset});
const circ2 = new Circle(30, {x:init_point.x + x_offset_1 - x_offset_2,y:init_point.y-y_offset});
const circ3 = new Circle(30, {x: init_point.x + x_offset_1, y: init_point.y})
const circ4 = new Circle(30, init_point)


const c1c2 = new Edge({obj1: circ1, obj2: circ2, text: "heya"})
const c2c3 = new Edge({obj1: circ2, obj2: circ3, text:"howdy"})
const c3c4 = new Edge({obj1:circ3, obj2: circ4, text:"hi!"})
const c4c1 = new Edge({obj1:circ4, obj2: circ1, text:"aloha"})
// const edgeParams = {
//    obj1: circ1,
//    obj2: circ2
// }




// const edge = new Edge(edgeParams)


stage.add(circ1)
stage.add(circ2)
stage.add(circ3)
stage.add(circ4)
stage.add(c1c2)
stage.add(c2c3)
stage.add(c3c4)
stage.add(c4c1)




stage.render(svg, document)





