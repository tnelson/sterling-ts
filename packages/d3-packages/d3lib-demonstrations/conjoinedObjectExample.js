const stage = new Stage()
const mainPane = new Pane()
stage.add(mainPane)

const x = new TextBox({x:0,y:0},"X")
const square = new Rectangle({x:0,y:0},20,20)
square.setColor('red')

const xandsquare = new ConjoinedObject()
xandsquare.add(square)
xandsquare.add(x)
xandsquare.setCenter({x:60,y:90})

mainPane.add(xandsquare)

stage.render(svg)