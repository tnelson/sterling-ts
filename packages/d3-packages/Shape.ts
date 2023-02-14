import { VisualObject, Coords } from './VisualObject';
import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TEXT_COLOR
} from './Constants';
import { TextBox } from './TextBox';

/**
 * Generic class for a large suite of "shape"-like objects.
 * Generally includes anything with an inside and an outside.
 * All shapes come with builtin label.
 */
export class Shape extends VisualObject {
  public color: string;
  public borderWidth: number;
  public borderColor: string;
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
    coords?: Coords,
    color?: string,
    borderWidth?: number,
    borderColor?: string,
    label?: string,
    labelColor?: string,
    labelSize?: number
  ) {
    super(coords);
    this.color = color ?? DEFAULT_BORDER_COLOR;
    this.borderWidth = borderWidth ?? DEFAULT_STROKE_WIDTH;
    this.borderColor = borderColor ?? DEFAULT_COLOR;
    this.label = new TextBox(
      label ?? '',
      this.center(),
      labelColor ?? DEFAULT_TEXT_COLOR,
      labelSize ?? DEFAULT_FONT_SIZE
    );
    this.children.push(this.label)
  }

  setCenter(center: Coords) {
    this.label.setCenter(center);
    super.setCenter(center);
  }

  render(svg: any): void {
    super.render(svg);
    this.label.render(svg);
  }

  setColor(color: string) {
    this.color = color;
  }
  setBorderWidth(borderWidth: number) {
    this.borderWidth = borderWidth;
  }
  setBorderColor(borderColor: string) {
    this.borderColor = borderColor;
  }
  setLabelText(text: string) {
    this.label.setText(text);
  }
  setLabelColor(labelColor: string) {
    this.label.setTextColor(labelColor);
  }
  setLabelSize(labelSize: number) {
    this.label.setFontSize(labelSize);
  }
}
