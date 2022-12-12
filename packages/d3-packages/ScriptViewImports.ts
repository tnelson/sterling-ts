import {Pane} from "./Pane"
import {Rectangle} from "./Rectangle"
import {Circle} from "./Circle"
import {Shape} from "./Shape"
import {Stage} from "./Stage"
import { TextBox } from "./Textbox"
import { VisualObject } from "./VisualObject"
import {Line} from "./Line"
import { Grid } from "./Grid"
import {ConjoinedObject} from './ConjoinedObject'

const scriptViewImports = [
    {name: "Pane", value: Pane},
    {name: "Grid", value: Grid},
    {name: "Rectangle", value: Rectangle},
    {name: "Circle", value: Circle},
    {name: "Shape", value: Shape},
    {name: "Stage", value: Stage},
    {name: "TextBox", value: TextBox},
    {name: "VisualObject", value: VisualObject},
    {name: "Line", value: Line},
    {name: "ConjoinedObject",value:ConjoinedObject}
]

const helperLibFilePaths = ["./Pane", "./Rectangle", "./Circle", "./Shape", "./Stage", "./Textbox", "./VisualObject", "./Line", "./Grid"]

const VariableDefs = helperLibFilePaths.map((filePath)=> {
    
})

export default scriptViewImports;