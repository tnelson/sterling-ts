import {Pane} from "./Pane"
import {Rectangle} from "./Rectangle"
import {Circle} from "./Circle"
import {Shape} from "./Shape"
import {Stage} from "./Stage"
import { TextBox } from "./Textbox"
import { VisualObject } from "./VisualObject"
import {Line} from "./Line"

const scriptViewImports = [
    {name: "easyfunc", value: () => 18},
    {name: "Pane", value: Pane},
    {name: "Rectangle", value: Rectangle},
    {name: "Circle", value: Circle},
    {name: "Shape", value: Shape},
    {name: "Stage", value: Stage},
    {name: "TextBox", value: TextBox},
    {name: "VisualObject", value: VisualObject},
    {name: "Line", value: Line}
]

export default scriptViewImports;