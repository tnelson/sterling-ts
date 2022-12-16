import { BoundingBox, Coords, VisualObject } from './VisualObject';
export declare class TextBox extends VisualObject {
    text: string;
    fontSize: number;
    color: string;
    /**
     * Displays given text.
     * @param text text to display
     * @param coords location for center of text
     * @param color text color
     * @param fontSize size of the text
     */
    constructor(text: string, coords?: Coords, color?: string, fontSize?: number);
    boundingBox(): BoundingBox;
    setText(text: string): void;
    setFontSize(fontSize: number): void;
    setTextColor(color: string): void;
    render(svg: any): void;
}
//# sourceMappingURL=TextBox.d.ts.map