import {Stage} from './Stage.js'
import {Pane} from './Pane.js'
import {Rectangle} from './Rectangle.js'

const stageLib = require('./Stage')

const stage = new stageLib.Stage()
const mainPane = new Pane()
const rect = new Rectangle({x:0,y:0},100,100)

stage.addChild(mainPane);
mainPane.addChild(rect)

console.log(stage)

// stage.render(svg)

