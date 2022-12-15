import {VisualObject, Coords} from './VisualObject'
import {DEFAULT_BORDER_COLOR, DEFAULT_COLOR, DEFAULT_FONT_SIZE, DEFAULT_STROKE_WIDTH, DEFAULT_TEXT_COLOR} from './Constants'
import { TextBox } from './Textbox';

export class Shape extends VisualObject{
    public color: string;
    public borderWidth: number;
    public borderColor: string;
    public label: TextBox;

    constructor(
        coords?: Coords,
        color?: string,
        borderWidth?: number,
        borderColor?: string,
        label?: string,
        labelColor?: string,
        labelSize?: number
    ){
        super(coords)
        this.color = color ?? DEFAULT_BORDER_COLOR; 
        this.borderWidth = borderWidth ?? DEFAULT_STROKE_WIDTH;
        this.borderColor = borderColor ?? DEFAULT_COLOR;
        this.label = new TextBox(
            label ?? "", 
            this.center(), 
            labelColor ?? DEFAULT_TEXT_COLOR,
            labelSize ?? DEFAULT_FONT_SIZE
            );
        this.children.push(this.label)
    }

    setCenter(center: Coords){
        this.label.setCenter(center)
        super.setCenter(center)
    }

    setColor(color: string){ this.color = color }
    setBorderWidth(borderWidth: number){ this.borderWidth = borderWidth }
    setBorderColor(borderColor: string){ this.borderColor = borderColor }
    setLabelText(text: string){this.label.setText(text)}
    setLabelColor(labelColor: string){this.label.setTextColor(labelColor)}
    setLabelSize(labelSize: number){this.label.setFontSize(labelSize)}
}