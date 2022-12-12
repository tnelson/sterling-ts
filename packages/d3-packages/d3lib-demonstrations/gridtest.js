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
        x_size:45,
        y_size:45
    },
    grid_dimensions:{
        height:3,
        width:3
    }
}
const smallGrid = new Grid(smallGridConfig)
for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
        const newRect = new Rectangle({x:0,y:0},40,40);
        smallGrid.fill_cell({x:i,y:j}, newRect)
    }
}

smallGrid.remove_cell({x:1,y:1})

const smallerGridConfig = {
    grid_location :{
        x:0,
        y:0
    },
    cell_size:{
        x_size:10,
        y_size:10
    },
    grid_dimensions:{
        height:3,
        width:3
    }
}

const smallerGrid = new Grid(smallerGridConfig)
for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
        const newRect = new Rectangle({x:0,y:0},9,9);
        smallerGrid.fill_cell({x:i,y:j}, newRect)
    }
}

smallGrid.fill_cell({x:1,y:1},smallerGrid)

bigGrid.fill_cell({x:1,y:1}, smallGrid)

stage.addChild(mainPane)
mainPane.addChild(bigGrid)

stage.render(svg)


