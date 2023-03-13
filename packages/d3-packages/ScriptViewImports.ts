import {Rectangle} from "./Rectangle"
import {Circle} from "./Circle"
import {Shape} from "./Shape"
import {Stage} from "./Stage"
import { TextBox } from "./TextBox"
import { VisualObject } from "./VisualObject"
import {Line} from "./Line"
import { Grid } from "./Grid"
import {ConjoinedObject} from './ConjoinedObject'
import { Polygon } from "./Polygon"
//import {Graph} from './Graph'
import {Tree, VisTree} from './Tree'
import {Edge} from './Edge'

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
    {name: "Grid", value: Grid},
    {name: "Rectangle", value: Rectangle},
    {name: "Circle", value: Circle},
    {name: "Stage", value: Stage},
    {name: "TextBox", value: TextBox},
    {name: "Line", value: Line},
    {name: "ConjoinedObject",value:ConjoinedObject},
    {name: "Polygon", value:Polygon},
    //{name: "Graph", value:Graph},
    {name: "Tree", value:Tree},
    {name: "Edge", value:Edge}
]

export {scriptViewImports};