const stage = new Stage()
const mainPane = new Pane()
stage.add(mainPane)

const x = new TextBox("asdf")
const square = new Rectangle(50,20)
square.setColor('red')

const xandsquare = new ConjoinedObject()
xandsquare.add(square)
xandsquare.add(x)
xandsquare.setCenter({x:190,y:90})

mainPane.add(xandsquare)

stage.render(svg)