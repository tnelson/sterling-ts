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
import { Polygon } from "./Polygon"

interface scriptViewImport{
    name: string;
    value: any
}

export const d3LibDefs: string = `
`

/**
 * The order here will be \textbf{very} important. Make sure files come after
 * the files they import. 
 */
const scriptViewImports: scriptViewImport[] = [
    {name: "VisualObject", value: VisualObject},
    {name: "Shape", value: Shape},
    {name: "Pane", value: Pane},
    {name: "Grid", value: Grid},
    {name: "Rectangle", value: Rectangle},
    {name: "Circle", value: Circle},
    {name: "Stage", value: Stage},
    {name: "TextBox", value: TextBox},
    {name: "Line", value: Line},
    {name: "ConjoinedObject",value:ConjoinedObject},
    {name: "Polygon", value:Polygon}
]

export {scriptViewImports};