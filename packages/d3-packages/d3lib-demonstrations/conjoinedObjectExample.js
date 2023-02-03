const stage = new Stage()

const x = new TextBox("asdf")
const square = new Rectangle(50,20)
square.setColor('red')

const xandsquare = new ConjoinedObject()
xandsquare.add(square)
xandsquare.add(x)
xandsquare.setCenter({x:190,y:90})

stage.add(xandsquare)

stage.render(svg)