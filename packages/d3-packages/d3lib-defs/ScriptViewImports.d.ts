import { Pane } from "./Pane";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { Stage } from "./Stage";
import { TextBox } from "./Textbox";
import { VisualObject } from "./VisualObject";
import { Line } from "./Line";
import { Grid } from "./Grid";
import { ConjoinedObject } from './ConjoinedObject';
import { Polygon } from "./Polygon";
declare const scriptViewImports: ({
    name: string;
    value: typeof Pane;
} | {
    name: string;
    value: typeof Grid;
} | {
    name: string;
    value: typeof Rectangle;
} | {
    name: string;
    value: typeof Circle;
} | {
    name: string;
    value: typeof Stage;
} | {
    name: string;
    value: typeof TextBox;
} | {
    name: string;
    value: typeof VisualObject;
} | {
    name: string;
    value: typeof Line;
} | {
    name: string;
    value: typeof ConjoinedObject;
} | {
    name: string;
    value: typeof Polygon;
})[];
export default scriptViewImports;
//# sourceMappingURL=ScriptViewImports.d.ts.map