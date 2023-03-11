import { VisualObject, Coords } from './VisualObject';
import { TextBox } from './TextBox';
/**
 * Generic class for a large suite of "shape"-like objects.
 * Generally includes anything with an inside and an outside.
 * All shapes come with builtin label.
 */
export declare class Shape extends VisualObject {
    color: string;
    borderWidth: number;
    borderColor: string;
    label: TextBox;
    /**
     * Constructs a generic shape object. This is a top-level class,
     * which should not be used except as super class for other specific
     * shapes.
     * @param coords coordinates of the shape
     * @param color color of shape's interior
     * @param borderWidth width of Shape's border
     * @param borderColor color of border
     * @param label text to display atop the shape
     * @param labelColor color of text
     * @param labelSize size of text
     */
    constructor(coords?: Coords, color?: string, borderWidth?: number, borderColor?: string, label?: string, labelColor?: string, labelSize?: number);
    setCenter(center: Coords): void;
    render(svg: any): void;
    setColor(color: string): void;
    setBorderWidth(borderWidth: number): void;
    setBorderColor(borderColor: string): void;
    setLabelText(text: string): void;
    setLabelColor(labelColor: string): void;
    setLabelSize(labelSize: number): void;
}
//# sourceMappingURL=Shape.d.ts.map