import { VisualObject } from './VisualObject';
import { Coords } from './Utility';
import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TEXT_COLOR
} from './Constants';
import { toFunc } from './Utility';
import { TextBox } from './TextBox';

/**
 * Generic class for a large suite of "shape"-like objects.
 * Generally includes anything with an inside and an outside.
 * All shapes come with builtin label.
 */
export class Shape extends VisualObject {
  public color: () => string;
  public borderWidth: () => number;
  public borderColor: () => string;
  public label: TextBox;

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
  constructor(
    center?: Coords | (() => Coords),
    color?: string | (() => string),
    borderWidth?: number | (() => number),
    borderColor?: string | (() => string),
    label?: string | (() => string),
    labelColor?: string | (() => string),
    labelSize?: number | (() => number)
  ) {
    super(center);
    this.color = toFunc(DEFAULT_BORDER_COLOR, color);
    this.borderWidth = toFunc(DEFAULT_STROKE_WIDTH, borderWidth);
    this.borderColor = toFunc(DEFAULT_COLOR, borderColor);
    this.label = new TextBox(
      label,
      () => {return this.center()}, // Wacky little trick, saves so much time
      labelColor,
      labelSize
    );
    this.children.push(this.label)
  }
  
  setColor(color: string | (() => string)) {
    this.color = toFunc(this.color(), color);
  }
  setBorderWidth(borderWidth: number | (() => number)) {
    this.borderWidth = toFunc(this.borderWidth(), borderWidth);
  }
  setBorderColor(borderColor: string | (() => string)) {
    this.borderColor = toFunc(this.borderColor(), borderColor);
  }
  setLabelText(text: string | (()=> string)) {
    this.label.setText(text);
  }
  setLabelColor(labelColor: string | (() => string)) {
    this.label.setTextColor(labelColor);
  }
  setLabelSize(labelSize: number | (() => number)) {
    this.label.setFontSize(labelSize);
  }
}
