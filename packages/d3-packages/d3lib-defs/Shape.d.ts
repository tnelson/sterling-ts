import { VisualObject, Coords } from './VisualObject';
import { TextBox } from './Textbox';
export declare class Shape extends VisualObject {
    color: string;
    borderWidth: number;
    borderColor: string;
    label: TextBox;
    constructor(coords?: Coords, color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    setCenter(center: Coords): void;
    setColor(color: string): void;
    setBorderWidth(borderWidth: number): void;
    setBorderColor(borderColor: string): void;
    setLabelText(text: string): void;
    setLabelColor(labelColor: string): void;
    setLabelSize(labelSize: number): void;
}
//# sourceMappingURL=Shape.d.ts.map