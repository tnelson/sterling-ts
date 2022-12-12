require('d3')

const stage = new Stage()
const mainPane = new Pane()

const bigGridConfig = {
    grid_location :{
        x:0,
        y:0
    },
    cell_size:{
        x_size:150,
        y_size:150
    },
    grid_dimensions:{
        height:3,
        width:3
    }
}

const bigGrid = new Grid(bigGridConfig)

for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
        const newRect = new Rectangle({x:0,y:0},140,140);
        bigGrid.fill_cell({x:i,y:j}, newRect)
    }
}

bigGrid.remove_cell({x:1,y:1})
const smallGridConfig = {
    grid_location :{
        x:0,
        y:0
    },
    cell_size:{
        x_size:20,
        y_size:20
    },
    grid_dimensions:{
        height:3,
        width:3
    }
}
const smallGrid = new Grid(smallGridConfig)
for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
        const newRect = new Rectangle({x:0,y:0},14,14);
        smallGrid.fill_cell({x:i,y:j}, newRect)
    }
}

bigGrid.fill_cell({x:1,y:1}, smallGrid)

stage.addChild(mainPane)
mainPane.addChild(bigGrid)

stage.render(svg)


