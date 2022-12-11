import {VisualObject, Coords} from './VisualObject'
import {DEFAULT_BORDER_COLOR, DEFAULT_COLOR, DEFAULT_STROKE_WIDTH} from './Constants'

export class Shape extends VisualObject{
    public color: string;
    public borderWidth: number;
    public borderColor: string;
    /*
    All shapes will extend this class

    Idea: want functionality to be able to conjoin two shapes (i.e. for tic-tac-toe,
        throw an X over a square and call it a single type)
    */

    constructor(
        coords: Coords
    ){
        super(coords)
        this.color = DEFAULT_BORDER_COLOR; 
        this.borderWidth = DEFAULT_STROKE_WIDTH;
        this.borderColor = DEFAULT_COLOR;
    }

    setColor(color: string){ this.color = color }
    setStrokeWidth(borderWidth: number){ this.borderWidth = borderWidth }
    setBorderColor(borderColor: string){ this.borderColor = borderColor }
}