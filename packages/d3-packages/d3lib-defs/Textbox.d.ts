import { Coords, VisualObject } from './VisualObject';
export declare class TextBox extends VisualObject {
    text: string;
    fontSize: number;
    color: string;
    constructor(text: string, coords?: Coords, color?: string, fontSize?: number);
    setText(text: string): void;
    setFontSize(fontSize: number): void;
    setTextColor(color: string): void;
    render(svg: any): void;
}
//# sourceMappingURL=Textbox.d.ts.map